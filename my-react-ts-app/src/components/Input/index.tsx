interface Props
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  typeOfText: "single" | "multiple";
  type: "text" | "number" | "email" | "date" | "password";
}

const Input = ({ typeOfText, type, ...props }: Props) => {
  if (typeOfText === "multiple" && type === "text") {
    return <textarea {...props}></textarea>;
  } else if (typeOfText === "single" && type === "email") {
    return <input {...props} type="email" required />;
  } else if (type === "date" && typeOfText === "single") {
    return <input {...props} type="date" />;
  } else if (typeOfText === "single" && type === "password") {
    return <input {...props} type="password" />;
  }
  return <input {...props} type="text" />;
};
export default Input;
