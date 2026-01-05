import { Link } from "react-router-dom";

interface LogoProps {
  color?: string;
  logo?: string;
}

const Logo: React.FC<LogoProps> = ({ logo = "" }) => {
  return (
    <Link
      to="/"
      aria-label="Go to homepage"
      className="flex items-center h-full"
    >
      {logo ? (
        <img
          src={logo}
          alt="Norfolk Eyes logo"
          loading="eager"
          className="
    h-7          /* 📱 موبايل (28px) */
    sm:h-8       /* 📱 موبايل كبير */
    lg:h-10      /* 💻 ديسكتوب */
    w-auto
    object-contain
    select-none
  "
        />
      ) : (
        <div className="w-32 h-8 rounded bg-gray-200 animate-pulse" />
      )}
    </Link>
  );
};

export default Logo;
