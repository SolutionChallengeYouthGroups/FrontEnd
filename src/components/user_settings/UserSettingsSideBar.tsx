import PropTypes from 'prop-types'
import { Button, VStack, StackDivider, Heading } from "@chakra-ui/react"

const SettingsSideBar = ({ onClick }:any) => {
    return (
        <VStack
            divider={<StackDivider borderColor="gray.200" />}
            alignSelf="left"
            spacing={2}
            align="left"
            width="xs"
            height="100vh"
            borderRight="1px"
            borderRightColor="gray.200"
            >
            <Heading
                colorScheme="teal"
                textAlign="center"
            >
                ⚙️Settings 
            </Heading>
            <Button
                colorScheme="teal"
                variant="ghost"
                onClick={onClick}
            >
                General 
            </Button>
            <Button
                colorScheme="teal"
                variant="ghost"
            >
                Security and Login 
            </Button>
            <Button
                colorScheme="teal"
                variant="ghost"
            >
                Groups 
            </Button>
        </VStack>
    )
}

SettingsSideBar.propTypes = {
    onClick: PropTypes.func
}

export default SettingsSideBar
