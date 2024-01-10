import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: () => void;
  label: string;
}

const Button = ({ handleClick, label, ...props }: Props) => {
  return (
    <button {...props} onClick={handleClick}>
      {label}
    </button>
  );
};
export default Button;
