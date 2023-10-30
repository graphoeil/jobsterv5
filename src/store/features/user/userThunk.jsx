// Imports
import firstLetterUpper from "../../../utils/firstLetterUpper";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/authHeader";
import { logoutUser } from "./userSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

// Thunk methods
export const registerUserThunkFn = async(user, thunkAPI) => {
	// "user" variable comes from Register.jsx and Profile.jsx in pages subfolder
	try {
		const response = await customFetch.post('/auth/register', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const loginUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.post('auth/login', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const updateUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.patch('auth/updateUser', user, authHeader(thunkAPI));
		return response.data;
	} catch (error){
		if (error.response.status === 401 || error.response.status === 404){
			// Logout the user if rejected, because the user don't have valid 
			// credentials (or server is unavailable) and have nothing to do here !
			thunkAPI.dispatch(logoutUser());
			return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
		}
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
// Clear all values when logout
export const clearStoreThunkFn = async(message, thunkAPI) => {
	try {
		// Logout user
		thunkAPI.dispatch(logoutUser(message));
		// Clear jobs values (allJobs)
		thunkAPI.dispatch(clearAllJobsState());
		// Clear job input values (addJob)
		thunkAPI.dispatch(clearValues());
		// Return
		return Promise.resolve();
	} catch (error){
		return Promise.reject();
	}
};