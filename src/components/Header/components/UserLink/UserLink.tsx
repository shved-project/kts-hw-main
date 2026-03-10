import Image from 'next/image';
import Link from 'next/link';

type UserIconProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  image: string;
  alt: string;
};

const UserLink: React.FC<UserIconProps> = ({ href, image, alt, ...rest }) => {
  return (
    <Link href={href} {...rest}>
      <Image src={image} alt={alt} />
    </Link>
  );
};

export default UserLink;
