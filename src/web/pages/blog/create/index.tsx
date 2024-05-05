import { useEffect, useRef, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { LuImagePlus } from 'react-icons/lu';
import { MdClose, MdCloseFullscreen } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

import { useBlogUpload } from '../../../../shared/api/blog';
import { RootState } from '../../../../shared/store/store';
import MessageBanner from '../../../components/banner/message';
import Button from '../../../components/buttons';
import { FormInput, Input } from '../../../components/form/input';
import Page from '../../../components/layout/page';
import ImageUploader from '../../../components/uploader/image';

import Editor from './editor';

export const blogPostsApiUrl = `${process.env.REACT_APP_API_URL}/api/blogposts`;

const CreateBlogPost = () => {
  const topElementRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.userData);
  const [uploadImage, setUploadImage] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [showMessageBanner, setShowMessageBanner] = useState<{
    message: ReactNode;
    type: 'success' | 'error';
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      author: '',
      authorId: user?.id || '',
      content: '',
      featured: false,
      featuredImage: '',
      imageIds: '',
      title: '',
      tags: [],
      ai: false,
    },
  });

  const { mutate, isError, isSuccess } = useBlogUpload();

  useEffect(() => {
    if (isSuccess) {
      setShowMessageBanner({
        message: 'Blog successfully created! View now',
        type: 'success',
      });
      scrollToTop();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setShowMessageBanner({
        message: 'Issue creating blog post. Please try again',
        type: 'error',
      });
      scrollToTop();
    }
  }, [isError]);

  const scrollToTop = () => {
    topElementRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const onSubmit = async (data) => {
    mutate(data);
  };

  const handleAddFeaturedImage = (imageId) => {
    setValue('featuredImage', imageId);
  };

  return (
    <Page>
      {showMessageBanner && <MessageBanner {...showMessageBanner} />}

      <div className="flex justify-between" ref={topElementRef}>
        <h1>Create Blog Post</h1>
        {uploadImage ? (
          <div className="flex absolute z-10 right-0 bg-gray-200 dark:bg-gray-700 p-5">
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 dark:text-gray-400"
        method="POST"
      >
        <FormInput label="Title">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.title && <span>This field is required</span>}
        </FormInput>

        <FormInput label="Author">
          <Controller
            name="author"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.author && <span>This field is required</span>}
        </FormInput>
        <div>
          {showContentEditor ? (
            <MdCloseFullscreen
              onClick={() => setShowContentEditor(false)}
              className="text-2xl text-blue-500 ml-40 mb-[-20px]"
            />
          ) : (
            <FaEdit
              onClick={() => setShowContentEditor(true)}
              className="text-2xl text-blue-500 ml-40 mb-[-20px]"
            />
          )}
          <FormInput label="Content">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Editor
                  show={showContentEditor}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  setValue={setValue}
                  value={field.value}
                />
              )}
            />
            {errors.content && <span>Error</span>}
          </FormInput>
        </div>
        <div>
          <Controller
            name="featured"
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                  name={name} // It's good to explicitly set the name
                  ref={ref}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.checked)} // Update the form state with the checkbox's checked state
                  checked={value}
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Featured Post
                </label>
                {/* <input type="checkbox" value="movies" {...field} />
              <label>Movies</label> */}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            name="ai"
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mb-5"
                  name={name} // It's good to explicitly set the name
                  ref={ref}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.checked)} // Update the form state with the checkbox's checked state
                  checked={value}
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Was this AI?
                </label>
                {/* <input type="checkbox" value="movies" {...field} />
              <label>Movies</label> */}
              </>
            )}
          />
        </div>
      </form>
      <div className="flex dark:text-gray-400">
        Featured Image:{' '}
        <ImageUploader onSuccess={handleAddFeaturedImage} preview={true} />
      </div>
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </Page>
  );
};

export default CreateBlogPost;
