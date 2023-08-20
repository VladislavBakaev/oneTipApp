import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootState } from '../redux/AppStore';
import { useSelector } from 'react-redux';

import SignInView from '../screens/SignInScreen';
import SignUpView from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Home from './Home'
import LoadingScreen from '../screens/Loading';
import FriendScreen from '../screens/ScreensFromLeftMenu/UserScrean';
import { AppStackType } from './types';
import FriendChatScreen from '../screens/FriendChatScreen';

const AppStack = createNativeStackNavigator<AppStackType>();

const AppNavigation = () : JSX.Element => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
  const [loading, setLoading] = React.useState(false)

  return (
    <AppStack.Navigator>
      {loading ? <AppStack.Screen name="Loading" component={LoadingScreen} /> :
        !isLoggedIn ?
          (<AppStack.Group>
            <AppStack.Screen
              name="SignInView"
              component={SignInView}
              options={{
                headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' 
              }}
            />
            <AppStack.Screen
              name="SignUpView"
              component={SignUpView}
              options={{
                headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' 
              }}
            />
            <AppStack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{
                headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' 
              }}
            />
          </AppStack.Group>)
          :
          (<AppStack.Group>
            <AppStack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' 
              }}
            />
            <AppStack.Group>
              <AppStack.Screen
                name='Friend'
                component={FriendScreen}
                options={{
                  headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' 
                }}
              />
              <AppStack.Screen
                name='FriendChat'
                component={FriendChatScreen}
                options={{
                  headerShown: false, animationTypeForReplace: 'push', animation:'slide_from_bottom' 
                }}
              />
            </AppStack.Group>
          </AppStack.Group>)
      }
    </AppStack.Navigator>
  );
}

export default AppNavigation;