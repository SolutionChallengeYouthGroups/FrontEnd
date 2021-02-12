import { ExternalLinkIcon } from "@chakra-ui/icons";
import React from "react";
import isURL from "validator/lib/isURL";
import LinkWithIcon from "./LinkWithIcon";
import { socialLinkMapping } from "../iconMappings"
import { Host } from "../helperTypes";
import { title } from "../helperFunctions";

interface Props {
  link: string;
  expectedHost?: Host;
}
// create a mapping between the host and icons

const ValidatedLinkWithIcon = (props: Props) => {
  // depending on what link it is, render a different icon + text etc ...
  // E.g. a discord link would have a discord Icon Discord written next to it
  if (!isURL(props.link)){
      return <></>
  }
  if (props.expectedHost === undefined){
    return <LinkWithIcon text={props.link.replace(/https?:\/\//, "")} icon={ExternalLinkIcon} link={props.link}/>;
  }
  // probably a better way of checking but this will do for the time being
  if (props.link.includes(props.expectedHost)) {
    let display = props.expectedHost.split(".")[0];
    return <LinkWithIcon text={title(display)} icon={socialLinkMapping.get(props.expectedHost)} link={props.link}/>;
  }
  return <></>;
};

export default ValidatedLinkWithIcon;
