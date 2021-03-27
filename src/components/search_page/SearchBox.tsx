import { Input, Flex } from "@chakra-ui/react"
import { useState } from "react";

interface Props {
    // search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBox = (props: Props) => {

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
                // Listens to a change in input event and pass the event.target.value to setSearch
                // use .toLowerCase so we can search with case insensitivity
                onChange={(e) => props.setSearch(e.target.value.toLowerCase())}
            />
        </Flex>
    )
}

export default SearchBox
