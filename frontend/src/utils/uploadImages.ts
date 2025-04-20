import { API_PATH } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImages = async (imagFile: any) => {
  const formData = new FormData();
  // Append Image file to form data
  formData.append('image', imagFile);
  try {
    const response: any = await axiosInstance.post(
      API_PATH.IMAGE.ADD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log('Error uploading Images.', error);
    throw error;
  }
};

export default uploadImages;
