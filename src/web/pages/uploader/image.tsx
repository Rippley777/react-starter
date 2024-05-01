import React from 'react';
import { useForm } from 'react-hook-form';
import { useImageUpload } from '../../../api/upload';
import Page from '../../components/layout/page';

const ImageUploader = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: { name: '', file: null },
  });
  const { mutate, isLoading, isError, error, isSuccess, data } =
    useImageUpload();

  // Watch the file input to get the latest file
  const file = watch('file');

  const onSubmit = ({ name, file }) => {
    const fileToSend = file[0]; // Since it's a FileList, get the first file
    if (!fileToSend) {
      alert('No file selected');
      return;
    }
    mutate({ file: fileToSend, name }); // Pass file and name to the mutation
  };

  return (
    <Page>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 items-center"
      >
        <h1 className="text-2xl mb-4">Image Uploader</h1>
        <label>
          Image Name:
          <input {...register('name')} type="text" />
        </label>
        <label className="flex flex-col">
          Upload Image:
          <input {...register('file')} type="file" accept="image/*" />
        </label>
        <button type="submit" disabled={isLoading}>
          Upload
        </button>
      </form>
      {isSuccess && <p>{data}</p>}
      {isError && <p>Error: {error.message}</p>}
    </Page>
  );
};

export default ImageUploader;
