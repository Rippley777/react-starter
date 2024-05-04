import {
  useMutation,
  useQuery,
  UseQueryResult,
  UseMutationResult,
} from 'react-query';

export const imageUploadApiUrl = `${process.env.REACT_APP_API_URL}/api/upload/image`;

type Image = {
  id: string;
  name: string;
  contentType: string;
};

export const useGetImage = (imageId: string): UseQueryResult<string, Error> => {
  return useQuery(
    ['fetchImage', imageId],
    async (): Promise<string> => {
      const response = await fetch(`${imageUploadApiUrl}/${imageId}`);
      if (!response.ok) {
        throw new Error('No images found');
      }

      const imageBlob = await response.blob();
      return URL.createObjectURL(imageBlob);
    },
    { enabled: !!imageId },
  );
};

export const useGetImages = (): UseQueryResult<Image[], Error> => {
  return useQuery(['fetchImages'], async (): Promise<Image[]> => {
    const response = await fetch(`${imageUploadApiUrl}s`);
    if (!response.ok) {
      throw new Error('No images found');
    }

    return response.json();
  });
};

type UploadImageParams = {
  file: Blob | null;
  name: string;
};

type UploadResponse = string;

type UploadError = Error;

export const useImageUpload = (): UseMutationResult<
  UploadResponse,
  UploadError,
  UploadImageParams
> => {
  return useMutation(
    async ({ file, name }: { file: Blob | null; name: string }) => {
      if (!file) {
        throw new Error('No file selected');
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', name);

      const response = await fetch(imageUploadApiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.text();
    },
  );
};
