import { FC } from "react";
import CustomLinkProps from "./CustomLink.props";
import { Link, useMatch } from "react-router-dom";
import styles from "../Header/Header.module.css";

const CustomLink: FC<CustomLinkProps> = ({ value, to }) => {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      className={match ? `${styles.nav_link_active}` : `${styles.nav_link}`}
    >
      {value}
    </Link>
  );
};

export default CustomLink;
