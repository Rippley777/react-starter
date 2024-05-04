import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from 'react-query';

const blogApiBaseUrl =
  process.env.REACT_APP_API_URL ??
  'https://be-test-mongo-express.azurewebsites.net';
export const blogPostsApiUrl = `${blogApiBaseUrl}/api/blogPosts`;

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: Date | number | string;
  featured: string;
  images: any[];
};

export const useGetBlogs = (): UseQueryResult<Blog[], Error> => {
  return useQuery(['fetchBlogs'], async (): Promise<Blog[]> => {
    const response = await fetch(`${blogPostsApiUrl}`);
    if (!response.ok) {
      throw new Error('No images found');
    }

    return response.json();
  });
};

export const useGetBlog = (blogId?: string): UseQueryResult<Blog, Error> => {
  return useQuery(
    ['fetchBlog', blogId],
    async (): Promise<string> => {
      const response = await fetch(`${blogPostsApiUrl}/${blogId}`);
      if (!response.ok) {
        throw new Error('No blog found');
      }

      return response.json();
    },
    { enabled: !!blogId },
  );
};

interface BlogPostUploadParams {
  title: string;
  author: string;
  date: number;
  content: string;
  featuredImage?: string;
  imageIds: string;
  featured: boolean;
}
type UploadResponse = string;

type UploadError = Error;

export const useBlogUpload = (): UseMutationResult<
  UploadResponse,
  UploadError,
  BlogPostUploadParams | null
> => {
  return useMutation(async (data) => {
    if (!data) {
      throw new Error('No file selected');
    }
    try {
      const imageIds: any = data.featuredImage ? [data.featuredImage] : [];
      const imagesContent = data.imageIds.split(',').filter((image) => !!image);
      imagesContent.length > 0 && imageIds.push([...imagesContent]);

      const payload = {
        title: data.title,
        author: data.author,
        date: Date.now(),
        content: data.content,
        featuredImage: data.featuredImage,
        imageIds,
        featured: data.featured,
      };

      const response = await fetch(blogPostsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.text();
    } catch (error) {
      throw new Error('Network response was not ok');
    }
  });
};
