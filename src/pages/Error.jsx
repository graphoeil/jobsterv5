// Imports
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFound from "../assets/images/notFound.svg";

// Component
const Error = () => {

	// Return
	return(
		<Wrapper className="full-page">
			<div>
				<img src={ notFound } alt="404!" />
				<h3>Ooh ! Page not found</h3>
				<p>We can't seem to find the page you're looking for...</p>
				<Link to="/">Back home</Link>
			</div>
		</Wrapper>
	);

};

// Export
export default Error;