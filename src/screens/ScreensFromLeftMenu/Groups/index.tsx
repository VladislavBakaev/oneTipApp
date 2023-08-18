import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackgroundForMenus } from '../../../components/UI/Backgrounds';
import MainUserHeader from '../../../components/MainUserHeader';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/AppStore';
import GroupsScreenComponent from './GroupsScreenComponent';
import GroupSettingScreen from './GroupScreenSettingComponent';

export type GroupsStackType = {
  GroupsList: undefined,
  GroupScreen: GroupData
}

const GroupsStack = createNativeStackNavigator<GroupsStackType>();

const GroupsScreen = () => {
  const userData = useSelector((state: RootState) => state.user.user)

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
        <GroupsStack.Navigator>
          <GroupsStack.Screen
            name='GroupsList'
            component={GroupsScreenComponent}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
              animation:'slide_from_bottom',
              contentStyle: { backgroundColor: 'transparent' }
            }
            }
          />
          <GroupsStack.Screen
            name='GroupScreen'
            component={GroupSettingScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
              animation:'slide_from_bottom',
              contentStyle: { backgroundColor: 'transparent' }
            }
            }
          />
        </GroupsStack.Navigator>
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
})

export default GroupsScreen
  