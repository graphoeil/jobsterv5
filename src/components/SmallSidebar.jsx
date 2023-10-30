// Imports
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../store/features/user/userSlice";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { Logo, NavLinks } from "./";

// Component
const SmallSidebar = () => {

	// Store
	const { isSidebarOpen } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// Close sidebar
	const closeSidebar = () => {
		dispatch(toggleSidebar());
	};

	// Return
	return(
		<Wrapper>
			<div className={ `sidebar-container ${ isSidebarOpen ? 'show-sidebar' : '' }` }>
				<div className="content">
					<button type="button" className="close-btn" onClick={ closeSidebar }>
						<FaTimes/>
					</button>
					<header>
						<Logo/>
					</header>
					<NavLinks closeSidebar={ closeSidebar }/>
				</div>
			</div>
		</Wrapper>
	);

};

// Export
export default SmallSidebar;