import {
  Animated, Image, LayoutChangeEvent, StyleSheet, Text, View, ViewStyle 
} from 'react-native'
import { FontFamily } from '../../../styles/GlobalStyles'
import React from 'react';

interface UserWidgetComponentType {
    mainStyle?: ViewStyle,
    config?: {animated: object}
    onLayout?: (event: LayoutChangeEvent) => void
    widget: {
        atCreate: Date,
        music?: {
            author: string,
            name: string
        },
        geolocation?: {
            lat: number,
            lng: number
        },
        user: {
            firstName: string,
            lastName: string,
            avatar: string,
        },
        selectedReactions?: Array<string>
    }
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

  return (
    <Animated.View 
      style={[style.mainContainer, props.mainStyle, props.config?.animated]}
      onLayout={props.onLayout}
    >
      <Image
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        source={require('../../../assets/image/photo.jpg')}
        style={style.imageContainer}
      />
      <View style={style.userContainerStyle}>
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
  }
})

export default UserWidgetComponent

export type { UserWidgetComponentType }