import { Group, Range } from "../../firestoreTypes";
import { IoPeople } from "react-icons/io5"
import TextWithIcon from "../TextWithIcon";
import { convertAgeRange } from "../../stringConverters";
import styles from "../componentStyles.module.css";
import { Input, HStack, Text, Icon, BoxProps } from "@chakra-ui/react";
import { useState } from "react"

interface Props extends BoxProps {
  group: Group;
  edit?: boolean;
}
const regex = RegExp(/\d+/);
function stringToAge(s: string): number{
  const match = s.match(regex);
  return match === null ? 0 : parseInt(match[0]);
}
const AgeRangeDisplay = ({group, edit, ...rest}: Props) => {
  const [range, setRangeState] = useState(group.ageRange);
  function setRange(range: Range){
    group.ageRange = range;
    setRangeState(range);
  }
  function sanitise(s: string){
    let age = stringToAge(s);
    return age > 999 ? 999 : age;
  }
  if (edit === true){
    return <HStack {...rest}>
      <Icon as={IoPeople}/>
      <Input variant="outline" value={group.ageRange.min === 0 ? "" : group.ageRange.min} 
      onChange={(e) => {
        const newmin = sanitise(e.target.value);
        const newRange = {min: newmin, max: group.ageRange.max === 0 ? 0 : Math.max(group.ageRange.max, newmin)};
        setRange(newRange);
      }}
      placeholder="0" maxW="100px"/>
      <Text>-</Text>
      <Input variant="outline" value={group.ageRange.max === 0 ? "" : group.ageRange.max} 
      onChange={(e) => {
        const newmax = sanitise(e.target.value);
        let newRange;
        if (newmax === 0){
          newRange = {max: 0, min: group.ageRange.min}
        }
        else{
          newRange = {max: newmax, min: group.ageRange.min === 0 ? 0 : Math.min(group.ageRange.min, newmax)};
        }
        setRange(newRange);
      }}
      placeholder="0" maxW="100px"/>
    </HStack>
  }
  return <TextWithIcon {...rest} title="Age Range" className={styles.greytext} 
  text={convertAgeRange(group.ageRange)} icon={IoPeople}/>
};

export default AgeRangeDisplay;
