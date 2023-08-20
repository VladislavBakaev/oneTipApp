import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackType } from '../../navigation/types';
import UserWidgetComponent, { UserWidgetType } from '../Home/UserWidgetComponent';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet, Text, View, ViewStyle 
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { FontFamily } from '../../styles/GlobalStyles';
import { HomeBackground } from '../../components/UI/Backgrounds';

type Props = NativeStackScreenProps<AppStackType, 'FriendChat'>;

interface UserInfoComponentType {
  style?: ViewStyle
  user: FriendDataType
}

const UserInfoComponent = (props: UserInfoComponentType) => (
  <View style={props.style}>
    <Image
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      source={require('../../assets/avatars/first_avatar.png')}
      style={style.userAvatarStyle}
    />
    <Text style={[style.userNameStyle, { marginRight: 10 }]}>
      {props.user.firstName}
    </Text>
    <Text style={style.userNameStyle}>{props.user.lastName}</Text>
  </View>
)

const FriendChatScreen = (props: Props) => {
  const user = props.route.params
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
        lat: 45.2323,
        lng: 54.233,
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
        lat: 45.2323,
        lng: 54.233,
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
        lat: 45.2323,
        lng: 54.233,
      },
      music: {
        author: 'name surname',
        name: 'Music name'
      },
      selectedReactions: ['smile']
    }
  ]

  return (
    <SafeAreaView style={style.mainContainer}>
      <View
        style={style.headContainerStyle}
      >
        <IconButton icon='chevron-left' onPress={() => props.navigation.goBack()} size={30} />
        <UserInfoComponent
          user={user}
          style={style.userContainerStyle}
        />
      </View>
      <HomeBackground>
        <Animated.ScrollView style={style.scrollContainerStyle}>
          {
            widgetsArray.map((widget, _index) => (
              <UserWidgetComponent
                key={widget.user.id}
                widget={widget}
                showUserState={false}
                mainStyle={
                  [
                    style.widgetStyle,
                    widget.user.id === user.id ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }
                  ]
                }
              />
            ))
          }
        </Animated.ScrollView>
      </HomeBackground>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#313131',
  },
  headContainerStyle: {
    zIndex: 10,
    backgroundColor: '#3C3C3C',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 7,
  },
  userAvatarStyle: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  userContainerStyle: {
    flexDirection: 'row',
    alignItems:'center',
    padding: 5,
    marginLeft: 10,
  },
  userNameStyle: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 18
  },
  scrollContainerStyle: {
    paddingRight: 10,
    paddingLeft: 10
  },
  widgetStyle: { width: '95%' }
})

export default FriendChatScreen