// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../../utils/localStorage";
import { createJobThunkFn, deleteJobThunkFn, editJobThunkFn } from "./jobThunk";

// Initial state
const initialState = { isLoading:false, position:'', company:'',
	jobLocation:getUserFromLocalStorage()?.location || '',
	jobTypeOptions:['full-time','part-time','remote','internship'],
	jobType:'full-time', statusOptions:['interview','declined','pending'],
	status:'pending', isEditing:false, editJobId:''
};

// Async
export const createJob = createAsyncThunk('job/createJob', createJobThunkFn);
export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunkFn);
export const editJob = createAsyncThunk('job/editJob', editJobThunkFn);

// Slice
const jobSlice = createSlice({
	name:'job',
	initialState,
	reducers:{
		// Handle change input fields in AddJob.jsx
		handleChange:(state, { payload:{ name, value } }) => {
			state[name] = value;
		},
		// Reset fields
		clearValues:() => {
			return { ...initialState, jobLocation:getUserFromLocalStorage()?.location || '' };	
		},
		// Set edit job, submitted from Job.jsx (component)
		setEditJob:(state, { payload }) => {
			/* payload contain value of the edited job ;-) */
			return { ...state, isEditing:true, ...payload };
		}
	},
	extraReducers:(builder) => {
		// Create job
		builder.addCase(createJob.pending, (state) => {
			state.isLoading = true;
		}).addCase(createJob.fulfilled, (state) => {
			state.isLoading = false;
			toast.success('Job created !');
		}).addCase(createJob.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
		// Delete job
		builder.addCase(deleteJob.fulfilled, () => {
			toast.success('Job deleted !');
		}).addCase(deleteJob.rejected, (state, { payload }) => {
			toast.error(payload);
		});
		// Edit job
		builder.addCase(editJob.pending, (state) => {
			state.isLoading = true;
		}).addCase(editJob.fulfilled, (state) => {
			state.isLoading = false;
			toast.success('Job modified !');
		}).addCase(editJob.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
	}
});

// Actions export
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

// Reducer export
export default jobSlice.reducer;