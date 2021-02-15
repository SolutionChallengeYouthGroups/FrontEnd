import { Box, Flex } from "@chakra-ui/react"
import UserSettingsSideBar from "../components/UserSettingsSideBar"

function UserSettingsMain() {
    const onClick = () => {
        console.log('Click')
    }

    return (
        <Flex
            alignContent="flex-start"
            
        >
            <UserSettingsSideBar 
                onClick={onClick}
            />
            <Box
                bg="gray.200"
                width="full"
            >
                Hello
            </Box>
        </Flex>
    )
}

export default UserSettingsMain
