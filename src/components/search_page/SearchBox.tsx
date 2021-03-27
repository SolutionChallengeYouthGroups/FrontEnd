import { Input, Flex } from "@chakra-ui/react"
import { useState } from "react";

interface Props {
    // search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBox = (props: Props) => {
    // const createKeywords = (name: string) =>  {
    //     const arrName: string[] = [];
    //     let currentName = '';
    //     name.split('').forEach((letter: string) => {
    //         currentName += letter;
    //         arrName.push(currentName);
    //     });
    //     return arrName;
    // }

    return (
        <Flex w="100%" paddingY="15px" align='center' justify='center'>
            <Input 
                fontWeight='700' 
                textAlign='center'
                border='2px'
                color='grey.900'
                focusBorderColor='grey.600'
                w='50%' 
                variant='outline'
                placeholder='Search' 
                size='lg'
                onChange={(e) => props.setSearch(e.target.value.toLowerCase())}
            />
        </Flex>
    )
}

export default SearchBox
