// Imports
import firstLetterUpper from "../../../utils/firstLetterUpper";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/authHeader";

// Thunk
export const getAllJobsThunkFn = async(_, thunkAPI) => {
	const { search, searchStatus, searchType, sort, page } = thunkAPI.getState().allJobs;
	let url = `/jobs?status=${ searchStatus }&jobType=${ searchType }&sort=${ sort }&page=${ page }`;
	if (search){
		// To avoid &search=%27%27 in the request if empty ;-)
		url = url + `&search=${ search }`
	}
	try {
		const response = await customFetch.get(url, authHeader(thunkAPI));
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const showStatsThunkFn = async(_, thunkAPI) => {
	try {
		const response = await customFetch.get('/jobs/stats', authHeader(thunkAPI));
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};