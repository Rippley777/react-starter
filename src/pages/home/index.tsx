import Header from "../../components/header";

const TestComponent = () => {
    return (
        <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <Header />
            <div className="flex-shrink-0">{/* Icon or image */}</div>
            <div>
                <div className="text-xl font-medium text-black">Tailwind Steeeeel Works!</div>
                <p className="text-gray-500">You're now using Tailwind CSS in React.</p>
            </div>
        </div>
    );
};

export default TestComponent;