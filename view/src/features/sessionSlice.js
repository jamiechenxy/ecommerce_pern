import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    createGoogleUser, 
    createUser, 
    getUserInfoById, 
    loginLocalUser, 
    signOut, 
    verifyAuthentication 
} from "../utils/user"; 

export const loadUserInfo = createAsyncThunk(
    'session/loadUserInfo',
    async() => {
        const userAuth = await verifyAuthentication();

        const { authenticated, userId } = userAuth;

        if (!authenticated) {
            return [];
        }

        const response = await getUserInfoById(userId);

        return {
            user: {
                userId: response.user_id,
                firstName: response.first_name,
                lastName: response.last_name,
                picture: response.picture,
            }
        };

    }
);

export const registerUser = createAsyncThunk(
    'session/registerUser',
    async(userObj) => {
        const response = await createUser(userObj);

        return {
            user: {
                userId: response.user_id,
                firstName: response.first_name,
                lastName: response.last_name,
                picture: response.picture,
            }
        };
    }
);

export const loginByGoogle = createAsyncThunk(
    'session/logInByGoogle',
    async(utObj, { rejectWithValue }) => {
        const response = await createGoogleUser(utObj);

        if (Object.keys(response).includes('error')) {
            return rejectWithValue('Authentication failed.');
        };

        return {
            user: {
                userId: response.user_id,
                firstName: response.first_name,
                lastName: response.last_name,
                picture: response.picture,
            }
        };
    }
);
// filter the fetched data from db excluding pwd etc.
export const loginByLocal = createAsyncThunk(
    'session/loginByLocal',
    async(userObj, { rejectWithValue }) => {
        const response = await loginLocalUser(userObj);

        if (Object.keys(response).includes('error')) {
            return rejectWithValue('User not found.');
        };

        return {
            user: {
                userId: response.user_id,
                firstName: response.first_name,
                lastName: response.last_name,
                picture: response.picture,
            }
        };
    }
);

export const logOutUser = createAsyncThunk(
    'session/logOutUser',
    async() => {
        const response = await signOut();
    }
);


const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        session: [],
        isLoading: true,
        hasError: false,
        loginStatus: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.loginStatus = false;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.session = action.payload;
            state.loginStatus = true;
        })
        .addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.loginStatus = false;
        })
        .addCase(loginByGoogle.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.loginStatus = false;
        })
        .addCase(loginByGoogle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.session = action.payload;
            state.loginStatus = true;
        })
        .addCase(loginByGoogle.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.loginStatus = false;
        })
        .addCase(loginByLocal.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.loginStatus = false;
        })
        .addCase(loginByLocal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.session = action.payload;
            state.loginStatus = true;
        })
        .addCase(loginByLocal.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.loginStatus = false;
        })
        .addCase(logOutUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(logOutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.hasError = false;
            state.session = [];
            state.loginStatus = false;
        })
        .addCase(logOutUser.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(loadUserInfo.pending, (state) => {
            state.loginStatus = false;
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadUserInfo.fulfilled, (state, action) => {
            if (action.payload.length===0) {
                state.loginStatus = false;
            } else {
                state.loginStatus = true;
                state.session = action.payload;
            }
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(loadUserInfo.rejected, (state) => {
            state.loginStatus = false;
            state.isLoading = false;
            state.hasError = true;
        })
    }
});


export const selectUser = state => state.session.session.user;

export const selectLoginStatus = state => state.session.loginStatus;

export const selectSessionIsLoading = state => state.session.isLoading;

export const selectSessionHasError = state => state.session.hasError;



export default sessionSlice.reducer;