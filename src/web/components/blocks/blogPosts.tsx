import { useEffect, useState } from 'react';
import { useGetBlogs } from '../../../api/blog';
import useResizeObserver from '../../../hooks/useResizeObserver';

type BlogPostsViewerProps = {
  showImage: boolean;
};

const BlogPostsViewer = ({ showImage }: BlogPostsViewerProps) => {
  const [ref, size] = useResizeObserver();
  const { data: blogPosts, error, isLoading, isError } = useGetBlogs();
  const [miniView, setMiniView] = useState(false);

  useEffect(() => {
    if (size.width && size.width < 800) {
      setMiniView(true);
    } else {
      setMiniView(false);
    }
  }, [size]);

  if (isLoading) {
    return <p>Loading blogs...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  const handleBlogClick = (id: string) => {
    console.log('Blog clicked', id);
    window.location.href = `/blog/${id}`;
  };
  console.log({ blogPosts, size });

  return (
    <div ref={ref}>
      {blogPosts &&
        blogPosts.map(({ author, date, _id, title }) => {
          return (
            <div
              onClick={() => handleBlogClick(_id)}
              className="border-b border-gray-500 border-solid py-4"
            >
              <div className="text-lg">{title}</div>
              <div className="text-sm">-{author}</div>
            </div>
          );
        })}
    </div>
  );
};

export default BlogPostsViewer;
