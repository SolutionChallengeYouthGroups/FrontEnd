import { FaWhatsapp } from "react-icons/fa";
import React from "react";
import isMobilePhone from "validator/lib/isMobilePhone"
import LinkWithIcon from "./LinkWithIcon";

interface Props {
  phoneNumber: string;
}

const PhoneLink = (props: Props) => {
  // removes chars that are not friendly
  let newNumber = props.phoneNumber.replace(/\+0*|\-|\(|\)/g, "");
  if (isMobilePhone(newNumber)) {
    let link = "https://wa.me/"+newNumber;
    return <LinkWithIcon text={"+"+newNumber} icon={FaWhatsapp} link={link}/>;
  }
  return <></>;
};

export default PhoneLink;
