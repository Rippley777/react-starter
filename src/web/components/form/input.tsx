import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // Define the props for your component here
}

export const Input = React.forwardRef((props: Props, ref: any) => {
  return (
    <input
      className="dark:bg-gray-600 p-2 border-1 border-gray-700 border-solid rounded-sm outline-none"
      {...props}
    />
  );
});

export const FormInput = ({ children, label }) => (
  <div>
    <div className="text-sm text-gray-400">
      <label>{label}</label>
    </div>
    {children}
  </div>
);

export default FormInput;
