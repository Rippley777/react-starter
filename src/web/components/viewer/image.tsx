import { useGetImage } from '../../../shared/api/upload';

const ImageViewer = ({
  imageId,
  preview,
}: {
  imageId: string;
  preview?: boolean;
}) => {
  const { data: imageUrl, error, isLoading, isError } = useGetImage(imageId);

  if (isLoading) {
    return <p>Loading image...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={preview ? 'p-2 bg-white shadow-md' : ''}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Fetched from server"
          className={`${preview ? 'h-auto w-60' : 'h-full max-w-full'}`}
        />
      )}
    </div>
  );
};

export default ImageViewer;
