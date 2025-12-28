// src/common/components/logo/Logo.tsx
import { Link } from "react-router-dom";

interface LogoProps {
  color?: string;
  logo?: string;
}

const Logo: React.FC<LogoProps> = ({
  color = "text-primaryDarkGreen",
  logo = "",
}) => {
  // const src = "/images/logo.png";

  return (
    <Link to="/" className="shrink-0" aria-label="Go to homepage">
      {logo ? (
        <img
          alt={`norfolk eyes logo`}
          src={logo}
          loading="eager"
          width={80}
          height={80}
          className="max-h-[150px] w-auto object-contain"
        />
      ) : (
        <h1 className={` ${color}`}>Norfolk Eyes</h1>
      )}
    </Link>
  );
};

export default Logo;
