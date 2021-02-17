import { Editable, EditablePreview, EditableInput, ButtonGroup, Flex, IconButton, Spacer } from "@chakra-ui/react"
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"

function UserSettingsContent() {
    function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton icon={<CheckIcon />} onClick={onSubmit} />
                <IconButton icon={<CloseIcon />} onClick={onCancel} />
            </ButtonGroup>
        ) : (
          <Flex justifyContent="center">
            <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
          </Flex>
        )
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
    )
}

export default UserSettingsContent
