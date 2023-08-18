import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/AppStore'
import CustomFriendsNavBar from '../CustomFriendsNavBar'
import { FriendsList, RequestFriendsList } from '../FriendsListComponents'

const FriendsStack = createMaterialTopTabNavigator();

const FriendsTabNavigationComponent = () => {
  const friendsCount = useSelector((state: RootState) => state.friends.actualFriends.length)
  const requestCount = useSelector((state: RootState) => state.friends.requestFriends.length)
  
  return (
    <FriendsStack.Navigator
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      tabBar={
        (props:MaterialTopTabBarProps) => 
          CustomFriendsNavBar(props, { requestCount,friendsCount })
      }
    >
      <FriendsStack.Screen
        name="FriendsList"
        component={FriendsList}
        options={{ tabBarLabel: 'Friends' }}
      />
      <FriendsStack.Screen
        name="RequestFriendsList"
        component={RequestFriendsList}
        options={{ tabBarLabel: 'Requests' }}
      />
    </FriendsStack.Navigator>
  )
}

export default FriendsTabNavigationComponent