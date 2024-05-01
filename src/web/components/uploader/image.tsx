import { useForm } from 'react-hook-form';
import { useImageUpload } from '../../../api/upload';
import ImageViewer from '../viewer/image';

type ImageUploaderProps = {
  onSuccess?: () => void;
};

const ImageUploader = ({ onSuccess }: ImageUploaderProps) => {
  const { register, handleSubmit /*, watch*/ } = useForm({
    defaultValues: { name: '', file: null },
  });
  const { mutate, isLoading, isError, error, isSuccess, data } =
    useImageUpload();

  // Watch the file input to get the latest file
  // const file = watch('file');

  const onSubmit = ({ name, file }) => {
    const fileToSend = file[0];
    if (!fileToSend) {
      alert('No file selected');
      return;
    }
    mutate({ file: fileToSend, name });
    onSuccess?.();
  };

  return (
    <>
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
      {isSuccess && (
        <p>
          <ImageViewer imageId={JSON.parse(data).id} />
        </p>
      )}
      {isError && <p>Error: {error.message}</p>}
    </>
  );
};

export default ImageUploader;
