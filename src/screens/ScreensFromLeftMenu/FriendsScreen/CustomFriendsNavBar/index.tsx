import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import {
  View, Text, StyleSheet 
} from 'react-native';
import { Button } from 'react-native-paper';

interface TabBarPropsType {
  friendsCount: number,
  requestCount: number,
}

const CustomFriendsNavBar = ({ state, descriptors, navigation }: MaterialTopTabBarProps,
  props: TabBarPropsType) => (
  <View style={style.navBarContainerStyle}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
  
      const isFocused = state.index === index;
      const currentTabName = state.routeNames[state.index]
  
      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
  
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };
  
      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };
  
      return (
        <Button
          mode='outlined'
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          labelStyle={style.buttonLabelStyle}
          style={[
            style.navBarButtonStyle,
            route.name===currentTabName?style.activeNavBarButtonStyle:{}
          ]}
          onPress={onPress}
          onLongPress={onLongPress}
          key={label.toString()}
          icon={
            route.name === 'FriendsList' ?
              () => <Text style={style.navButtonIconStyle} >{props.friendsCount}</Text> :
              () => <Text style={
                [style.navButtonIconStyle, style.navButtonRequestStyle ]
              }>{props.requestCount}</Text>
          }
        >
          {label.toString()}
        </Button>
      );
    })}
  </View>
)

const style = StyleSheet.create({
  navBarButtonStyle: { width: '48%', },
  activeNavBarButtonStyle: { backgroundColor: '#7A7A7A' },
  navButtonIconStyle: { fontSize: 25, },
  navButtonRequestStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#0081B8',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  buttonLabelStyle: {
    fontSize: 20,
    padding: 0,
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10 ,
    color: 'white'
  },
  navBarContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
})

export default CustomFriendsNavBar;