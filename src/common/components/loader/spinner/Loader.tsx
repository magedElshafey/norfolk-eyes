interface LoaderProps {
  className?: string;
}
const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div
      className={`w-4 h-4 border-2 border-[var(--primary-green)]  border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
    ></div>
  );
};

export default Loader;
