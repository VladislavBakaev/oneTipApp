import { ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import {
  Keyboard, View, TouchableOpacity, ScrollView, Image, Text, StyleSheet 
} from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/AppStore'
import { createNewEmptyGroup } from '../../../../services/groups'
import { FontFamily, Color } from '../../../../styles/GlobalStyles'

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

interface GroupConponentEventType {
  onPress?: () => void
}

const GroupConponent = (props: GroupData & GroupConponentEventType) => {

  const avatarsStyles = [
    style.firstFriendsAvatarStyle,
    style.secondFriendsAvatarStyle,
    style. thirtFriendAvatarStyle
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
    <TouchableOpacity
      style={style.groupViewStyle}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      <View style={style.friendsAvatarsContainer}>
        {
          groupsAvatartForView.length ?
            groupsAvatartForView.map((_el, index) => (
              <Image
                key={index}
                style={[avatarsStyles[index], style.friendsAvatarStyle]}
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
      <View style={style.groupDataContainer}>
        <Text style={style.groupNameStyle}>{props.name}</Text>
        <Text style={style.groupMemberTextStyle}>{props.friends.length.toString() + ' memberships'}</Text>
      </View>
    </TouchableOpacity>
  ) 
}

const GroupsScreenComponent = ({ navigation }: IPageProps) => {
  const [newGroupName, setNewGroupName] = React.useState('')
  const groups = useSelector((state: RootState) => state.groups.groups)
  
  const onPressCreateGroup = () => {
    Keyboard.dismiss()
    createNewEmptyGroup({ name: newGroupName })
    setNewGroupName('')
  }
   
  const onPressGroup = (group: GroupData) => {
    navigation.navigate('GroupScreen', group)
  }
  
  const isGroupNameExist = React.useMemo(() => newGroupName !== '', [newGroupName])
  
  return (
    <View style={style.groupsListContainer}>
      <TextInput
        value={newGroupName}
        onChangeText={setNewGroupName}
        label='new group name'
        style={style.groupNameInputStyle}
        underlineColor='transparent'
        outlineColor='transparent'
        activeOutlineColor='transparent'
        onEndEditing={isGroupNameExist ? onPressCreateGroup: undefined}
      />
      <TouchableOpacity
        style={[
          style.addButtonStyle, isGroupNameExist?style.addButtonEnable:style.addButtonDisable
        ]}
        onPress={onPressCreateGroup}
        disabled={!isGroupNameExist}
      >
        <IconButton icon='plus'/>
      </TouchableOpacity>
      <ScrollView style={style.groupsContainerStyle}>
        {groups.map((group, _index) => (
          <GroupConponent
            {...group}
            key={group.id}
            onPress={() => onPressGroup(group)}
          />
        ))}
      </ScrollView>
    </View>
  
  )
}

const style = StyleSheet.create({
  groupViewStyle: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7A7A7A',
    marginBottom: 10,
    paddingBottom: 5,
  },
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
  },
  friendsAvatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  groupsContainerStyle: { 
    width: '100%',
    flex: 1
  },
  groupDataContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  groupNameStyle: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 20,
    color: Color.textColor,
  },
  groupMemberTextStyle: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 16,
    color: Color.silver
  },
  groupsListContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  groupNameInputStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 0.5,
    borderColor: Color.darkgray,
    height: 60,
    width: '100%',
    borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addButtonStyle: {
    width: 60,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 20
  },
  addButtonEnable: {
    backgroundColor: '#0081B8',
    borderColor: '#00A3E9',
  },
  addButtonDisable: {
    backgroundColor: '#757575',
    borderColor: '#A5A5A5',
  },
})

export default GroupsScreenComponent