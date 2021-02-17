import React from "react";
import { Range } from "../firestoreTypes";
import { IoPeople } from "react-icons/io5"
import TextWithIcon from "./TextWithIcon";
import { convertRange } from "../stringConverters";
import styles from "./componentStyles.module.css";

interface Props {
  range: Range;
}

const AgeRangeDisplay = (props: Props) => {
    if (props.range.min === 0 && props.range.max === 0){
        return <></>;
    }
    return <TextWithIcon title="Age Range" classname={styles.greytext} 
    text={convertRange(props.range)} icon={IoPeople}/>
};

export default AgeRangeDisplay;
