import { Link } from "react-router-dom";

interface LogoProps {
  color?: string;
  logo?: string;
}

const Logo: React.FC<LogoProps> = ({
  color = "text-primaryDarkGreen",
  logo = "",
}) => {
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
        <h1 className={`text-lg font-semibold ${color}`}>Norfolk Eyes</h1>
      )}
    </Link>
  );
};

export default Logo;
