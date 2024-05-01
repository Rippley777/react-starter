import { useGetImage } from '../../../api/upload';

const ImageViewer = ({ imageId }: { imageId: string }) => {
  const { data: imageUrl, error, isLoading, isError } = useGetImage(imageId);

  if (isLoading) {
    return <p>Loading image...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Fetched from server"
          style={{ maxWidth: '100%' }}
        />
      )}
    </div>
  );
};

export default ImageViewer;
