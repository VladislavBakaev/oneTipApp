import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
} from 'react-native';
import { IconButton } from 'react-native-paper';

import MainContentCreateView from './MainContentCreateView';
import { ContentTextStyleType } from './MainContentCreateView/types';
import { HomeBackground } from '../../components/UI/Backgrounds';
import UserWidgetComponent,
{ UserWidgetComponentType } from './UserWidgetComponent';
import { ParamListBase } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { updateActialFriendsList, updateRequestFriendsList } from '../../services/friends';
import { updatFriendGroupsList } from '../../services/groups';


interface UserWidgetListComponentType {
    widgets: Array<UserWidgetComponentType>
}

const Home = ({ navigation }: DrawerScreenProps<ParamListBase>) => {

  React.useEffect(() => {
    updateActialFriendsList()
    updateRequestFriendsList()
    updatFriendGroupsList()
  })

  const contentTextStyleDefault: ContentTextStyleType = {
    fontColor: 'white',
    fontFamily: 'Roboto',
    fontSize: 30,
    position: { x: 0, y: 0 }
  }

  const [photo, setPhoto] = React.useState('')
  const [contentText, setContentText] = React.useState('')
  const [
    contentTextStyle, setContentTextStyle
  ] = React.useState<ContentTextStyleType>(contentTextStyleDefault)
  const openMenuButtonPress = () => {
    navigation.openDrawer()
  }
  const openContentConfigButtonPress = () => {
    console.log('open config content button press')
  }

  const setContentTextStyleDefault = () => {
    setContentTextStyle(contentTextStyleDefault)
  }

  const widgetsArray: UserWidgetListComponentType = {
    widgets: [
      {
        widget:{
          atCreate: new Date(2018, 11, 24, 10, 33, 30, 0),
          user: {
            firstName: 'First Name',
            lastName: 'Last Name',
            avatar: ''
          },
          geolocation: {
            lat: 45.2323,
            lng: 54.233,
          },
          music: {
            author: 'name surname',
            name: 'Music name'
          },
          selectedReactions: ['smile']
        }
      },
      {
        widget:{
          atCreate: new Date(2018, 11, 24, 10, 33, 30, 0),
          user: {
            firstName: 'First Name',
            lastName: 'Last Name',
            avatar: ''
          },
          geolocation: {
            lat: 45.2323,
            lng: 54.233,
          },
          music: {
            author: 'name surname',
            name: 'Music name'
          },
          selectedReactions: ['smile']
        }
      },
      {
        widget:{
          atCreate: new Date(2018, 11, 24, 10, 33, 30, 0),
          user: {
            firstName: 'First Name',
            lastName: 'Last Name',
            avatar: ''
          },
          geolocation: {
            lat: 45.2323,
            lng: 54.233,
          },
          music: {
            author: 'name surname',
            name: 'Music name'
          },
          selectedReactions: ['smile']
        }
      },
    ]
  }

  return (
    <SafeAreaView style={style.baseContainer}>
      <View style={style.headerContainer}>
        <IconButton 
          icon={'menu'}
          size={30}
          onPress={openMenuButtonPress}
        />
        <IconButton
          icon={'send'}
          onPress={openContentConfigButtonPress}
        />
      </View>
      <HomeBackground>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={style.scrollViewStyle}
          scrollEventThrottle={16}
        >
          <MainContentCreateView
            cameraStyle={{ width: '100%', height: 400 }}
            photo={photo}
            setPhoto={setPhoto}
            contentText={contentText}
            setContentText={setContentText}
            contentTextStyle={contentTextStyle}
            setContentTextStyle={setContentTextStyle}
            setDefaultContentTextStyle={setContentTextStyleDefault}
          />
          {
            widgetsArray.widgets.map((widget, key) => (
              <UserWidgetComponent
                widget={widget.widget}
                key={key}
              />
            )) 
          }
        </Animated.ScrollView>
      </HomeBackground>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#313131',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#3C3C3C',
    zIndex: 2,
    width: '100%',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 7,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  scrollViewStyle: {
    // flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  }
})

export default Home