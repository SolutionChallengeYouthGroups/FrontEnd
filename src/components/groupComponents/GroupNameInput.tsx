import { useState } from "react";
import { Group } from "../../firestoreTypes";
import { Input, InputProps } from "@chakra-ui/react";

interface Props extends InputProps{
    group: Group;
    edit?: boolean;
}

const GroupNameInput = ({group, edit, ...rest}: Props) => {
    const [name, setNameState] = useState(group.name);
    function setName(name: string){
        group.name = name;
        setNameState(name);
    }
    return <Input textAlign="center" value={group.name} variant="unstyled" placeholder="Group Name" 
    title={group.name} maxWidth="100%" isTruncated={true} fontSize="2.5em" 
    isDisabled={!edit} onChange={(e) => setName(e.target.value)} {...rest}/>
}

export default GroupNameInput;