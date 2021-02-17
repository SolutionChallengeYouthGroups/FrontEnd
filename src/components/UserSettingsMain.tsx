import { Box, Flex } from "@chakra-ui/react"
import UserSettingsSideBar from "../components/UserSettingsSideBar"
import UserSettingsContent from "./UserSettingsContent"
import { Container } from "@chakra-ui/react"

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
                <Container
                    borderRadius="8px"
                    bg="white"
                    boxShadow="sm"
                    width="full"
                    padding="10px"
                >
                    <UserSettingsContent />
                </Container>
            </Box>
        </Flex>
    )
}

export default UserSettingsMain
