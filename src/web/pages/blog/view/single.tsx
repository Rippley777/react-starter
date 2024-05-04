import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { useGetBlog } from '../../../../api/blog';
import Page from '../../../components/layout/page';

const BlogSingle = () => {
  const { blogId } = useParams();
  const { data: blogPost, error, isLoading, isError } = useGetBlog(blogId);
  if (!blogId) {
    return <p>Invalid blog ID</p>;
  }

  if (isLoading) {
    return <p>Loading blog post...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!blogPost) {
    return <p>No blog found</p>;
  }

  return (
    <Page>
      <div>
        <h1 className="text-2xl py-5">{blogPost.title}</h1>
        <ReactMarkdown>{blogPost.content}</ReactMarkdown>
        <div>{blogPost.content}</div>
      </div>
    </Page>
  );
};

export default BlogSingle;
