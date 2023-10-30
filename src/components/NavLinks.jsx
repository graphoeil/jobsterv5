// Imports
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useSelector } from "react-redux";

// Component
const NavLinks = ({ closeSidebar }) => {

	// Store
	const { isEditing } = useSelector((store) => { return store.job });

	// Add | Edit job button
	const addEditJobButton = () => {
		if (isEditing){
			return 'Edit job';
		}
		return 'Add job';
	};

	// Return
	return(
		<div className="nav-links">
			{
				links.map((link) => {
					const { id, text, path, icon } = link;
					return(
						<NavLink key={ id } to={ path } className={ ({ isActive }) => {
							return `nav-link ${ isActive ? 'active' : '' }`
						} } onClick={ closeSidebar } end>
							<span className="icon">{ icon }</span>
							{ path === "/add-job" ? addEditJobButton() : text }
						</NavLink>
					);
				})
			}
		</div>
	);

};

// Export
export default NavLinks;