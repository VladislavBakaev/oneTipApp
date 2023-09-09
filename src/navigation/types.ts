export type AppStackType = {
    Home: undefined,
    Friend: FriendDataType,
    FriendChat: FriendDataType,
    Loading: undefined,
    SignInView: undefined,
    SignUpView: undefined,
    ForgotPassword: undefined,
    MapSelectorScreen: undefined,
    MusicSelectorScreen: MusicSelectorScreenType,
}

interface MusicSelectorScreenType {
    updateTrackURL: (url: string) => void
    trackUrl: string
}