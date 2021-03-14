import { Input, Flex } from "@chakra-ui/react"

const SearchBox = () => {
    return (
        <Flex pt='10px' align='center' justify='center'>
            <Input 
                fontWeight='700' 
                textAlign='center'
                border='2px'
                color='whitesmoke'
                focusBorderColor='blue.400'
                w='50%' 
                variant='outline' 
                placeholder='awesome group name' 
                size='lg' 
                bg='purple.700'
            />
        </Flex>
    )
}

export default SearchBox
