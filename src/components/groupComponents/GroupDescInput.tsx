import { TextareaProps, Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import { Group } from "../../firestoreTypes";

interface Props extends TextareaProps{
    group: Group;
    edit?: boolean;
}

const GroupDescInput = ({group, edit, ...rest}: Props) => {
    const [desc, setDescState] = useState(group.description);
    function setDesc(desc: string){
        group.description = desc;
        setDescState(desc);
    }
    return <Textarea flex="auto" variant="unstyled" isDisabled={!edit} 
    paddingLeft="10px" onChange={(e) => setDesc(e.target.value)}
    value={group.description} placeholder="Group Description" resize="none" {...rest}/>
}

export default GroupDescInput;