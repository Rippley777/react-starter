import Header from "../header";

type ColumnProps = {
    columns: any;
    children: React.ReactNode;
};

const Column = ({ children }: ColumnProps) => {
    return (
        <div className="h-full w-full bg-gray-200">
            <Header />
            <main className="p-5">{children}</main>
        </div>
    );
};

export default Column;