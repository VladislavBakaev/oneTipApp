import {
  View, Image, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/AppStore'
import { IconButton } from 'react-native-paper'
import { navigate } from '../../../../navigation/navigatorRef'
import { acceptUserRequest, dismissUserRequest } from '../../../../services/friends'

interface RequestFriendEvent {
  acceptFriend?: (friend: FriendDataType) => void
  dismissFriend?: (friend: FriendDataType) => void
  onPressFriend?: (friend: FriendDataType) => void
}

const FriendDataComponent = (props: FriendDataType & RequestFriendEvent) => {
  const friend: FriendDataType = {
    avatar: props.avatar,
    firstName: props.firstName,
    lastName: props.lastName,
    id: props.id
  }
  return (
    <TouchableOpacity
      delayPressIn={50}
      onPress={() => props.onPressFriend? props.onPressFriend(friend):''}
      activeOpacity={props.acceptFriend ? 1 : 0.5}
      style={styleFriednComponent.friendComponentContainer}
    >
      <View style={styleFriednComponent.friendAvatarContainer}>
        <Image style={styleFriednComponent.friendAvatarStyle} source={
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          require('../../../../assets/image/photo.jpg')
        } />      
      </View>
      <View style={styleFriednComponent.friendNameContainer}>
        <Text style={styleFriednComponent.friednNameTextStyle}>{friend.lastName}</Text>
        <Text>    </Text>
        <Text style={styleFriednComponent.friednNameTextStyle}>{friend.firstName}</Text>
      </View>
      {props.acceptFriend && props.dismissFriend ?
        <View style={styleFriednComponent.acceptDismissContainer}>
          <IconButton
            icon={'check'}
            style={styleFriednComponent.acceptButtonStyle}
            onPress={() => props.acceptFriend? props.acceptFriend(friend):''}
          />
          <IconButton
            icon={'close'}
            style={styleFriednComponent.dismissButtonStyle}
            onPress={() => props.dismissFriend? props.dismissFriend(friend):''}
          />
        </View>
        : ''
      }
    </TouchableOpacity>
  )
}
  
export const FriendsList = () => {
  const friendsList = useSelector((state: RootState) => state.friends.actualFriends)

  const onPressFriend = (friend: FriendDataType) => {
    navigate('Friend', friend)
  }
  
  return (
    <ScrollView style={styleFriendsContainer.mainContainer}>
      {
        friendsList.map((friend, _index) => (
          <FriendDataComponent
            {...friend}
            key={friend.id}
            onPressFriend={onPressFriend}
          />
        ))
      }
    </ScrollView>
  )
}
  
export const RequestFriendsList = () => {
  const requestFriends = useSelector((state: RootState) => state.friends.requestFriends)

  const acceptFriend = async (friend: FriendDataType) => {
    await acceptUserRequest(friend)
    console.log(`accept friends ${friend.id}`)
  }
  const dismissFriend = async (friend: FriendDataType) => {
    await dismissUserRequest(friend)
    console.log(`dismiss friends ${friend.id}`)
  }
  
  return (
    <ScrollView style={styleFriendsContainer.mainContainer}>
      {
        requestFriends.map((friend, _index) => (
          <FriendDataComponent
            {...friend}
            key={friend.id}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            acceptFriend={acceptFriend}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            dismissFriend={dismissFriend}
          />
        ))
      }
    </ScrollView>
  )
}

const styleFriednComponent = StyleSheet.create({
  friendComponentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7A7A7A',
    marginBottom: 5,
  },
  friendAvatarContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    marginRight: 30,
    flex: 1,
  },
  friendAvatarStyle: {
    width: 80,
    height: 80,
    borderRadius: 40 
  },
  friednNameTextStyle: { fontSize: 20 },
  friendNameContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    flex: 2
  },
  acceptDismissContainer: { flexDirection: 'column', },
  acceptButtonStyle: { backgroundColor: '#0081B8', },
  dismissButtonStyle: { backgroundColor: '#6B0C0C' }
})

const styleFriendsContainer = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  }
})
