import { store } from '../../redux/AppStore';
import { setLogginInStateAction } from '../../redux/actions/UserActions';

const loginUser = (payload: LoginPayload) => {
  console.log('Start logging')
  console.log(payload)
  store.dispatch(setLogginInStateAction({ state:true }))
    
}

const loginWithGoogle = () => {
  console.log('Login with google')
}

const loginWithApple = () => {
  console.log('login with apple')
}

const registryUser = (payload: RegistryPayload) => {
  console.log('Start registry')
  console.log(payload)
}

const registryWithGoogle = () => {
  console.log('Registry with google')
}

const registryWithApple = () => {
  console.log('Registry with apple')
}

const changePasswordRequest = (payload: SendChangePasswordRequestPayload) => {
  console.log(payload)
  console.log('Change password request')
}

const sendConfirmCodeRequest = (payload: ConfirmCodeRequestPayload) => {
  console.log(payload)
  console.log('Send confirm code request')
}

const setNewPasswordRequest = (payload: SetNewPasswordPayload) => {
  console.log('set new password request')
  console.log(payload)
}


export {
  loginUser,
  loginWithApple,
  loginWithGoogle,
  registryUser,
  registryWithApple,
  registryWithGoogle,
  changePasswordRequest,
  sendConfirmCodeRequest,
  setNewPasswordRequest
}