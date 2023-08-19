import Home from '../../screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Color } from '../../styles/GlobalStyles';
import DrawerLeftMenuComponent from './DrawerLeftMenuComponent';
import FriendsScreen from '../../screens/ScreensFromLeftMenu/FriendsScreen';
import GroupsScreen from '../../screens/ScreensFromLeftMenu/Groups';
import SettingScreen from '../../screens/ScreensFromLeftMenu/Settings';

const Drawer = createDrawerNavigator();

const AppNavigation = () : JSX.Element => (
  <>
    <Drawer.Navigator
      initialRouteName="BaseScreen"
      drawerContent={(props) => (
        <DrawerLeftMenuComponent {...props} />
      )}
      screenOptions={{ drawerStyle: { backgroundColor: '#222222' } }}
    >
      <Drawer.Screen
        name="BaseScreen"
        component={Home}
        options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (<IconButton icon={'account-outline'} size={drawerIconProps.size} iconColor={Color.iconColor} style={drawerStyles.iconStyle} />),
          drawerItemStyle: drawerStyles.itemStyle,
          drawerLabel: 'Friends',
          drawerLabelStyle: drawerStyles.labelStyle,
          drawerActiveBackgroundColor: '#0081B820',
        }}
      />
      <Drawer.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (<IconButton icon={'account-group-outline'} size={drawerIconProps.size} style={drawerStyles.iconStyle} />),
          drawerItemStyle: drawerStyles.itemStyle,
          drawerLabel: 'Groups',
          drawerLabelStyle: drawerStyles.labelStyle,
          drawerActiveBackgroundColor: '#0081B820',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (<IconButton icon={'cog-outline'} size={drawerIconProps.size} style={drawerStyles.iconStyle} />),
          drawerItemStyle: drawerStyles.itemStyle,
          drawerLabel: 'Settings',
          drawerLabelStyle: drawerStyles.labelStyle,
          drawerActiveBackgroundColor: '#0081B820',
        }}
        
      />
      <Drawer.Screen
        name="About"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: () => (<IconButton icon={'progress-question'} size={drawerIconProps.size} style={drawerStyles.iconStyle} />),
          drawerItemStyle: drawerStyles.itemStyle,
          drawerLabel: 'About',
          drawerLabelStyle: drawerStyles.labelStyle,
          drawerActiveBackgroundColor: '#0081B820',
        }}
      />
    </Drawer.Navigator>
  </>
)

export default AppNavigation;

const drawerStyles = StyleSheet.create({
  itemStyle: { borderRadius: 30 },
  labelStyle: { fontSize: 18, color: Color.silver },
  iconStyle: { margin: 0 }
})

const drawerIconProps = { size: 55 }