import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
} from 'react-native';
import { IconButton } from 'react-native-paper';

import MainContentCreateView from './MainContentCreateView';
import { HomeBackground } from '../../components/UI/Backgrounds';
import UserWidgetComponent,
{ UserWidgetType } from './UserWidgetComponent';
import { ParamListBase } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { updateActialFriendsList, updateRequestFriendsList } from '../../services/friends';
import { updatFriendGroupsList } from '../../services/groups';

const Home = ({ navigation }: DrawerScreenProps<ParamListBase>) => {

  React.useEffect(() => {
    updateActialFriendsList()
    updateRequestFriendsList()
    updatFriendGroupsList()
  })

  const openMenuButtonPress = () => {
    navigation.openDrawer()
  }

  const openContentConfigButtonPress = () => {
    console.log('open config content button press')
  }

  const widgetsArray: Array<UserWidgetType> = [
    {
      atCreate: new Date(2018, 11, 24, 10, 33, 30, 0),
      user: {
        firstName: 'First Name',
        lastName: 'Last Name',
        avatar: '',
        id: 12341234
      },
      geolocation: {
        lat: 55.730149,
        lng: 37.631258,
      },
      music: {
        author: 'name surname',
        name: 'Music name'
      },
      selectedReactions: ['smile']
    },
    {
      atCreate: new Date(2018, 11, 24, 10, 33, 30, 0),
      user: {
        firstName: 'First Name',
        lastName: 'Last Name',
        avatar: '',
        id: 4442244,
      },
      geolocation: {
        lat: 55.730149,
        lng: 37.631258,
      },
      music: {
        author: 'name surname',
        name: 'Music name'
      },
      selectedReactions: ['smile']
    },
    {
      atCreate: new Date(2018, 11, 24, 10, 33, 30, 0),
      user: {
        firstName: 'First Name',
        lastName: 'Last Name',
        avatar: '',
        id: 1231233,
      },
      geolocation: {
        lat: 55.730149,
        lng: 37.631258,
      },
      music: {
        author: 'name surname',
        name: 'Music name'
      },
      selectedReactions: ['smile']
    }
  ]

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
          <MainContentCreateView />
          {
            widgetsArray.map((widget, key) => (
              <UserWidgetComponent
                widget={widget}
                key={widget.user.id}
                onUserClick={() => navigation.navigate('FriendChat', widget.user) }
                showUserState={true}
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
    paddingLeft: 5,
    paddingRight: 5,
  }
})

export default Home