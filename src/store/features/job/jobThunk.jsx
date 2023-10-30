// Imports
import customFetch from "../../../utils/axios";
import firstLetterUpper from "../../../utils/firstLetterUpper";
import authHeader from "../../../utils/authHeader";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

// authHeader.jsx
/* const authHeader = (thunkAPI) => {
	return {
		headers:{
			// With getState whe access user store, and then user in state ;-)
			authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
		}
	};
}; */

// Thunk methods
export const createJobThunkFn = async(job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job, authHeader(thunkAPI));
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error){
		if (error.response.status === 401 || error.response.status === 404){
			// Logout and clear values
			thunkAPI.dispatch(clearValues());
			thunkAPI.dispatch(logoutUser());
			return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
		}
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const deleteJobThunkFn = async(jobId, thunkAPI) => {
	// Because we use the isLoading of allJobsSlice !
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customFetch.delete(`/jobs/${ jobId }`, authHeader(thunkAPI));
		// No need to hideLoading, it's included in the extraReducer of getAllJobs
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error){
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const editJobThunkFn = async({ jobId, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${ jobId }`, job, authHeader(thunkAPI));
		// Reset Edit | Add job and clear form fields ;-)
		thunkAPI.dispatch(clearValues());
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};