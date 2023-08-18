import { ViewStyle } from 'react-native';

interface MainContainerCreateType {
    cameraStyle?: ViewStyle,
    style?: ViewStyle,
    photo: string,
    setPhoto: (photo: string) => void,
    contentText: string,
    setContentText: (text: string) => void,
    setContentTextStyle: (style: ContentTextStyleType) => void,
    contentTextStyle: ContentTextStyleType,
    setDefaultContentTextStyle: () => void
}

interface ContentTextStyleType {
    fontSize: number,
    fontFamily: string,
    fontColor: string,
    position: {
        x: number,
        y: number
    }
}

export type {
  MainContainerCreateType,
  ContentTextStyleType,
}