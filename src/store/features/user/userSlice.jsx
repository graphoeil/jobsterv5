// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from "../../../utils/localStorage";
import { registerUserThunkFn, loginUserThunkFn, updateUserThunkFn, clearStoreThunkFn } from "./userThunk";

// Initial state
const initialState = {
	isLoading:false,
	isSidebarOpen:false,
	user:getUserFromLocalStorage()
};

/* HTTP Methods
GET - Get resources from the server => axios.get(url, options);
POST - Submit resource from the server => axios.post(url, resource, options);
PUT/PATCH - modify resource from the server => axios.patch(url, resource, options);
DELETE - delete resource from the server => axios.delete(url, options); */

// Async
export const registerUser = createAsyncThunk('user/registerUser', registerUserThunkFn);
export const loginUser = createAsyncThunk('user/loginUser', loginUserThunkFn);
export const updateUser = createAsyncThunk('user/updateUser', updateUserThunkFn);
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunkFn);

// Slice
const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		// Toggle sidebar
		toggleSidebar:(state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		// Logout
		logoutUser:(state, { payload }) => {
			removeUserFromLocalStorage();
			if (payload){
				toast.success(payload);
			}
			return { ...state, isSidebarOpen:false, user:null };
		}
	},
	extraReducers:(builder) => {
		// Register user
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true;
		}).addCase(registerUser.fulfilled, (state, { payload:{ user } }) => {
			toast.success(`Hello there ${ user.name }`);
			addUserToLocalStorage(user);
			return { ...state, isLoading:false, user };
		}).addCase(registerUser.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
		// Login user
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true;
		}).addCase(loginUser.fulfilled, (state, { payload:{ user } }) => {
			toast.success(`Welcome back ${ user.name }`);
			addUserToLocalStorage(user);
			return { ...state, isLoading:false, user };
		}).addCase(loginUser.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
		// Update user
		builder.addCase(updateUser.pending, (state) => {
			state.isLoading = true;
		}).addCase(updateUser.fulfilled, (state, { payload:{ user } }) => {
			toast.success('User updated !');
			addUserToLocalStorage(user);
			return { ...state, isLoading:false, user };
		}).addCase(updateUser.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
		// Clear store
		builder.addCase(clearStore.rejected, () => {
			toast.error('There was an error...');
		});
	}
});

// Actions export
export const { toggleSidebar, logoutUser } = userSlice.actions;

// Reducer export
export default userSlice.reducer;