import { GroupCategory } from "../firestoreTypes";
import styles from "./componentStyles.module.css";
import TextWithIcon from "./TextWithIcon";
import { groupCategoryMapping } from "../iconMappings";
import { title } from "../helperFunctions";


interface Props {
  groupCategory: GroupCategory;
}

const GroupCategoryDisplay = (props: Props) => {
    console.log(props.groupCategory);
    if (props.groupCategory === ""){
        return <></>;
    }
    return <TextWithIcon title="Group Category" classname={styles.greytext} 
    text={title(props.groupCategory)} icon={groupCategoryMapping.get(props.groupCategory)}/>
};

export default GroupCategoryDisplay;
