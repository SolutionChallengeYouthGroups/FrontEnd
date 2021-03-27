import { Box, Flex } from "@chakra-ui/react";
import UserSettingsSideBar from "./UserSettingsSideBar";
import UserSettingsContent from "./UserSettingsContent";
import { Container } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../lib/context";

function UserSettingsMain() {
    const { user, username } = useContext(UserContext);

    const onClick = () => {
        console.log("Click");
    };

    return (
        <Flex alignContent="flex-start">
            <UserSettingsSideBar onClick={onClick} />
            <Box bg="gray.200" width="full">
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
    );
}

export default UserSettingsMain;
