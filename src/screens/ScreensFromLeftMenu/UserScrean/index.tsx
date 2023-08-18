import {
  StyleSheet, Text, TouchableOpacity, View 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BackgroundForMenus } from '../../../components/UI/Backgrounds';
import MainUserHeader from '../../../components/MainUserHeader';

import {
  Color, FontFamily, buttonStyle 
} from '../../../styles/GlobalStyles';
import {
  Dialog, IconButton, Portal, TextInput 
} from 'react-native-paper';
import CustomButton from '../../../components/UI/CustomButton';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import React, { CSSProperties, useMemo } from 'react';
import Toast from 'react-native-simple-toast';
import { AppStackType } from '../../../navigation/types';
import { deleteUserFromFriend, saveUserChangedData } from '../../../services/friends';

interface ActionViewType {
  label: string
  onPress: () => void
  icon: string
}

type Props = NativeStackScreenProps<AppStackType, 'Friend'>;

const ActionViewCompponent = (props: ActionViewType) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={style.actionContainer}
    onPress={props.onPress}
  >
    <IconButton style={style.iconStyle} icon={props.icon} size={60} />
    <Text style={style.actionTextStyle}>{props.label}</Text>
  </TouchableOpacity>
)

const FriendScreen = (props: Props) => {
  const firstName = props.route.params.firstName
  const lastName = props.route.params.lastName
  const id = props.route.params.id

  const [newAvatar, setNewAvatar] = React.useState('')
  const [newFirstName, setNewFirstName] = React.useState<string>('')
  const [newLastName, setNewLastName] = React.useState<string>('')
  const [changeNameDialogShow, setChangeNameDialogShow] = React.useState(false)

  const onPressOnDeleteFriend = async () => {
    console.log('delete')
    await deleteUserFromFriend({
      avatar: props.route.params.avatar,
      firstName: firstName,
      lastName: lastName,
      id: id
    })
  }

  const openFriendChat = () => {
    // navigate to chat screen
    console.log('open chat with friend')
  }

  const changeUserName = () => {
    setChangeNameDialogShow(true)
  }

  const changeFriendAvatar = () => {
    console.log('load from galary');
    const options: ImageLibraryOptions = { mediaType: 'photo' };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else if (res.assets) {
        if (res.assets.length > 0) {
          if (res.assets[0].uri) {
            setNewAvatar(res.assets[0].uri);
          }
        }
      }
    });
  };

  const onChangeUserNameDismiss = () => {
    setChangeNameDialogShow(false)
    setNewFirstName('')
    setNewLastName('')
  };

  const onPressRefreshData = () => {
    setNewAvatar('')
    setNewFirstName('')
    setNewLastName('')
  }

  const onPressSaveChanges = async () => {
    console.log('Save changes')
    await saveUserChangedData({
      id: id,
      firstName: newLastName !== '' || newFirstName !== '' ? newFirstName:firstName,
      lastName: newLastName !== '' || newFirstName !== '' ? newLastName:lastName,
      avatar: newAvatar != '' ? newAvatar : props.route.params.avatar 
    })
    Toast.showWithGravity(
      'Changes was saved',
      Toast.SHORT,
      Toast.BOTTOM,
    )
  }

  const isUserDataChange = useMemo(() => (newFirstName !== '' || newLastName !== '' || newAvatar !== ''),[newAvatar, newFirstName, newLastName])

  return (
    <View style={{ backgroundColor: '#222222', flex: 1 }}>
      <MainUserHeader
        firstName={(!newFirstName && !newLastName) ? firstName : newFirstName}
        lastName={(!newFirstName && !newLastName) ? lastName : newLastName}
        avaratSize={120}
        id={id}
        avararURL={newAvatar}
        avaratAndNameContainerStyle={style.avatarAndnameContainerStyle}
      />
      <BackgroundForMenus
        style={style.backgroundContainer}
      >
        <View style={style.mainContainer}>
          <View style={style.actionsContainer}>
            <ActionViewCompponent
              icon='message-text-outline'
              label='Open chat'
              onPress={openFriendChat}
            />
            <ActionViewCompponent
              icon='account-circle-outline'
              label='Change friend&apos;s avatar'
              onPress={changeFriendAvatar}
            />
            <ActionViewCompponent
              icon='dots-horizontal-circle-outline'
              label='Change friend&apos;s name'
              onPress={changeUserName}
            />
          </View>
          <View style={style.buttonContainer}>
            {
              isUserDataChange ?
                <View style={style.saveAndRefreshButtonContainer}>
                  <CustomButton
                    label='Save changes'
                    mode='base'
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onTouch={onPressSaveChanges}
                    style={[buttonStyle.style]}
                    sizeStyle={{ width: '48%' }}
                    labelStyle={style.buttonTextStyle}
                  />
                  <CustomButton
                    label='Clear changes'
                    mode='red'
                    onTouch={onPressRefreshData}
                    sizeStyle={{ width: '48%' }}
                    style={[buttonStyle.style]}
                    labelStyle={style.buttonTextStyle}
                  />        
                </View>: ''
            }
            <CustomButton
              label='Delete user from friends'
              mode='red'
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onTouch={onPressOnDeleteFriend}
              style={[style.buttonStyle, buttonStyle.style]}
              labelStyle={style.buttonTextStyle}
            />
          </View>
        </View>
      </BackgroundForMenus>
      <Portal>
        <Dialog visible={changeNameDialogShow} onDismiss={onChangeUserNameDismiss}>
          <Dialog.Title>Set new friend name</Dialog.Title>
          <Dialog.Content>
            <View>
              <TextInput
                label='New first name'
                value={newFirstName}
                onChangeText={setNewFirstName}
                style={{ marginBottom: 20 }}
              />
              <TextInput
                label='New last name'
                value={newLastName}
                onChangeText={setNewLastName}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <IconButton icon={'check'} onPress={() => setChangeNameDialogShow(false)} />
            <IconButton icon={'close'} onPress={onChangeUserNameDismiss} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-between',
  },
  avatarAndnameContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  backgroundContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10
  },
  searchContainerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 0.5,
    borderColor: Color.darkgray
  },
  actionsContainer: { flexDirection: 'column', },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionTextStyle: {
    fontSize: 20,
    color: Color.silver,
    fontFamily: FontFamily.poppinsMedium
  },
  buttonTextStyle: {
    fontSize: 18,
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonStyle: { marginBottom: 50, marginTop: 20 },
  iconStyle: { marginRight: 20 },
  buttonContainer: { flexDirection: 'column', },
  saveAndRefreshButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}) 

export default FriendScreen
  