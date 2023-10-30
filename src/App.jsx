// Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Error, Landing, ProtectedRoute, Register } from "./pages";
import { AddJob, AllJobs, Profile, SharedLayout, Stats } from "./pages/dashboard";

// Component
const App = () => {

	// Return
	return(
		<Router>
			<Routes>
				<Route path="/" element={ <ProtectedRoute>
					<SharedLayout/>
				</ProtectedRoute> }>
					{/* Nested routes */}
					<Route index element={ <Stats/> }/>
					<Route path="/all-jobs" element={ <AllJobs/> }/>
					<Route path="/add-job" element={ <AddJob/> }/>
					<Route path="/profile" element={ <Profile/> }/>
				</Route>
				<Route path="/landing" element={ <Landing/> }/>
				<Route path="/register" element={ <Register/> }/>
				<Route path="*" element={ <Error/> }/>
			</Routes>
			<ToastContainer position="top-center" transition={ Flip } autoClose={ 1777 }/>
		</Router>
	);

};

// Export
export default App;