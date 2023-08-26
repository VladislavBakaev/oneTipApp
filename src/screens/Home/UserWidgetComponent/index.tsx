import {
  Animated, Image,  LayoutChangeEvent,
  Linking, Platform, StyleProp,
  StyleSheet, Text, View, ViewStyle 
} from 'react-native'
import { Color, FontFamily } from '../../../styles/GlobalStyles'
import React from 'react';
import { IconButton } from 'react-native-paper';

interface UserWidgetType {
  atCreate: Date,
  music?: {
      author: string,
      name: string
  },
  geolocation?: {
      lat: number,
      lng: number
  },
  user: FriendDataType,
  selectedReactions?: Array<string>
}
interface UserWidgetComponentType {
    mainStyle?: StyleProp<ViewStyle>,
    config?: {animated: object}
    onUserClick?: () => void
    showUserState: boolean
    widget: UserWidgetType
}

interface ReactionsType {
    reactions: Array<ReactionItemType>
}

interface ReactionItemType {
    id: number,
    emoji: string,
    title: string
}

const reactionItems: ReactionsType = {
  reactions: 
        [
          {
            id: 0,
            emoji: '😇',
            title: 'like',
          },
          {
            id: 1,
            emoji: '🥰',
            title: 'love',
          },
          {
            id: 2,
            emoji: '🤗',
            title: 'care',
          },
          {
            id: 3,
            emoji: '😘',
            title: 'kiss',
          },
          {
            id: 4,
            emoji: '😂',
            title: 'laugh',
          },
          {
            id: 5,
            emoji: '😎',
            title: 'cool',
          },
        ]
}

const UserWidgetComponent = (props: UserWidgetComponentType) => {
  const [selectedEmojis, setSelectedEmojis] = React.useState<ReactionsType>({ reactions: [] });
  const [widgetImageHeight, setWidgetImageHeight] = React.useState(400)
  const atCreateDateFormated = React.useMemo(() => {
    const day = props.widget.atCreate.getDate()
    const month = props.widget.atCreate.getMonth()
    const hour = props.widget.atCreate.getHours()
    const minutes = props.widget.atCreate.getMinutes()
    return `${hour}:${minutes} ${month}/${day}`
  }, [props.widget.atCreate])


  const updateSelectedEmojis = (touchedReaction: ReactionItemType) => {
    if (selectedEmojis.reactions.find((reaction) => reaction.id === touchedReaction.id)){
      setSelectedEmojis(selectedEmojis => (
        // eslint-disable-next-line max-len
        { reactions:selectedEmojis.reactions.filter((reaction) => reaction.id !== touchedReaction.id) }
      ))
    } else {
      setSelectedEmojis(
        selectedEmojis => ({ reactions: [...selectedEmojis.reactions, touchedReaction] })
      )
    }
  }

  const selectedEmojisId = () => {
    const id: Array<number> = []
    selectedEmojis.reactions.forEach((value, key) => {
      id.push(value.id)
    })
    return id
  }

  const containerSizeChange = (event: LayoutChangeEvent) => {
    const widht = event.nativeEvent.layout.width
    setWidgetImageHeight(widht)
  }

  const onPressMarkerMap = () => {
    console.log(props.widget.geolocation)
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' }) || '';
    const latLng = `${props.widget.geolocation?.lat.toString() || ''},${props.widget.geolocation?.lng.toString() || ''}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url || '');
  }

  const onPressMusicPlay = () => {
    const url = 'https://music.yandex.ru/album/25273766/track/112419307?utm_medium=copy_link'
    Linking.openURL(url)
  }

  return (
    <Animated.View
      style={[style.mainContainer, props.mainStyle, props.config?.animated]}
      onLayout={containerSizeChange}
    >
      <View>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require('../../../assets/image/photo.jpg')}
          style={[style.imageContainer, { height: widgetImageHeight }]}
        />
        <IconButton
          icon='map-marker'
          style={style.mapMarkerWidgetStyle}
          size={50}
          iconColor={style.mapMarkerWidgetStyle.color}
          onPress={onPressMarkerMap}
        />
        <View style={style.musicWidgetContainer}>
          <IconButton
            icon='play' 
            size={60}
            iconColor='#00A2E7'
            onPress={onPressMusicPlay}
          />
          <View style={style.musicDataContainer}>
            <Text style={style.musicNameStyle}>{props.widget.music?.name}</Text>
            <Text style={style.musicAuthorStyle}>{props.widget.music?.author}</Text>
          </View>
        </View>
        <View style={style.widgetAtCreateContainer}>
          <Text style={style.widgetAtCreateTextStyle}>
            {atCreateDateFormated}
          </Text>
        </View>
      </View>

      { props.showUserState && 
        <View style={style.userContainerStyle} onTouchEnd={props.onUserClick}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require('../../../assets/avatars/first_avatar.png')}
            style={style.userAvatarStyle}
          />
          <Text style={[style.userNameStyle, { marginRight: 10 }]}>
            {props.widget.user.firstName}
          </Text>
          <Text style={style.userNameStyle}>{props.widget.user.lastName}</Text>
        </View>
      }
      <View style={style.emojiContainerStyle}>
        {reactionItems.reactions.map((reaction, key)=>(
          <Text
            key={reaction.id}
            style={[
              style.emojiStyle,
              selectedEmojisId().includes(reaction.id) ? style.pressedEmojiStyle : {}
            ]}
            onPress={() => updateSelectedEmojis(reaction)}
          >
            {reaction.emoji}
          </Text>
        ))}
      </View>
    </Animated.View>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ABABAB50',
    width:'100%',
    // padding: 10,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'column',
  },
  imageContainer: {
    borderRadius: 30,
    height: 400,
    width:'100%',
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
  emojiContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
  },
  emojiStyle: { fontSize: 35, },
  pressedEmojiStyle: {
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  mapMarkerWidgetStyle: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    color: '#0081B8'
  },
  musicWidgetContainer: {
    backgroundColor: 'rgba(0, 129, 184, 0.7)',
    height: 60,
    borderRadius: 30,
    width: '95%',
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  musicDataContainer: { flexDirection: 'column' },
  musicNameStyle: {
    fontSize: 20,
    color: Color.textColor,
    fontFamily: FontFamily.poppinsMedium
  },
  musicAuthorStyle: {
    fontSize: 16,
    color: Color.textColor,
    fontFamily: FontFamily.poppinsMedium
  },
  widgetAtCreateContainer: {
    position: 'absolute',
    right: 10, 
    height: 30,
    backgroundColor: 'rgba(0, 129, 184, 0.7)',
    borderRadius: 15,
    marginTop: 10,
    alignSelf:'flex-end',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  widgetAtCreateTextStyle: {
    textAlignVertical: 'center',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: FontFamily.poppinsMedium
  }
})

export default UserWidgetComponent

export type { UserWidgetType,  }