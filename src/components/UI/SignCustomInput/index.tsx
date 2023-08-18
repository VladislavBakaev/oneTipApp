import React from 'react';
import { TextInput } from 'react-native-paper';


import { StyleSheet, ViewStyle } from 'react-native';
import { Color } from '../../../styles/GlobalStyles';

interface CustomTextInputPropsType {
    label?: string,
    value?: string,
    onChangeText?: (text: string) => void,
    left?: string,
    rightOn?: string,
    rightOff?: string,
    style?: ViewStyle,
    secureTextEntry?: boolean,
    autoCorrect?: boolean,
    iconPress?: () => void
}

const CustomTextInput : React.FC<CustomTextInputPropsType> = (props) => (
  <TextInput
    label={props.label}
    value={props.value}
    onChangeText={props.onChangeText}
    style={[styles.inputStyle, props.style]}
    activeUnderlineColor={styles.inputStyle.activeUnderlineColor}
    left={props.left ? <TextInput.Icon color={Color.textColor} icon={props.left}/> : ''}
    secureTextEntry={props.secureTextEntry}
    autoCorrect={props.autoCorrect}
    right={props.rightOn ?
      <TextInput.Icon 
        icon={props.secureTextEntry ? (props?.rightOn || ''):(props?.rightOff || '') } 
        onPress={props.iconPress}
        color={Color.textColor}
      />: ''}
  />
);

const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 10,
    height: 55,
    backgroundColor: undefined,
    activeUnderlineColor: '#509AB9'
  },
})

export default CustomTextInput;