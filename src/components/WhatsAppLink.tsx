import { FaWhatsapp } from "react-icons/fa";
import React from "react";
import isMobilePhone from "validator/lib/isMobilePhone"
import LinkWithIcon from "./LinkWithIcon";

interface Props {
  phoneNumber: string;
}

const PhoneLink = (props: Props) => {
  let newNumber = props.phoneNumber.replace(/\+0*|\-|\(|\)/g, "");
  console.log(newNumber);
  if (isMobilePhone(newNumber)) {
    console.log("helo");
    // removes chars that are not whatsapp friendly
    let link = "https://wa.me/"+newNumber;
    return <LinkWithIcon text={"+"+newNumber} icon={FaWhatsapp} link={link}/>;
  }
  return <></>;
};

export default PhoneLink;
