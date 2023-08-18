import { store } from '../../redux/AppStore'
import { updateFriendsGroupsListAction } from '../../redux/actions/GroupsActions'

const updatFriendGroupsList = () => {
  // get actual user friends
  const groups: updateFriendsGroupsListType = {
    groups:
    [{
      friends: [234234234, 343435622, 123123122],
      id: 1231241,
      name: 'Friends from work'
    },
    {
      friends: [886767677, 234234444, 678678678],
      id: 2312344,
      name: 'Real friends'
    },
    ]
  }
  store.dispatch(updateFriendsGroupsListAction(groups))
}

const createNewEmptyGroup = (payload: CreateNewEmptyGroupPayloadType) => {
  const groups: updateFriendsGroupsListType = {
    groups:
          [{
            friends: [234234234, 343435622, 123123122],
            id: 1231241,
            name: 'Friends from work'
          },
          {
            friends: [886767677, 234234444, 678678678],
            id: 2312344,
            name: 'Real friends'
          },
          {
            friends: [],
            name: payload.name,
            id: Math.floor(Math.random()*10000000)
          }
          ]
  }
  store.dispatch(updateFriendsGroupsListAction(groups))
}

const deleteCurrentGroup = (payload: DeleteCurrentGroupPayloadTYpe) => {
  console.log(payload)
}

const changeGroupFriendsList = (payload: ChangeGroupFriendsListPayloadType) => {
  console.log(payload)
}

export {
  updatFriendGroupsList,
  createNewEmptyGroup,
  deleteCurrentGroup,
  changeGroupFriendsList
}