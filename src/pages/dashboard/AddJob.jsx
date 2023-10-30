// Imports
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearValues, createJob, editJob } from "../../store/features/job/jobSlice";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { useEffect, useRef } from "react";

// Component
const AddJob = () => {

	// Store
	const { isLoading, position, company, jobLocation, 
		jobType, jobTypeOptions, status, statusOptions, 
		isEditing, editJobId } = useSelector((store) => { return store.job; });
	const { user } = useSelector((store) => { return store.user });

	// Dispatch
	const dispatch = useDispatch();

	// Autofocus on position
	const positionRef = useRef();
	const companyRef = useRef();
	const jobLocationRef = useRef();
	useEffect(() => {
		positionRef.current.focus();
	}, []);

	// Get job location from user
	useEffect(() => {
		if (!isEditing){
			dispatch(handleChange({
				name:'jobLocation',
				value:user.location
			}));
		}
	}, [isEditing, dispatch, user]);

	// Inputs change
	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	// Submit form
	const navigate = useNavigate();
	const submitForm = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation){
			toast.error('Please fill out all fields !');
		}
		if (!position){
			positionRef.current.focus();
			return;
		}
		if (!company){
			companyRef.current.focus();
			return;
		}
		if (!jobLocation){
			jobLocationRef.current.focus();
			return;
		}
		// Dispatch
		// Click on the edit button in Job.jsx trigger setEditJob 
		// in jobSlice.jsx and set isEditing to true ;-)
		if (!isEditing){
			// Create job
			dispatch(createJob({ position, company, jobLocation, jobType, status }));
		} else {
			// Edit job
			dispatch(editJob({ jobId:editJobId, job:{ position, company, jobLocation, jobType, status } }));
		}
		// Navigate to all-jobs
		navigate('/all-jobs');
	};

	// Return
	return(
		<Wrapper>
			<form className="form" onSubmit={ submitForm }>
				<h3>{ isEditing ? 'Edit job' : 'Add job' }</h3>
				<div className="form-center">

					{/* Position */}
					<FormRow ref={ positionRef } type="text" name="position" 
						value={ position } handleChange={ handleJobInput }/>
					{/* Position */}

					{/* Company */}
					<FormRow ref={ companyRef } type="text" name="company" 
						value={ company } handleChange={ handleJobInput }/>
					{/* Company */}

					{/* Job location */}
					<FormRow ref={ jobLocationRef } type="text" name="jobLocation" labelText="Job location"
						value={ jobLocation } handleChange={ handleJobInput }/>
					{/* Job location */}

					{/* Job status */}
					<FormRowSelect name="status" labelText="Job status" value={ status } 
						handleChange={ handleJobInput } options={ statusOptions }/>
					{/* Job status */}

					{/* Job type */}
					<FormRowSelect name="jobType" labelText="Job type" value={ jobType } 
						handleChange={ handleJobInput } options={ jobTypeOptions }/>
					{/* Job type */}

					{/* Buttons */}
					<div className="btn-container">
						<button type="button" className="btn btn-block clear-btn" 
							onClick={ () => { dispatch(clearValues()); } }>
							Clear
						</button>
						<button type="submit" className="btn btn-block submit-btn" 
							disabled={ isLoading }>
							Submit
						</button>
					</div>
					{/* Buttons */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default AddJob;