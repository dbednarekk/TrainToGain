import { Link } from "@mui/material";
interface CustomLinkProps {
  href: string;
  text: string;
}
function CustomLink(props: CustomLinkProps) {
  return (
    <Link href={props.href} underline="hover" color="inherit">
      {props.text}
    </Link>
  );
}

export default CustomLink;
