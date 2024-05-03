import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      author: '',
      content: '',
      featured: '',
      imageIds: '',
      title: '',
    },
  });

  const [uploadImage, setUploadImage] = useState(false);
  console.log('getValues', getValues());
  const onSubmit = async (data) => {
    try {
      console.log('add blog', data);
      const payload = {
        title: data.title,
        author: data.author,
        date: Date.now(),
        content: data.content,
        imageIds: data.imageIds ? data.imageIds.split(',') : [],
        featured: data.featured,
      };

      const response = await fetch(blogPostsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload }),
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
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input {...field} />}
          />
          {errors.title && <span>This field is required</span>}
        </div>

        <div>
          <label>Author:</label>
          <Controller
            name="author"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input {...field} />}
          />
          {errors.author && <span>This field is required</span>}
        </div>

        <div>
          <label>Content:</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                onChange={field.onChange}
                onBlur={field.onBlur}
                setValue={setValue}
                value={field.value}
              />
            )}
          />
          {errors.content && <span>Error</span>}
        </div>
        <div>
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <>
                <input type="checkbox" {...field} />
                <label>Featured Post</label>
                {/* <input type="checkbox" value="movies" {...field} />
              <label>Movies</label> */}
              </>
            )}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Page>
  );
};

export default CreateBlogPost;
