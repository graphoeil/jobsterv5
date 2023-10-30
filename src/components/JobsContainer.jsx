// Imports
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../store/features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/JobsContainer";
import { Loading, Job, PageBtnContainer } from "./";

// Component
const JobsContainer = () => {

	// Store
	const { isLoading, jobs, totalJobs, page, 
		numOfPages, search, searchStatus, searchType, 
		sort } = useSelector((store) => { return store.allJobs; });

	// Dispatch
	const dispatch = useDispatch();

	// Get all jobs on mount, and when page or search values changes
	useEffect(() => {
		dispatch(getAllJobs());
	}, [dispatch, page, search, searchStatus, searchType, sort]);

	// Returns
	if (isLoading){
		return(
			<Wrapper>
				<Loading center/>
			</Wrapper>
		);
	}
	if (jobs.length === 0){
		return(
			<Wrapper>
				<h2>No job to display...</h2>
			</Wrapper>
		)
	}
	return(
		<Wrapper>
			<h5>{ totalJobs } job{ totalJobs > 1 && 's' } found</h5>

			{/* Jobs */}
			<div className="jobs">
				{
					jobs.map((job) => {
						return <Job key={ job._id } { ...job }/>;
					})
				}
			</div>
			{/* Jobs */}

			{/* Pagination */}
			{ numOfPages > 1 && <PageBtnContainer/> }
			{/* Pagination */}

		</Wrapper>
	);

};

// Export
export default JobsContainer;