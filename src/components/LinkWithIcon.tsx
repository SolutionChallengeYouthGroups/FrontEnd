import React from "react";
import TextWithIcon from "./TextWithIcon";
import styles from "./componentStyles.module.css";

interface Props {
  text: string;
  icon: any;
  link: string;
  classname?: string;
}

const LinkWithIcon = (props: Props) => {
  return (
    <a href={props.link} target="_blank" className={styles.underlineLinkHover}>
        <TextWithIcon text={props.text} icon={props.icon}/>
    </a>
  );
};

export default LinkWithIcon;
