import { auth } from '../firebase';

export const PASSWORD_LOGIN = "PASSWORD_LOGIN";
export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const SIGN_OUT = "SIGN_OUT";

export default function authReducer(state, action) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      auth.createUserWithEmailAndPassword(action.payload.email, action.payload.password)
    case PASSWORD_LOGIN:
      return auth.signInWithEmailAndPassword(action.payload.email, action.payload.password);
    case SIGN_OUT:
      return null;
    default:
      throw new Error("unhandled action" + action.type);
  }
}