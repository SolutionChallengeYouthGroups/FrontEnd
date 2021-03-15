import React, { HTMLProps } from "react";
import TextWithIcon from "./TextWithIcon";
import styles from "./componentStyles.module.css";

interface Props extends HTMLProps<React.ReactFragment> {
  text: string;
  icon: any;
  link: string;
}

const LinkWithIcon = ({text, icon, link, ...rest}: Props) => {
  return (
    <React.Fragment {...rest}>
      <a href={link} target="_blank" className={styles.underlineLinkHover}>
          <TextWithIcon text={text} icon={icon}/>
      </a>
    </React.Fragment>
  );
};

export default LinkWithIcon;
