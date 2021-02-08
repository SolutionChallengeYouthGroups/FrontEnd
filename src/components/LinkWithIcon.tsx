import React from "react";
import TextWithIcon from "./TextWithIcon";
import styles from "./linkstyle.module.css";

interface Props {
  text: string;
  icon: any;
  link: string;
}

const LinkWithIcon = (props: Props) => {
  // depending on what link it is, render a different icon + text etc ...
  // E.g. a discord link would have a discord Icon Discord written next to it
  return (
    <a href={props.link} target="_blank" className={styles.underline}>
        <TextWithIcon text={props.text} icon={props.icon}/>
    </a>
  );
};

export default LinkWithIcon;
