// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunkFn, showStatsThunkFn } from "./allJobsThunk";

// Initial states
const initialFiltersState = {
	search:'',
	searchStatus:'all',
	searchType:'all',
	sort:'latest',
	sortOptions:['latest','oldest','a-z','z-a']
};
const initialState = {
	isLoading:false,
	jobs:[],
	totalJobs:0,
	numOfPages:1,
	page:1,
	stats:{},
	monthlyApplications:[],
	...initialFiltersState
};

// Async
// Don't forget we trigger getAllJobs in JobsContainer.jsx
// by watching change of the filters in the useEffect ;-)
export const getAllJobs = createAsyncThunk('allJobs/getAllJobs', getAllJobsThunkFn);
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunkFn);

// Slice
const allJobsSlice = createSlice({
	name:'allJobs',
	initialState,
	reducers:{
		// Show and hide loading, delete job method is in JobSlice
		// then we can't use the isLoading in AllJobSlice directly,
		// we must dispatch the actions from JobSlice ;-)
		showLoading:(state) => {
			state.isLoading = true;
		},
		hideLoading:(state) => {
			state.isLoading = false;
		},
		// Search, handle inputs change
		handleChange:(state, { payload:{ name, value } }) => {
			// We reset page to 1 because we change filters
			// and if in the last search we have 35 jobs 
			// and are at page 3, maybe in the current search
			// we'll have only 8 jobs and then page 3 no longer exists
			state.page = 1;
			state[name] = value;
		},
		// Clear filters
		clearFilters:(state) => {
			return { ...state, ...initialFiltersState };
		},
		// Change page (PageBtnContainer.jsx)
		changePage:(state, { payload }) => {
			state.page = payload;
		},
		// Clear all states and filters
		clearAllJobsState:() => {
			return initialState;
		}
	},
	extraReducers:(builder) => {
		// Get all jobs
		builder.addCase(getAllJobs.pending, (state) => {
			state.isLoading = true;
		}).addCase(getAllJobs.fulfilled, (state, { payload:{ jobs, totalJobs, numOfPages } }) => {
			return { ...state, isLoading:false, jobs, totalJobs, numOfPages };
		}).addCase(getAllJobs.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
		// Show stats
		builder.addCase(showStats.pending, (state) => {
			state.isLoading = true;
		}).addCase(showStats.fulfilled, (state, { payload:{ defaultStats, monthlyApplications } }) => {
			return { ...state, isLoading:false, stats:defaultStats, monthlyApplications };
		}).addCase(showStats.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
	}
});

// Actions export
export const { showLoading, hideLoading, handleChange, 
	clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;

// Reducer export
export default allJobsSlice.reducer;