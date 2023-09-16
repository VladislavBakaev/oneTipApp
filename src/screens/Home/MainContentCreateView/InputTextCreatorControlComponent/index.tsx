import {
  View, ScrollView, Text, StyleSheet 
} from 'react-native'
import { fromHsv, ColorPicker } from 'react-native-color-picker'
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers'
import { IconButton } from 'react-native-paper'
import { ContentTextStyleType } from '../types'
import Slider from '@react-native-community/slider';
import React from 'react'

interface InputTextCreatorControlComponentType {
    setTextCreatorMode: (flag: boolean) => void,
    setContentText: (text: string) => void,
    setDefaultContentTextStyle: () => void,
    setContentTextStyle: (style:ContentTextStyleType) => void,
    contentTextStyle: ContentTextStyleType
}

const InputTextCreatorControlComponent = (props: InputTextCreatorControlComponentType) => {
  const fontsList = [
    'normal',
    'notoserif',
    'sans-serif',
    'sans-serif-light',
    'sans-serif-thin',
    'sans-serif-condensed',
    'sans-serif-medium',
    'serif',
    'Roboto',
    'monospace'
  ]


  const confirmTextMode = () => {
    props.setTextCreatorMode(false)
  }
  const deleteText = () => {
    props.setContentText('')
    props.setDefaultContentTextStyle()
  }
  const setTextColor = (color: HsvColor) => {
    const newColor = fromHsv(color)
    const newInputStyle = { ...props.contentTextStyle }
    newInputStyle.fontColor = newColor
    props.setContentTextStyle(newInputStyle)
  }
  const setTextFontFamily = (fontFamily: string) => {
    const newInputStyle = { ...props.contentTextStyle }
    newInputStyle.fontFamily = fontFamily
    props.setContentTextStyle(newInputStyle)
  }


  return (
    <View style={textCreatorContainierStyle.mainContainier}>
      <View style={{ flexDirection: 'row', height: 120 }}>
        <ColorPicker 
          onColorChange={setTextColor}
          style={{ flex: 1 }}
          sliderComponent={Slider}
        />
      </View>
      <ScrollView 
        horizontal={true} 
        style={{ height: 60 }}
        contentContainerStyle={textCreatorContainierStyle.fontFamiliesContainer}
      >
        {fontsList.map((fontFamily, key) => (
          <View style={[
            // eslint-disable-next-line max-len
            props.contentTextStyle.fontFamily === fontFamily ? textCreatorContainierStyle.selectedFontFamily : {},
            { marginRight: 10 }
          ]
          }
          key={key}
          onTouchEnd={() => setTextFontFamily(fontFamily)}
          >
            <Text style={{ fontFamily: fontFamily, fontSize: 20 }} >Aa</Text>
          </View>
        ))}
      </ScrollView>
      <View style={textCreatorContainierStyle.deleteConfirmButtonStyle}>
        <IconButton icon={'delete-outline'} size={35} onPress={deleteText} />
        <IconButton icon={'check'} size={35} onPress={confirmTextMode} />
      </View>
    </View>
  )
}

const textCreatorContainierStyle = StyleSheet.create({
  mainContainier: {
    flexDirection: 'column',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  deleteConfirmButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  fontFamiliesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedFontFamily: {
    backgroundColor: 'rgba(171, 171, 171, 0.28)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25
  }
})

export default InputTextCreatorControlComponent