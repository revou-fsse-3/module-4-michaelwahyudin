interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: string;
  style?: React.CSSProperties;
}
const Title = ({ children, style, ...rest }: Props) => {
  return (
    <p style={style} {...rest}>
      {children}
    </p>
  );
};
export default Title;
