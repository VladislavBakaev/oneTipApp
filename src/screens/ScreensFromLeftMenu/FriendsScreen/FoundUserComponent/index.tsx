import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View, Text, Image, StyleSheet, Clipboard 
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import Button from '../../../../components/UI/CustomButton';
import {
  buttonStyle, Color, FontFamily 
} from '../../../../styles/GlobalStyles';
import { FriendtackParamList } from '../types';
import { sendRequestToUser } from '../../../../services/friends';
import CustomButton from '../../../../components/UI/CustomButton';

type Props = NativeStackScreenProps<FriendtackParamList, 'FoundUser'>;

const FoundUserComponent = (props: Props) => {
  const user: FriendDataType = {
    avatar: props.route.params.avatar,
    firstName: props.route.params.firstName,
    lastName: props.route.params.lastName,
    id: props.route.params.id,
  }

  const saveToClipboard = () => {
    Clipboard.setString(user.id.toString())
    Toast.showWithGravity(
      'Copied to clipboard',
      Toast.SHORT,
      Toast.BOTTOM,
    )
  }

  const onPressSendRequest = async () => {
    console.log('Send request')
    await sendRequestToUser(user)
  }

  const onPressBack = () => {
    props.navigation.goBack()
  }

  return (
    <View style={style.baseContainer}>
      <Image
        source={
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          require('../../../../assets/avatars/first_avatar.png')
        }
        style={style.avatarStyle}
      />
      <View style={style.nameContainerStyle}>
        <Text style={style.nameTextStyle}>{user.lastName}</Text>
        <Text style={style.nameTextStyle}>{user.firstName}</Text>
      </View>
      <View style={style.idContainerStyle}>
        <Text>id: {user.id}</Text>
        <IconButton icon={'content-copy'} onPress={saveToClipboard} />
      </View>
      <View style={style.buttonContainer}>
        <CustomButton
          label='Send request'
          mode='base'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onTouch={onPressSendRequest}
          sizeStyle={style.buttonStyle}
          style={buttonStyle.style}
          labelStyle={style.buttonTextStyle}
        />
        <CustomButton
          label='Back'
          mode='base'
          onTouch={onPressBack}
          sizeStyle={style.buttonStyle}
          style={buttonStyle.style}
          labelStyle={style.buttonTextStyle}
        />
      </View>
    </View>
  )}

const style = StyleSheet.create({
  baseContainer:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarStyle: {
    width: 250,
    height: 250,
    borderRadius: 125
  },
  idContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  nameContainerStyle: {
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
  },
  nameTextStyle: { fontSize: 26 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonStyle: { width: '48%' },
  buttonTextStyle: {
    fontSize: 18,
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '700',
    textAlign: 'center',
  },
})

export default FoundUserComponent