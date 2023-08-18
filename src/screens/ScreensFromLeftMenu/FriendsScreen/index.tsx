import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Searchbar } from 'react-native-paper';

import { BackgroundForMenus } from '../../../components/UI/Backgrounds';
import MainUserHeader from '../../../components/MainUserHeader';
import FriendsTabNavigationComponent from './FriendsTabNavigationComponent';

import { Color } from '../../../styles/GlobalStyles';
import { findUserById } from '../../../services/friends';
import { navigate } from '../../../navigation/navigatorRef';
import FoundUserComponent from './FoundUserComponent';
import { FriendtackParamList } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/AppStore';

const FriendsAndSerchedUserStack = createNativeStackNavigator<FriendtackParamList>();

const FriendsScreen = () => {
  const userData = useSelector((state: RootState) => state.user.user)

  const [ inputSearchId, setInputSearchId ] = React.useState('')
  const [ searchBarLoadingState, setSearchBarLoadingState ] = React.useState(false)

  const onPressFindById = async () => {
    setSearchBarLoadingState(true)
    const result = await findUserById({ id: Number(inputSearchId) })
    setSearchBarLoadingState(false)
    if (result) {
      const testUser: FriendDataType = {
        avatar: '',
        firstName: 'foundName',
        lastName: 'foundSurname',
        id: 2222222
      }
      navigate('FoundUser', testUser)
    } else {
      Toast.showWithGravity(
        'Cant find user with target id',
        Toast.SHORT,
        Toast.BOTTOM,
      )
    }
  }

  return (
    <View style={{ backgroundColor: '#222222', flex: 1 }}>
      <MainUserHeader
        firstName={userData?.firstName || ''}
        lastName={userData?.lastName || ''}
        avaratSize={120}
        id={userData?.id || 0}
        avaratAndNameContainerStyle={style.avatarAndnameContainerStyle}
      />
      <BackgroundForMenus
        style={style.backgroundContainer}
      >
        <>
          <Searchbar
            placeholder='find friend by id'
            placeholderTextColor={Color.silver}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onIconPress={onPressFindById}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onEndEditing={onPressFindById}
            cursorColor={Color.silver}
            value={inputSearchId}
            onChangeText={setInputSearchId}
            style={style.searchContainerStyle}
            keyboardType='numeric'
            loading={searchBarLoadingState}
          />
          <FriendsAndSerchedUserStack.Navigator
            initialRouteName='ActualRequestFriends'
          >
            <FriendsAndSerchedUserStack.Screen
              name='FoundUser'
              component={FoundUserComponent}
              options={{
                headerShown: false,
                animationTypeForReplace: 'push',
                animation:'slide_from_bottom',
                contentStyle: { backgroundColor: 'transparent' }
              }
              }
            />
            <FriendsAndSerchedUserStack.Screen
              name="ActualRequestFriends"
              component={FriendsTabNavigationComponent}
              options={{
                headerShown: false,
                animationTypeForReplace: 'push',
                animation:'slide_from_bottom',
                contentStyle: { backgroundColor: 'transparent' }
              }}
            />
          </FriendsAndSerchedUserStack.Navigator>
        </>

      </BackgroundForMenus>
    </View>
  )
}

const style = StyleSheet.create({
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
})

export default FriendsScreen
  