import React from "react";
import isEmail from "validator/lib/isEmail"
import LinkWithIcon from "./LinkWithIcon";
import { EmailIcon } from "@chakra-ui/icons"

interface Props {
  email: string;
}

const EmailLink = (props: Props) => {
  let link = "mailto:"+props.email;
  if (isEmail(props.email)) {
    return <LinkWithIcon text={props.email} icon={EmailIcon} link={link}/>;
  }
  return <></>;
};

export default EmailLink;
