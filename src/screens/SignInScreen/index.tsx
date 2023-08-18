import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Svg, Path } from 'react-native-svg';
import {
  FontFamily, Color, buttonStyle 
} from '../../styles/GlobalStyles';
import { SignInBackground } from '../../components/UI/Backgrounds';
import CustomTextInput from '../../components/UI/SignCustomInput';

import GoogleIcon from '../../assets/icons/google-icon-logo.svg'
import AppleIcon from '../../assets/icons/apple-black-logo.svg'

import {
  loginUser,
  loginWithApple,
  loginWithGoogle 
} from '../../services/user';
import { ParamListBase } from '@react-navigation/native';
import CustomButton from '../../components/UI/CustomButton';

interface TriangleType {
  left?: boolean,
  right?: boolean,
  style?: React.CSSProperties,
}

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase>
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

const SignInViewContent = (navigation: NativeStackNavigationProp<ParamListBase>) => {
  const [hidePass, setHidePass] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onPressSignIn = () => {
    const loginPayload = { email: email, password: password }
    loginUser(loginPayload)
  }

  const onPressSignUp = () => {
    navigation.navigate('SignUpView')
  }

  const onPressForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }

  const onPressContinueWithGoogle = () => {
    loginWithGoogle()
  }

  const onPressContinueWithApple = () => {
    loginWithApple()
  }

  return(
    <View style={styles.baseContainer}>
      <Text style={styles.baseWelcome}>Welcome!</Text>

      <Text style={styles.secondWelcome}>
                welcome back we missed you
      </Text>

      <View style={styles.paswordEmailContainer}>
        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          left="email-outline"
          style={{ width: '100%' }}
        />
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
        <Text 
          style={styles.foggotPasswordStyle}
          onPress={onPressForgotPassword}
        >
                    Forgot password?
        </Text>
      </View>

      <View style={styles.buttonSignContainer}>
        <CustomButton
          label='Sign In'
          mode='base'
          onTouch={onPressSignIn}
          style={buttonStyle.style}
          labelStyle={styles.buttonTextStyle}
        />
        <Text style={{ textAlign:'center' }}>or</Text>
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

const SignInView = ({ navigation }: IPageProps) => (
  <SignInBackground component={SignInViewContent(navigation)} />
)

const styles = StyleSheet.create({
  baseContainer: {
    paddingRight: 35,
    paddingLeft: 35,
    flex:1,
    flexDirection: 'column',
  },
  baseWelcome: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: 48,
    color: Color.textColor,
  },
  secondWelcome: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: 20,
    color: Color.darkgray,
  },
  paswordEmailContainer:{
    marginTop:50,
    alignItems: 'center'
  },
  foggotPasswordStyle: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'right',
    width: '100%',
    marginTop: 10,
    textDecorationLine: 'underline',
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
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: Color.silver,
    // backgroundColor: "#b6b6b630"
  },
})
export default SignInView;