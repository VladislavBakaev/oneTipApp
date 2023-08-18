import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  FontFamily, Color, buttonStyle 
} from '../../styles/GlobalStyles';

import SignInBackground from '../../components/UI/Backgrounds';
import Button from '../../components/UI/CustomButton';
import CustomTextInput from '../../components/UI/SignCustomInput';

import {
  changePasswordRequest, sendConfirmCodeRequest, setNewPasswordRequest 
} from '../../services/user';

const ForgotPasswordScreen = ({ navigation }) => (
  <SignInBackground component={ForgotPasswordContent(navigation)} />
)

const EnterDataForChangePasswordComponent = ({ email, setEmail, onButtonTouch }) => (
  <>
    <Text style={styles.baseText}>Forgot password?</Text>
    <Text style={styles.secondText}>Enter your email address</Text>
    <CustomTextInput value={email} onChangeText={setEmail} label='Email' left="email-outline" />
    <Button
      gradientParams={buttonStyle.gradientParams} 
      style={[buttonStyle.style, { marginTop: 30 }]} 
      onTouch={onButtonTouch} innerComponent={
        <Text style={styles.buttonText}>Change password</Text>
      }/>
  </>
)

const EnterCodeFromEmailComponent = ({ email, code, setCode, onButtonTouch }) => (
  <>
    <Text style={styles.baseText}>Forgot password?</Text>
    <Text style={styles.secondText}>
      Code was sended on your email {email}. Enter code in field</Text>
    <CustomTextInput value={code} onChangeText={setCode} label='Code' />
    <Button 
      gradientParams={buttonStyle.gradientParams}
      style={[buttonStyle.style, { marginTop: 30 }]} 
      onTouch={onButtonTouch} innerComponent={
        <Text style={styles.buttonText}>Send</Text>
      }/>
  </>
)

const FinalChangePassword = ({ onButtonTouch, email }) => (
  <>
    <Text style={styles.secondText}>Password for {email} was changed</Text>
    <Button
      gradientParams={buttonStyle.gradientParams}
      style={[buttonStyle.style, { marginTop: 30 }]}
      onTouch={onButtonTouch} innerComponent={
        <Text style={styles.buttonText}>Return to sign in</Text>
      }/>
  </>
)

const EnterNewPasswordPasswordComponent = ({ password, setPassword, confirmPassword, setConfirmPassword, onButtonTouch }) => {
  const [hidePass, setHidePass] = React.useState(true);
  const [hideConfirmPass, setHideConfirmPass] = React.useState(true);

  return (
    <>
      <Text style={styles.baseText}>Forgot password?</Text>
      <Text style={styles.secondText}>Enter your new password</Text>
      <View>
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
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ width: '100%' }}
          secureTextEntry={hideConfirmPass}
          autoCorrect={false}
          left="key"
          rightOn="eye"
          rightOff="eye-off"
          iconPress={() => setHideConfirmPass(!hideConfirmPass)}
                
        />
      </View>
      <Button gradientParams={buttonStyle.gradientParams} style={[buttonStyle.style, { marginTop: 30 }]} onTouch={onButtonTouch} innerComponent={
        <Text style={styles.buttonText}>Change password</Text>
      }/>
    </>
  )
}

const ForgotPasswordContent = (navigation) => {
  const [email, setEmail] = React.useState('');
  const [contantState, setContantState] = React.useState('ENTER_EMAIL');
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
    
  const changePasswordRequestSend = () => {
    changePasswordRequest({ email })
    setTimeout( () => setContantState('ENTER_CODE'), 500)
  }

  const sendConfirmCode = () => {
    sendConfirmCodeRequest({ code, email })
    setTimeout( () => setContantState('ENTER_PASSWORD'), 500)
  }

  const sendNewPassword = () => {
    setNewPasswordRequest({ email, password })
    setTimeout( () => setContantState('FINALY'), 500)
  }

  const finalyPasswordChange = () => {
    navigation.navigate('SignInView')
  }

  return (
    <View style={styles.baseContainer}>
      {contantState === 'ENTER_EMAIL' ? 
        <EnterDataForChangePasswordComponent email={email} setEmail={setEmail} onButtonTouch={changePasswordRequestSend} /> : ''
      }
      {contantState === 'ENTER_CODE' ? 
        <EnterCodeFromEmailComponent email={email} code={code} setCode={setCode} onButtonTouch={sendConfirmCode} /> : ''
      }
      {contantState === 'ENTER_PASSWORD' ?
        <EnterNewPasswordPasswordComponent 
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onButtonTouch={sendNewPassword}
        /> : ''
      }
      {contantState === 'FINALY' ?
        <FinalChangePassword email={email} onButtonTouch={finalyPasswordChange} /> : ''
      }
    </View>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    paddingRight: 35,
    paddingLeft: 35,
    paddingTop: 20,
    flex:1,
    flexDirection: 'column',
  },
  baseText: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: 36,
    color: Color.textColor,
  },
  secondText: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  buttonText: { fontSize: 20, }
})

export default ForgotPasswordScreen;