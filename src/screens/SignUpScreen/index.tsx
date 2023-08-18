import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

import {
  FontFamily, Color, buttonStyle 
} from '../../styles/GlobalStyles';
import { SignInBackground } from '../../components/UI/Backgrounds';
import CustomTextInput from '../../components/UI/SignCustomInput';

import GoogleIcon from '../../assets/icons/google-icon-logo.svg'
import AppleIcon from '../../assets/icons/apple-black-logo.svg'

import {
  registryUser, registryWithApple, registryWithGoogle 
} from '../../services/user';
import CustomButton from '../../components/UI/CustomButton';

interface TriangleType {
  left?: boolean,
  right?: boolean,
  style?: React.CSSProperties,
}

const Triangle = (props: TriangleType) => {
  let path = '';
  if(props.left){
    path = 'M 0 1 L 98 0 L 98 2 Z'
  } else {
    path = 'M 98 1 L 0 0 L 0 2 Z'
  }
  return (
    <Svg
      style={props.style as StyleProp<ViewStyle>}
    >
      <Path
        d={path}
        stroke={Color.darkgray}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={Color.darkgray}
      />    
    </Svg>
  );
};

const SignUpViewContent = () => {
  const [hidePass, setHidePass] = React.useState(true);
  const [hidePassConfirm, setHidePassConfirm] = React.useState(true);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const onPressSignUp = () => {
    const registryPayload = {
      email, password, lastName, firstName
    }
    registryUser(registryPayload)
  }

  const onPressContinueWithGoogle = () => {
    registryWithGoogle()
  }

  const onPressContinueWithApple = () => {
    registryWithApple()
  }

  return(
    <View style={styles.baseContainer}>
      <Text style={styles.baseText}>Get started</Text>

      <View style={styles.paswordEmailContainer}>
        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          left="email-outline"
          style={{ width: '100%' }}
        />
        <View style={styles.doubleInputContainerRow}>
          <CustomTextInput
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            style={{ width: '45%' }}
          />
          <CustomTextInput
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            style={{ width: '45%' }}
          />
        </View>
        <View style={styles.doubleInputContainerColumn}>
          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={{ width: '100%' }}
            secureTextEntry={hidePass}
            autoCorrect={false}
            left="key"
            rightOn="eye"
            rightOff="eye-off"
            iconPress={() => setHidePass(!hidePass)}
          />
          <CustomTextInput
            label="Confirm password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            style={{ width: '100%' }}
            secureTextEntry={hidePassConfirm}
            autoCorrect={false}
            left="key"
            rightOn="eye"
            rightOff="eye-off"
            iconPress={() => setHidePassConfirm(!hidePassConfirm)}
          />
        </View>
      </View>

      <View style={styles.buttonSignContainer}>
        <CustomButton
          label='Sign Up'
          mode='base'
          onTouch={onPressSignUp}
          style={buttonStyle.style}
          labelStyle={styles.buttonTextStyle}
        />
      </View>

      <View style={styles.orContinueTextStyleContainer}>
        <Triangle style={{ width: 100, height: 2 }} left />
        <Text style={styles.orContinueTextStyle}>Or continue with</Text>
        <Triangle style={{ width: 100, height: 2 }} right />
      </View>

      <View style={styles.googleAppleButtonContainer}>
        <View 
          style={[styles.googleAppleButtonStyle, { marginRight: 10 }]}
          onTouchEnd={onPressContinueWithGoogle}
        >
          <GoogleIcon width="40" height="40" />
        </View>
        <View 
          style={styles.googleAppleButtonStyle}
          onTouchEnd={onPressContinueWithApple}
        >
          <AppleIcon width="40" height="40" />
        </View>
      </View>
    </View>
  )
}

const SignUpView = () => (
  <SignInBackground component={SignUpViewContent()} />
)

const styles = StyleSheet.create({
  baseContainer: {
    paddingRight: 35,
    paddingLeft: 35,
    flex:1,
    flexDirection: 'column',
  },
  baseText: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: 48,
    color: Color.textColor,
  },
  paswordEmailContainer:{
    marginTop:50,
    alignItems: 'center'
  },
  doubleInputContainerRow: {
    flexDirection:'row',
    justifyContent: 'space-between',
    width:'100%'
  },
  doubleInputContainerColumn: {
    flexDirection: 'column',
    width:'100%'
  },
  buttonSignContainer: { marginTop: 10, },
  buttonTextStyle: {
    fontSize: 18,
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '700',
    textAlign: 'center',
  },
  orContinueTextStyleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center'
  },
  orContinueTextStyle: { fontFamily: FontFamily.poppinsRegular, },
  googleAppleButtonContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  googleAppleButtonStyle:{
    padding: 5,
    // borderBottomWidth: 1,
    // borderRadius: 10,
    // backgroundColor: "#b6b6b630"
  },
})
export default SignUpView;