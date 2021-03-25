import {
    Editable,
    EditablePreview,
    EditableInput,
    ButtonGroup,
    Flex,
    IconButton,
    Spacer,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

interface Props {}

function UserSettingsContent() {
    function EditableControls({ isEditing, onSubmit, onCancel, onEdit }: any) {
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton
                    icon={<CheckIcon />}
                    onClick={onSubmit}
                    aria-label="Submit"
                />
                <IconButton
                    icon={<CloseIcon />}
                    onClick={onCancel}
                    aria-label="Cancel"
                />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="center">
                <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    onClick={onEdit}
                    aria-label="Edit"
                />
            </Flex>
        );
    }

    return (
        <Editable
            textAlign="left"
            defaultValue="Get from Firestore 🔥"
            fontSize="lg"
            isPreviewFocusable={false}
            submitOnBlur={false}
        >
            {(props) => (
                <>
                    <Flex justifyContent="center">
                        <EditablePreview />
                        <EditableInput />
                        <Spacer />
                        <EditableControls {...props} />
                    </Flex>
                </>
            )}
        </Editable>
    );
}

export default UserSettingsContent;
