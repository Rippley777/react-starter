import Page from '../../components/layout/page';
import BlogPosts from '../../components/blocks/blogPosts';
import Hero from './components/hero';

const Home = () => {
  return (
    <Page noPadding>
      <Hero />
      <div className="flex">
        <div className="flex-1">
          <div></div>
        </div>
        <div className="flex-1 m-5">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <BlogPosts showImage={false} />
        </div>
      </div>
    </Page>
  );
};

export default Home;
