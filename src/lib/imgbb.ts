/**
 * ImgBB Image Upload Utility
 * 
 * Uploads images to ImgBB and returns the public URL.
 * Used for photo uploads in service request forms.
 */

export interface ImgBBResponse {
  data: {
    url: string;
    display_url: string;
    delete_url: string;
  };
  success: boolean;
  status: number;
}

/**
 * Uploads an image file to ImgBB
 * @param file - The image file to upload
 * @returns Promise resolving to the public image URL
 * @throws Error if upload fails
 */
export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.VITE_IMGBB_KEY;

  if (!apiKey) {
    throw new Error('ImgBB API key is not configured. Please set VITE_IMGBB_KEY in your environment variables.');
  }

  // Convert file to base64
  const base64 = await fileToBase64(file);

  // Create form data for ImgBB API
  // ImgBB expects 'image' as base64 string, not a file
  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', base64);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`ImgBB upload failed: ${response.statusText}`);
    }

    const data: ImgBBResponse = await response.json();

    if (!data.success || !data.data?.url) {
      throw new Error('ImgBB upload failed: Invalid response from server');
    }

    return data.data.url;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
    throw new Error('Failed to upload image: Unknown error');
  }
};

/**
 * Converts a File object to base64 string
 * @param file - The file to convert
 * @returns Promise resolving to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/...;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

