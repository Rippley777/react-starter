interface CompProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: CompProps) => {
  return (
    <button
      {...props}
      className="py-2 px-4 rounded-full text-white m-5 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring focus:ring-red-300"
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
