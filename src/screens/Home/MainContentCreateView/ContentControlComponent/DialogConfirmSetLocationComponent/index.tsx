import {
  Button, Dialog, Portal, Text 
} from 'react-native-paper';

interface DialogConfirmSetLocationComponentType {
    visible: boolean
    onHidden: () => void
    onConfirm: () => void
}

const DialogConfirmSetLocationComponent = (props: DialogConfirmSetLocationComponentType) => (
  <Portal>
    <Dialog visible={props.visible} onDismiss={props.onHidden}>
      <Dialog.Content>
        <Text variant="bodyMedium">Do you want to set your current location?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={props.onConfirm}>Yes</Button>
        <Button onPress={props.onHidden}>No</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>  
)

export default DialogConfirmSetLocationComponent