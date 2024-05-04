import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Header from '../header';
import Footer from '../footer';

type CompProps = {
  children: React.ReactNode;
  noPadding?: boolean;
};

const Page = ({ children, noPadding }: CompProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div className={`h-full w-full ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white flex flex-col h-full w-full">
        <Header />
        <main
          className={`${!noPadding && 'p-5'} flex-1 h-full overflow-scroll`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
