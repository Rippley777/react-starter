import Header from "../../components/header";

type CompProps = {
    children: React.ReactNode;
};

const TestComponent = ({ children }: CompProps) => {
    return (
        <div className="h-full w-full bg-gray-200">
            <Header />
            <main className="p-5">{children}</main>
        </div>
    );
};

export default TestComponent;