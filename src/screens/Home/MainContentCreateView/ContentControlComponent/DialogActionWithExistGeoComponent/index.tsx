import {
  Button, Dialog, Portal, Text 
} from 'react-native-paper';

interface DialogActionWithExistGeoComponentType {
    visible: boolean
    onHidden: () => void
    onClearPress: () => void
    onSetNewPress: () => void
}

const DialogActionWithExistGeoComponent = (props: DialogActionWithExistGeoComponentType) => (
  <Portal>
    <Dialog visible={props.visible} onDismiss={props.onHidden}>
      <Dialog.Title>Alert</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">Do you want to change the current location?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={props.onSetNewPress}>Set new</Button>
        <Button onPress={props.onClearPress}>Clear</Button>
        <Button onPress={props.onHidden}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>        
)

export default DialogActionWithExistGeoComponent