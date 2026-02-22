import { Link } from 'react-router';

type UserIconProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  image: string;
  alt: string;
};

const UserLink: React.FC<UserIconProps> = ({ href, image, alt, ...rest }) => {
  return (
    <Link to={href} {...rest}>
      <img src={image} alt={alt} />
    </Link>
  );
};

export default UserLink;
