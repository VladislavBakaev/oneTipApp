import { Clipboard } from '@react-native-clipboard/clipboard/dist/Clipboard'
import { CSSProperties } from 'react';
import {
  View, Text, StyleSheet, StyleProp, ViewStyle
} from 'react-native'
import { Avatar, IconButton } from 'react-native-paper'
import Toast from 'react-native-simple-toast';
import { Color } from '../../styles/GlobalStyles';

interface MainUserHeaderType {
  avararURL?: string,
  firstName: string,
  lastName: string,
  id: number
  avaratSize?: number
  avaratAndNameContainerStyle?: CSSProperties
}

const MainUserHeader = (props: MainUserHeaderType) => {

  const saveToClipboard = () => {
    Clipboard.setString(props.id.toString())
    Toast.showWithGravity(
      'Copied to clipboard',
      Toast.SHORT,
      Toast.BOTTOM,
    )
  }

  return (
    <View style={style.headerContainer}>
      <View style={
        [style.headerContentStyle, props.avaratAndNameContainerStyle as StyleProp<ViewStyle>]
      }>
        <Avatar.Image size={props?.avaratSize || 35} source={
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          props.avararURL ?
            { uri: props.avararURL }:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            require('../../assets/avatars/first_avatar.png')}
        style={style.avatarStyle} />
        <View style={style.nameContainerStyle}>
          <Text style={style.nameTextStyle}>{props.firstName}</Text>
          <Text style={style.nameTextStyle}>{props.lastName}</Text>
        </View>
      </View>
      <View style={style.idContainerStyle}>
        <Text>id: {props.id}</Text>
        <IconButton icon={'content-copy'} iconColor={Color.iconColor} onPress={saveToClipboard} />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarStyle: { margin: 5 },
  headerContentStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameContainerStyle: {
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
  },
  nameTextStyle: { fontSize: 20 },
  idContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
})

export default MainUserHeader