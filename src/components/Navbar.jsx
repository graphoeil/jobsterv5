// Imports
import { useEffect, useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, clearStore } from "../store/features/user/userSlice";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";

// Component
const Navbar = () => {

	// Store
	const { user } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// Show / hide logout button with autoclose (useEffect)
	const [showLogout, setShowLogout] = useState(false);
	useEffect(() => {
		let timer;
		if (showLogout){
			timer = setTimeout(() => {
				setShowLogout(false);
			}, 4000);
		}
		return () => {
			clearTimeout(timer);
		}
	}, [showLogout]);

	// Return
	return(
		<Wrapper>
			<div className="nav-center">
				<button type="button" className="toggle-btn" 
					onClick={ () => { dispatch(toggleSidebar()); } }>
					<FaAlignLeft/>
				</button>
				<div>
					<Logo/>
					<h3 className="logo-text">Dashboard</h3>
				</div>
				<div className="btn-container">
					<button type="button" className="btn" 
						onClick={ () => { setShowLogout(!showLogout); } }>
						<FaUserCircle/>
						{ user ? user.name : 'John Doe' }
						{ showLogout ? <FaCaretUp/> : <FaCaretDown/> }
					</button>
					<div className={ `dropdown ${ showLogout ? 'show-dropdown' : '' }` }>
						<button type="button" className="dropdown-btn" 
							onClick={ () => { dispatch(clearStore('Logging out...')); } }>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);

};

// Export
export default Navbar;