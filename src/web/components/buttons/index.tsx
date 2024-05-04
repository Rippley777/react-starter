interface CompProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  children,
  className = 'py-2 px-4 m-5',
  ...props
}: CompProps) => {
  return (
    <button
      {...props}
      className={`rounded-full text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring focus:ring-red-300 ${className}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
