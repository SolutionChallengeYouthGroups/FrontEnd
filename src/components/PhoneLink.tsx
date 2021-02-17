import { FaPhoneAlt } from "react-icons/fa";
import React from "react";
import isMobilePhone from "validator/lib/isMobilePhone"
import LinkWithIcon from "./LinkWithIcon";

interface Props {
  phoneNumber: string;
}

const PhoneLink = (props: Props) => {
  let newNumber = props.phoneNumber.replace(/\+0*|\-|\(|\)/g, "");
  let link = "tel:"+newNumber;
  if (isMobilePhone(newNumber)) {
    return <LinkWithIcon text={"+"+newNumber} icon={FaPhoneAlt} link={link}/>
  }
  return <></>;
};

export default PhoneLink;
