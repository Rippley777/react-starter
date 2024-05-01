import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuImagePlus } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';

import Page from '../../../components/layout/page';
import ImageUploader from '../../../components/uploader/image';
import Editor from './editor';

const blogApiBaseUrl =
  process.env.REACT_APP_API_URL ??
  'https://be-test-mongo-express.azurewebsites.net';
export const blogPostsApiUrl = `${blogApiBaseUrl}/api/blogposts`;

const CreateBlogPost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [uploadImage, setUploadImage] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Assuming imageIds are sent as an array of string IDs
      const payload = {
        title: data.title,
        content: data.content,
        imageIds: data.imageIds.split(','), // Assuming IDs are provided as comma-separated
      };

      const response = await fetch(blogPostsApiUrl, {
        method: 'POST',
        ...payload,
      });
      console.log('response', response);
      alert('Blog post created successfully!');
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Failed to create blog post:', error);
      alert('Failed to create blog post');
    }
  };

  return (
    <Page>
      <div className="flex justify-between">
        <h1>Create Blog Post</h1>

        {uploadImage ? (
          <div className="flex absolute z-10 right-0 bg-gray-200 p-5">
            <ImageUploader onSuccess={() => setUploadImage(false)} />
            <MdClose
              className="pointer-cursor"
              onClick={() => setUploadImage(false)}
            />
          </div>
        ) : (
          <LuImagePlus
            onClick={() => setUploadImage(true)}
            className="text-3xl text-blue-500"
          />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <input {...register('title', { required: true })} />
          {errors.title && <span>This field is required</span>}
        </div>
        <div>
          <Editor {...register('content', { required: true })}></Editor>
          {errors.content && <span>This field is required</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </Page>
  );
};

export default CreateBlogPost;
