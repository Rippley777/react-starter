import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // Define the props for your component here
}

const MyComponent: React.FC<Props> = (props) => {
  return (
    <input
      className="p-3 m-2 border-1 border-gray-700 border-solid rounded-md outline-none"
      {...props}
    />
  );
};

export default MyComponent;
