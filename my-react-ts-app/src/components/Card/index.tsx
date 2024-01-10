import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const Card = ({ children, ...props }: Props) => {
  return <div {...props}>{children}</div>;
};
export default Card;
