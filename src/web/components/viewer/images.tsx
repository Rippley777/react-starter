import { imageUploadApiUrl, useGetImages } from '../../../api/upload';
import Page from '../../components/layout/page';

const ImagesViewer = () => {
  const { data: images, error, isLoading, isError } = useGetImages();

  if (isLoading) {
    return <p>Loading image...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <Page>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images &&
          images.map((image: any) => (
            <div key={image.id}>
              <img
                src={`${imageUploadApiUrl}/${image.id}`}
                alt={image.name}
                style={{ width: '100%', maxWidth: '300px' }}
              />
              <p>{image.name}</p>
            </div>
          ))}
      </div>
    </Page>
  );
};

export default ImagesViewer;
