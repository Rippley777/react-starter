import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiImageAddFill } from 'react-icons/ri';
import { TbCameraCheck } from 'react-icons/tb';
import { useImageUpload } from '../../../shared/api/upload';
import ImageViewer from '../viewer/image';

type ImageUploaderProps = {
  onSuccess?: (id: string) => void;
  preview?: boolean;
};

const ImageUploader = ({ onSuccess, preview }: ImageUploaderProps) => {
  const { register, handleSubmit /*, watch*/ } = useForm({
    defaultValues: { name: '', file: null },
  });
  const [hidePreview, setHidePreview] = useState(false);
  const { mutate, isLoading, isError, error, isSuccess, data } =
    useImageUpload();

  // Watch the file input to get the latest file
  // const file = watch('file');

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(data ? JSON.parse(data).id : '');
      setTimeout(() => {
        setHidePreview(true);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = async ({ name, file }) => {
    const fileToSend = file[0];
    if (!fileToSend) {
      alert('No file selected');
      return;
    }
    await mutate({ file: fileToSend, name });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex space-x-4 items-center"
      >
        <label>
          <input {...register('name')} className="hidden" type="text" />
        </label>
        <label>
          <input {...register('file')} type="file" accept="image/*" />
        </label>
        <button type="submit" disabled={isLoading}>
          {isSuccess ? (
            <TbCameraCheck size={32} className="text-green-500" />
          ) : (
            <RiImageAddFill size={32} />
          )}
        </button>
      </form>
      {isSuccess && !hidePreview && (
        <div className="absolute bottom-0 right-0 m-10">
          <p>
            <ImageViewer imageId={JSON.parse(data).id} preview={preview} />
          </p>
        </div>
      )}
      {isError && <p>Error: {error.message}</p>}
    </>
  );
};

export default ImageUploader;
