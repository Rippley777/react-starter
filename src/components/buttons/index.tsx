
interface CompProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
};

const Button = ({ children, ...props }: CompProps) => {
    return (
        <button {...props} className="py-2 px-4 rounded-full text-white m-5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" type="submit">{children}</button>
    );
};

export default Button;