/* eslint-disable @typescript-eslint/no-unused-vars */
interface LoginPayload {
    email: string,
    password: string,
}

interface RegistryPayload {
    email: string,
    password: string,
    lastName: string,
    firstName: string
}

interface SendChangePasswordRequestPayload {
    email: string,
}

interface ConfirmCodeRequestPayload {
    email: string,
    code: string
}

interface SetNewPasswordPayload {
    email: string,
    password: string,
}
