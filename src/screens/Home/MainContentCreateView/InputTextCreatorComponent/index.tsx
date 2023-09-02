import {
  Animated, PanResponder, StyleSheet 
} from 'react-native';
import { ContentTextStyleType } from '../types';
import React from 'react';
import { TextInput } from 'react-native-paper';

interface InputTextCreatorComponentType {
    textCreatorMode: boolean,
    textInputStyle: ContentTextStyleType,
    setTextInputStyle: (data: ContentTextStyleType) => void,
    contentText: string
    setContentText: (text: string) => void
}

const InputTextCreatorComponent = (props: InputTextCreatorComponentType) => {

  const movableInputPan = React.useRef(new Animated.ValueXY()).current;
  const movableInputPanResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: movableInputPan.x, dy: movableInputPan.y }], { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        movableInputPan.extractOffset();
      },
    }),
  ).current;

  movableInputPan.addListener(() => {
    props.setTextInputStyle({
      ...props.textInputStyle,
      position: {
        x: movableInputPan.x.__getValue(),
        y: movableInputPan.y.__getValue()
      }})
  })

  return (
    <>
      {
        props.textCreatorMode || props.contentText ?
          <Animated.View
            style={{
              top: movableInputPan.y,
              left: movableInputPan.x,
              position: 'absolute'
            }}
            {...movableInputPanResponder.panHandlers}
          >
            <TextInput
              style={
                [mediaContentStyle.movebleInputStyle,
                  {
                    fontSize: props.textInputStyle.fontSize,
                    fontFamily: props.textInputStyle.fontFamily,
                  }
                ]}
              activeUnderlineColor="white"
              underlineColor={props.textCreatorMode ? 'white' : 'transparent'}
              textColor={props.textInputStyle.fontColor}
              onChangeText={(text) => props.setContentText(text)}
              value={props.contentText}
              autoFocus
            />
          </Animated.View> : ''
      }
    </>
  )
}

const mediaContentStyle = StyleSheet.create({ movebleInputStyle: { backgroundColor: undefined, }, })

export default InputTextCreatorComponent
