import React, { CSSProperties } from 'react';
import {
  StyleProp, Text, TouchableOpacity, ViewStyle 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonPropsType {
    style?: CSSProperties | Array<CSSProperties> | undefined,
    sizeStyle?: CSSProperties | Array<CSSProperties> | undefined,
    labelStyle?: CSSProperties | Array<CSSProperties> | undefined,
    onTouch?: () => void,
    label: string
    mode: 'base' | 'red',
    children?: JSX.Element,
}

const CustomButton : React.FC<ButtonPropsType> = (props) => {
  const gradientParams = props.mode === 'red' ? gradientParamsRedButton : gradientParamsBaseButton

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={props.sizeStyle as StyleProp<ViewStyle>}
    >
      <LinearGradient 
        locations={gradientParams.locations}
        colors={gradientParams.colors}
        useAngle={gradientParams.useAngle}
        angle={gradientParams.angle}
        style={props.style as StyleProp<ViewStyle>}
        onTouchEnd={props.onTouch}
      >
        { props.children ?
          props.children :
          <Text style={props.labelStyle as StyleProp<ViewStyle>}>{props.label}</Text>
        }
      </LinearGradient>      
    </TouchableOpacity>

  )
}    

const gradientParamsRedButton = {
  locations: [0, 0.68, 1],
  colors: ['#6B0C0C', '#B25757', '#FFA9A9'],
  useAngle: true,
  angle: 90,
}

const gradientParamsBaseButton = {
  locations: [0, 0.68, 1],
  colors: ['#0c4e6b', '#509ab9', '#70bddd'],
  useAngle: true,
  angle: 90,
}

export default CustomButton;