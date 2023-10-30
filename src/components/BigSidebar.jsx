// Imports
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo, NavLinks } from "./";

// Component
const BigSidebar = () => {

	// Store
	const { isSidebarOpen } = useSelector((store) => { return store.user; });

	// Return
	return(
		<Wrapper>
			{/* We show BigSidebar by default, then if isSidebarOpen 
			is true we don't add show-sidebar, only if it's false, 
			it's reversed ;-) */}
			<div className={ `sidebar-container ${ !isSidebarOpen ? 'show-sidebar' : '' }` }>
				<div className="content">
					<header>
						<Logo/>
					</header>
					<NavLinks/>
				</div>
			</div>
		</Wrapper>
	);

};

// Export
export default BigSidebar;