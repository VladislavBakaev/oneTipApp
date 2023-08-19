import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  Text, View, Image, ScrollView, StyleSheet 
} from 'react-native'
import { Checkbox } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/AppStore'
import { changeGroupFriendsList, deleteCurrentGroup } from '../../../../services/groups'
import {
  Color, FontFamily, buttonStyle 
} from '../../../../styles/GlobalStyles'
import { GroupsStackType } from '..'
import CustomButton from '../../../../components/UI/CustomButton'

interface FriendViewCheck {
  isChecked: boolean
  onPressCheck: (id: number, flag: boolean) => void
}

type Props = NativeStackScreenProps<GroupsStackType, 'GroupScreen'>;

const FriendView = (props: FriendDataType & FriendViewCheck) => (
  <View style={style.friendDataContainer}>
    <Image
      style={style.friendSettingAvatarStyle}
      source={
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        require('../../../../assets/avatars/second_avatar.png')
      } />
    <View style={style.friendNameContainer}>
      <Text style={style.friendNameStyle}>{props.firstName} {props.lastName}</Text>      
    </View>
    <View>
      <Checkbox
        status={props.isChecked ? 'checked' : 'unchecked'}
        onPress={() => {
          props.onPressCheck(props.id, props.isChecked);
        }}
      />      
    </View>
  
  </View>
)
  
const GroupSettingScreen = (props: Props) => {
  const group = props.route.params
  const friends = useSelector((state: RootState) => state.friends.actualFriends)
  const [tempGroupFriends, setTempGroupFriends] = React.useState<Array<number>>([])
  
  React.useEffect(() => {
    setTempGroupFriends(group.friends)
  }, [])

  const sortFriendsList: Array<FriendDataType>  = React.useMemo(() => {
    const groupFriend: FriendDataType[] = []
    const ungroupFriend: FriendDataType[] = []

    friends.forEach((friend, _index) => {
      if (group.friends.includes(friend.id)) {
        groupFriend.push(friend)
      } else {
        ungroupFriend.push(friend)
      }
    })

    return [...groupFriend, ...ungroupFriend]
  }, [friends])
  
  const onPressFriendChecked = (id: number, flag: boolean) => {
    if (!flag) {
      setTempGroupFriends([...tempGroupFriends, id])
    } else  {
      setTempGroupFriends(tempGroupFriends.filter((value) => value !== id))
    }
  }
  
  const onPressSaveButton = () => {
    changeGroupFriendsList({ ids: tempGroupFriends })
  }
  
  const onPressDeleteGroup = () => {
    deleteCurrentGroup({ groupId: group.id })
  }
  
  return (
    <>
      <ScrollView style={style.groupSettingContainer}>
        <Text style={style.groupSettingNameStyle}>
          {group.name}
        </Text>
        {
          sortFriendsList.map((friend, _index) => (
            <FriendView
              key={friend.id} {...friend}
              isChecked={
                tempGroupFriends.includes(friend.id)
              }
              onPressCheck={onPressFriendChecked}
            />
          ))
        }
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CustomButton
          label='Save'
          mode='base'
          onTouch={onPressSaveButton}
          sizeStyle={style.buttonStyle}
          style={buttonStyle.style}
          labelStyle={style.buttonTextStyle}
        />
        <CustomButton
          label='Delete group'
          mode='red'
          onTouch={onPressDeleteGroup}
          sizeStyle={style.buttonStyle}
          style={buttonStyle.style}
          labelStyle={style.buttonTextStyle}
        />
      </View>
    </>
  
  )
}

const style = StyleSheet.create({
  friendSettingAvatarStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  groupSettingNameStyle: { fontSize: 30, color: Color.textColor },
  groupSettingContainer: { flex: 1 },
  buttonStyle: { width: '48%' },
  friendDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom: 10 
  },
  friendNameContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  friendNameStyle: {
    fontSize: 20,
    color: Color.textColor,
    fontFamily: FontFamily.poppinsMedium
  },
  buttonTextStyle: {
    fontSize: 18,
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '700',
    textAlign: 'center',
  },
})


export default GroupSettingScreen