import Page from '../../components/layout/page';
import ImageViewer from '../../components/viewer/image';
import Hero from './components/hero';

const Home = () => {
  return (
    <Page noPadding>
      <Hero />
      <ImageViewer imageId="6631b4e7ff375d844515cee9" />
    </Page>
  );
};

export default Home;
