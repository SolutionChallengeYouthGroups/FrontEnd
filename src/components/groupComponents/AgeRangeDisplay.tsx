import { Group, Range } from "../../firestoreTypes";
import { IoPeople } from "react-icons/io5";
import TextWithIcon from "../TextWithIcon";
import { convertAgeRange } from "../../stringConverters";
import styles from "../componentStyles.module.css";
import { Input, HStack, Text, Icon, BoxProps } from "@chakra-ui/react";
import { useState } from "react";

interface Props extends BoxProps {
    group: Group;
    edit?: boolean;
}
const regex = RegExp(/\d+/);
function stringToAge(s: string): number {
    const match = s.match(regex);
    return match === null ? 0 : parseInt(match[0]);
}
const AgeRangeDisplay = ({ group, edit, ...rest }: Props) => {
    const [range, setRangeState] = useState(group.ageRange);
    function setRange(range: Range) {
        group.ageRange = range;
        setRangeState(range);
    }
    function sanitise(s: string) {
        let age = stringToAge(s);
        return age > 999 ? 999 : age;
    }
    
    if (edit) {
        return (
            <HStack {...rest}>
                <Icon as={IoPeople} />
                <Input
                    variant="outline"
                    value={range.min === 0 ? "" : range.min}
                    onChange={(e) => {
                        const newmin = sanitise(e.target.value);
                        const newRange = {
                            min: newmin,
                            max: range.max
                        };
                        setRange(newRange);
                    }}
                    // when component loses focus we check if age range makes sense: min <= max
                    // if it doesn't make sense, since this component is for min we change max to min
                    onBlur={() => {
                        if (range.min > range.max) {
                            setRange({min: range.min, max: range.min})
                        }
                    }}
                    placeholder="0"
                    maxW="100px"
                />
                <Text>-</Text>
                <Input
                    variant="outline"
                    value={range.max === 0 ? "" : range.max}
                    onChange={(e) => {
                        const newmax = sanitise(e.target.value);
                        let newRange;
                        if (newmax === 0) {
                            newRange = { max: 0, min: range.min };
                        } else {
                            newRange = {
                                max: newmax,
                                min: range.min
                            };
                        }
                        setRange(newRange);
                    }}
                    // when component loses focus we check if age range makes sense: min <= max
                    // if it doesn't make sense, since this component is for max we change min to max
                    onBlur={() => {
                        // Added a condition to check if range.max !== 0 as 0 is placeholder for undefined
                        // and it is therefore valid. 
                        if (range.max !== 0 && range.min > range.max)
                            setRange({min: range.max, max: range.max});
                    }}
                    placeholder="0"
                    maxW="100px"
                />
            </HStack>
        );
    }
    return (
        <TextWithIcon
            {...rest}
            title="Age Range"
            className={styles.greytext}
            text={convertAgeRange(group.ageRange)}
            icon={IoPeople}
        />
    );
};

export default AgeRangeDisplay;
