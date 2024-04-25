import Header from '../header';
import Footer from '../footer';

type CompProps = {
  children: React.ReactNode;
};

const Page = ({ children }: CompProps) => {
  return (
    <div className="flex flex-col h-full w-full bg-gray-200">
      <Header />
      <main className="p-5 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Page;
