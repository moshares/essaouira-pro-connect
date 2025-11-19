import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { uploadImageToImgBB } from "@/lib/imgbb";
import { sendEmailViaEmailJS, type EmailJSParams } from "@/lib/emailjs";

const RequestService = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get('type') || '';
  const navigate = useNavigate();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    serviceType: serviceType,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  /**
   * Handles form submission with EmailJS integration
   * - Uploads photo to ImgBB if provided
   * - Sends email via EmailJS
   * - Shows success/error messages
   * - Clears form on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: t('requestService.missingInfo'),
        description: t('requestService.fillAllFields'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let photoUrl = "No photo";

      // Upload photo to ImgBB if provided
      if (photoFile) {
        try {
          photoUrl = await uploadImageToImgBB(photoFile);
        } catch (photoError) {
          console.error('Photo upload error:', photoError);
          toast({
            title: t('requestService.photoUploadError') || "Photo Upload Failed",
            description: photoError instanceof Error ? photoError.message : "Failed to upload photo. Continuing without photo...",
            variant: "destructive"
          });
          // Continue with submission even if photo upload fails
        }
      }

      // Prepare EmailJS parameters
      const emailParams: EmailJSParams = {
        full_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        service_type: formData.serviceType || "General",
        description: formData.description || "No description provided",
        photo: photoUrl
      };

      // Send email via EmailJS
      await sendEmailViaEmailJS(emailParams);

      // Show success message
      toast({
        title: t('requestService.success') || "Request Sent!",
        description: t('requestService.successMessage') || "Your service request has been submitted successfully.",
      });

      // Clear form
      setFormData({
        name: '',
        phone: '',
        address: '',
        serviceType: serviceType,
        description: ''
      });
      setPhotoFile(null);
      
      // Reset file input
      if (formRef.current) {
        const fileInput = formRef.current.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }

      // Navigate to confirmation page
      navigate('/confirmation');
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: t('requestService.error') || "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('requestService.backToServices')}
        </Button>

        <Card className="p-8 shadow-soft">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-card-foreground">
              {t('requestService.title', { serviceType })}
            </h1>
            <p className="text-muted-foreground">
              {t('requestService.subtitle')}
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-card-foreground">{t('requestService.name')} {t('requestService.required')}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-card-foreground">{t('requestService.phone')} {t('requestService.required')}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+212 XXX XXX XXX"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-card-foreground">{t('requestService.address')} {t('requestService.required')}</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="serviceType" className="text-card-foreground">{t('requestService.serviceType')} {t('requestService.required')}</Label>
              <Input
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                readOnly
                className="mt-1 bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-card-foreground">
                {t('requestService.description')}
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('requestService.descriptionPlaceholder')}
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="photo" className="text-card-foreground">
                {t('requestService.uploadPhoto')}
              </Label>
              <div className="mt-1">
                <label htmlFor="photo" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {photoFile ? photoFile.name : t('requestService.uploadPhotoPlaceholder')}
                    </p>
                  </div>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('requestService.submitting') : t('requestService.submit')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestService;
