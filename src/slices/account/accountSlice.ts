import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../scripts/store';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";

import { TAccountSliceState } from '../../scripts/types';
import { auth } from '../../scripts/firebase';

const initialState: TAccountSliceState = {
  uid: null,
  isLoading: false,
  hasError: false,
}


// ========================================================
// ===================== AUTHENTICATION ===================
// ========================================================


/**
 * logins in a user with email and password
 * @param email - the email of the user
 * @param password - the password of the user
 * 
 * @returns the user if successful, null otherwise
 * 
 * @throws error if there is an error
*/
export const logInWithEmailAndPassword: any = createAsyncThunk(
  'account/logInWithEmailAndPassword',
  async (args: { email: string, password: string }) : Promise<string | null> => {
    let uid: string | null = null;
    console.log("Logging in with email: ", args.email, " and password: ", args.password);
    await signInWithEmailAndPassword(auth, args.email, args.password)
    .then((userCredential: UserCredential) => {
      // Signed in 
      uid = userCredential.user.uid;
      console.log("Logged in user");
    }).catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    });
    return uid;
  }
);

/**
 * Register and new user with email and password
 * 
 * @param email - the email of the user
 * @param password - the password of the user
 * @returns the user if successful, null otherwise
 */
export const registerWithEmailAndPassword: any = createAsyncThunk(
  'account/registerWithEmailAndPassword',
  async (args: { email: string, password: string }) : Promise<string | null> => {
    let uid: string | null = null;
    console.log("Registering with email: ", args.email, " and password: ", args.password);
    // Create a new user
    createUserWithEmailAndPassword(auth, args.email, args.password)
    .then((userCredential: UserCredential) => {
      // Signed in 
      uid = userCredential.user.uid;
      console.log("User Registered:");
    }).catch((error: any) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    });
    return uid;
  }
);

/**
 * 
 * Sends a password reset email to the user
 * 
 * @param email - the email of the user
 * @returns true if successful, false otherwise
 */
export const sendPasswordReset: any = createAsyncThunk(
  'account/sendPasswordReset',
  async (args: { email: string }) : Promise<boolean> => {
    let success: boolean = false;
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, args.email);
      success = true;
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
      let success = false;
    }
    return success;
  }
);


/**
 * Logs out the current user
 * 
 * @returns true if successful, false otherwise
 * 
*/
export const logout: any = createAsyncThunk(
  'account/logout',
  async () : Promise<boolean> => {
    let success: boolean = false;
    // Sign out
    try {
      signOut(auth)
      console.log("Logged out");
      success = true;
    } catch(error) {
      console.error(error);
      success = false;
    }
    return success;
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ==================== LOG IN ====================
      .addCase(logInWithEmailAndPassword.pending, (state => {
        state.isLoading = true;
        state.hasError = false;
      }))
      .addCase(logInWithEmailAndPassword.fulfilled, ((state, action: PayloadAction<string | null>) => {
        state.isLoading = false;
        state.hasError = false;
        state.uid = action.payload;
      }))
      .addCase(logInWithEmailAndPassword.rejected, (state => {
        state.isLoading = false;
        state.hasError = true;
      }))
      // ==================== REGISTER ====================
      .addCase(registerWithEmailAndPassword.pending, (state => {
        state.isLoading = true;
        state.hasError = false;
      }))
      .addCase(registerWithEmailAndPassword.fulfilled, ((state, action: PayloadAction<string | null>) => {
        state.isLoading = false;
        state.hasError = false;
        state.uid = action.payload;
      }))
      .addCase(registerWithEmailAndPassword.rejected, (state => {
        state.isLoading = false;
        state.hasError = true;
      }))
      // ==================== SEND PASSWORD RESET ====================
      .addCase(sendPasswordReset.pending, (state => {
        state.isLoading = true;
        state.hasError = false;
      }))
      .addCase(sendPasswordReset.fulfilled, (state => {
        state.isLoading = false;
        state.hasError = false;
      }))
      .addCase(sendPasswordReset.rejected, (state => {
        state.isLoading = false;
        state.hasError = true;
      }))
      // ==================== LOG OUT ====================
      .addCase(logout.pending, (state => {
        state.isLoading = true;
        state.hasError = false;
      }))
      .addCase(logout.fulfilled, (state => {
        state.isLoading = false;
        state.hasError = false;
        state.uid = null;
      }))
      .addCase(logout.rejected, (state => {
        state.isLoading = false;
        state.hasError = true;
      }))
  },
});

const getParams = (_: any, args: any) => args

export const selectIsLoggedIn = (state: RootState) => !!state.account.uid;

export const selectUid = (state: RootState) => state.account.uid;

export const selectUser = (): User | null => auth.currentUser;

export default accountSlice.reducer