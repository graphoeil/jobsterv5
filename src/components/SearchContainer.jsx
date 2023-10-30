// Imports
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearFilters } from "../store/features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from "./";

// Component
const SearchContainer = () => {

	// Stores
	const { isLoading, searchStatus, searchType, 
		sort, sortOptions } = useSelector((store) => { return store.allJobs; });
	const { statusOptions, jobTypeOptions } = useSelector((store) => { return store.job; });

	// Dispatch
	const dispatch = useDispatch();

	// Search change with debouncing
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		const timer = setTimeout(() => {
			// Dispatch
			dispatch(handleChange({ name:'search', value:searchValue }));
		}, 250);
		// Return, each time searchValue change, timer is cleared ;-)
		return () => {
			clearTimeout(timer);
		}
	}, [searchValue, dispatch]);

	// Autofocus on search field
	const searchRef = useRef();
	useEffect(() => {
		searchRef.current.focus();
	});

	// Select change
	const handleSearch = (e) => {
		if (isLoading){ return; }
		dispatch(handleChange({ name:e.target.name, value:e.target.value }));
	};

	// Submit form (clear form)
	const clearForm = (e) => {
		e.preventDefault();
		dispatch(clearFilters());
		setSearchValue('');
	};

	// Return
	return(
		<Wrapper>
			<form className="form">
				<h4>Search form</h4>
				<div className="form-center">

					{/* Search position */}
					<FormRow ref={ searchRef } type="text" name="search" labelText="Position" 
						value={ searchValue } handleChange={ (e) => { setSearchValue(e.target.value); } }/>
					{/* Search position */}

					{/* Search status */}
					<FormRowSelect labelText="Job status" name="searchStatus" value={ searchStatus } 
						handleChange={ handleSearch } options={ ['all', ...statusOptions] }/>
					{/* Search status */}

					{/* Search type */}
					<FormRowSelect labelText="Job type" name="searchType" value={ searchType } 
						handleChange={ handleSearch } options={ ['all', ...jobTypeOptions] }/>
					{/* Search type */}

					{/* Sort */}
					<FormRowSelect labelText="Sort" name="sort" value={ sort } 
						handleChange={ handleSearch } options={ sortOptions }/>
					{/* Sort */}

					{/* Clear */}
					<button type="submit" className="btn btn-block btn-danger" 
						disabled={ isLoading } onClick={ clearForm }>
						Clear
					</button>
					{/* Clear */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default SearchContainer;