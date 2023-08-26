import React from "react"
import { Animated, Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import { HomeBackground } from "../../../../components/UI/Backgrounds"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/AppStore"
import { IconButton } from "react-native-paper"
import { Color, FontFamily } from "../../../../styles/GlobalStyles"
import CustomButton from "../../../../components/UI/CustomButton"

interface SelectFriendsForSendType {
    visible: boolean
    setVisible: (flag: boolean) => void
}

const GroupConponent = (props: GroupData) => {
  const avatarsStyles = [
    styleGroupComponent.firstFriendsAvatarStyle,
    styleGroupComponent.secondFriendsAvatarStyle,
    styleGroupComponent. thirtFriendAvatarStyle
  ]

  const groupsAvatartForView = React.useMemo(() => {
    let res = []
    if (props.friends.length >= 3) {
      res = props.friends.slice(0,3)
    } else {
      res = props.friends
    }
    return res
  }, [props.friends])

  return (
    <View
      style={styleGroupComponent.groupViewStyle}
    >
      <View style={styleGroupComponent.friendsAvatarsContainer}>
        {
          groupsAvatartForView.length ?
            groupsAvatartForView.map((_el, index) => (
              <Image
                key={index}
                style={[avatarsStyles[index], styleGroupComponent.friendsAvatarStyle]}
                source={
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  require('../../../../assets/avatars/first_avatar.png')
                } />            
            )):
            <IconButton
              size={60}
              icon='account-circle-outline'
            />
        }

      </View>
      <View style={styleGroupComponent.groupDataContainer}>
        <Text style={styleGroupComponent.groupNameStyle}>{props.name}</Text>
        <Text style={styleGroupComponent.groupMemberTextStyle}>{props.friends.length.toString() + ' memberships'}</Text>
      </View>
    </View>
  ) 
}

const FriendDataComponent = (props: FriendDataType) => {
  const friend: FriendDataType = {
    avatar: props.avatar,
    firstName: props.firstName,
    lastName: props.lastName,
    id: props.id
  }
  return (
    <View
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
    </View>
  )
}

const SelectFriendsForSendComponent = (props: SelectFriendsForSendType) => {

  const friends = useSelector((state: RootState) => state.friends.actualFriends)
  const groups = useSelector((state: RootState) => state.groups.groups)

  const fadeAnim = React.useRef(new Animated.Value(500)).current;

  React.useEffect(() => {
    if(props.visible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [props.visible])

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => props.setVisible(false));
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={closeModal}
    >
      <View
        style={style.mainContainer}
      >
        <Animated.View
          style={[
            {
              translateY: fadeAnim
            },
            style.contentContainer
          ]}
        >
          <HomeBackground>
            <>
              <ScrollView style={style.scrollContainer}>
                {
                  groups.map((group, _index) => (
                    <GroupConponent
                      {...group}
                      key={group.name}
                    />
                  ))
                }
                {
                  friends.map((friend, _index) => (
                    <FriendDataComponent
                      {...friend}
                      key={friend.id}
                    />
                  ))
                }              
              </ScrollView>
              <CustomButton
                label="Send"
                mode="base"
                style={style.sendButtonStyle}
                labelStyle={style.sendButtonLabelStyle}
              />            
            </>
          </HomeBackground>
        </Animated.View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: 500,
    bottom: 0,
    backgroundColor: '#313131'
  },
  scrollContainer: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  sendButtonStyle: {
    width: 120,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonLabelStyle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium
  }
})

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
})

const styleGroupComponent = StyleSheet.create({
  firstFriendsAvatarStyle: {
    zIndex: 3,
    top: 5
  },
  secondFriendsAvatarStyle: {
    position: 'absolute',
    left: 30,
    top: 10,
    zIndex: 1
  },
  thirtFriendAvatarStyle: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 2
  },
  friendsAvatarsContainer: {
    height: 80,
    width: 80,
    marginLeft:20,
    marginRight: 50
  },
  friendsAvatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  groupDataContainer: {
    // position: 'absolute',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  groupNameStyle: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 20,
    color: Color.textColor,
  },
  groupViewStyle: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7A7A7A',
    marginBottom: 10,
    paddingBottom: 5,
  },
  groupMemberTextStyle: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 16,
    color: Color.silver
  },
})

export default SelectFriendsForSendComponent