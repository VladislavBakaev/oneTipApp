interface UserStore {
    isLoggedIn: boolean,
    isLoggingNow: boolean,
    logingError: {
        state: boolean,
        message: string,
    }
    user?:{
        id: number,
        lastName: string,
        firstName: string,
        accessKey: string,
        refreshKey: string,
        avatar: string
    }
}

interface FriendsStore {
    actualFriends: Array<FriendDataType>
    requestFriends: Array<FriendDataType>
}

interface GroupsStore {
    groups: Array<GroupData>
}

interface MainAppStore {
    isLoading: boolean
}

interface GroupData {
    name: string
    id: number
    friends: Array<number>
}

interface FriendDataType {
    firstName: string,
    lastName: string,
    id: number,
    avatar: string
  }

interface SetLogginInStatePayload {
    state: boolean,
}

interface updateFriendsGroupsListType {
    groups: Array<GroupData>
}

interface UpdateActualFriendsListType {
    actualFriends: Array<FriendDataType>
}

interface UpdateRequestFriendsListType {
    requestFriends: Array<FriendDataType>
}

interface UpdateLoadingState {
    state: boolean
}