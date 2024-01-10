interface Props {
  currentBar: number;
  totalBar: number;
}
const ProgressBar = ({ currentBar, totalBar }: Props) => {
  const progress = (currentBar / totalBar) * 100;
  return (
    <div className="w-full bg-gray-300 rounded-md h-4">
      <div
        className="bg-blue-500 rounded-md h-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
