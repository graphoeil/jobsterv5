// Imports
import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteJob, setEditJob } from "../store/features/job/jobSlice";
import Wrapper from "../assets/wrappers/Job";
import JobInfoWrapper from "../assets/wrappers/JobInfo";

/* React normally re-renders a component whenever its parent re-renders. 
With memo, you can create a component that React will not re-render 
when its parent re-renders so long as its new props are the same 
as the old props. Such a component is said to be memoized. */

// Job info component
const jobInfo = ({ icon, text }) => {
	return(
		<JobInfoWrapper>
			<span className="icon">{ icon }</span>
			<span className="text">{ text }</span>
		</JobInfoWrapper>
	);
};
const MemoJobInfo = React.memo(jobInfo);

// Component
const Job = React.memo(function Job({ _id, position, company, jobLocation, jobType, createdAt, status }){

	// Dispatch
	const dispatch = useDispatch();

	// Formatted date with moment.js
	const date = moment(createdAt).format('MMM Do, YYYY');

	// Edit job
	const handleEditJob = () => {
		dispatch(setEditJob({ editJobId:_id, position, company, jobLocation, jobType, status }));
	};

	// Return
    return(
        <Wrapper>
            <header>
				<div className="main-icon">{ company.charAt(0) }</div>
				<div className="info">
					<h5>{ position }</h5>
					<p>{ company }</p>
				</div>
			</header>
			<div className="content">
				<div className="content-center">
					<MemoJobInfo icon={ <FaLocationArrow/> } text={ jobLocation }/>
					<MemoJobInfo icon={ <FaCalendarAlt/> } text={ date }/>
					<MemoJobInfo icon={ <FaBriefcase/> } text={ jobType }/>
					<div className={ `status ${ status }` }>{ status }</div>
				</div>
				<footer>
					<div className="actions">
						<Link to="/add-job" className="btn edit-btn" onClick={ handleEditJob }>
							Edit
						</Link>
						<button type="button" className="btn delete-btn" 
							onClick={ () => { dispatch(deleteJob(_id)); } }>
							Delete
						</button>
					</div>
				</footer>
			</div>
        </Wrapper>
    );

});

// Export
export default Job;