import { store } from '../../redux/AppStore';
import { updateActialFriendsListAction, updateRequestFriendsListAction } from '../../redux/actions/FriendsActions';

const updateActialFriendsList = () => {
  // get actual user friends
  const friends: UpdateActualFriendsListType = {
    actualFriends:
        [{
          avatar: '', firstName: 'name1', lastName: 'surname1', id: 234234234
        },
        {
          avatar: '', firstName: 'name2', lastName: 'surname2', id: 343435622
        },
        {
          avatar: '', firstName: 'name5', lastName: 'surname5', id: 123123122
        },
        {
          avatar: '', firstName: 'name6', lastName: 'surname6', id: 886767677
        },
        {
          avatar: '', firstName: 'name7', lastName: 'surname7', id: 234234444
        },
        {
          avatar: '', firstName: 'name8', lastName: 'surname8', id: 678678678
        },
        {
          avatar: '', firstName: 'name9', lastName: 'surname9', id: 234567897
        }
        ]
  }
  store.dispatch(updateActialFriendsListAction(friends))
}

const getUserById = (id: number) => {
  const friends = store.getState().friends.actualFriends
  const targetFriend = friends.find((friend) => friend.id === id)
  return targetFriend
}

const updateRequestFriendsList = () => {
  // get actual user friends
  const friends: UpdateRequestFriendsListType = {
    requestFriends:
        [{
          avatar: '', firstName: 'name3', lastName: 'surname3', id: 56785677
        },
        {
          avatar: '', firstName: 'name4', lastName: 'surname4', id: 12342344
        }]
  }
  store.dispatch(updateRequestFriendsListAction(friends))
}

const findUserById = (payload: FindUserById) => {
  console.log(payload)
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(true);
    }, 2000);
  })
}

const acceptUserRequest = (payload: FriendDataType) => new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve(true);
  }, 1000);
})

const dismissUserRequest = (payload: FriendDataType) => new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve(true);
  }, 1000);
})

const sendRequestToUser = (payload: FriendDataType) => new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve(true);
  }, 1000);
})

const deleteUserFromFriend = (payload: FriendDataType) => new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve(true);
  }, 1000);
})

const saveUserChangedData = (payload: FriendDataType) => new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve(true);
  }, 1000);
})


export {
  updateActialFriendsList, 
  updateRequestFriendsList,
  findUserById,
  acceptUserRequest,
  dismissUserRequest,
  sendRequestToUser,
  deleteUserFromFriend,
  saveUserChangedData,
  getUserById
}