// Imports
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import jobOffers from "../assets/images/jobOffers.svg";

// Component
const Landing = () => {

	// Return
	return(
		<Wrapper>
			<nav>
				<Logo/>
			</nav>
			<div className="container page">

				{/* Info */}
				<div className="info">
					<h1>Job <span>tracking</span> app</h1>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit veniam nihil maiores 
						hic sint quisquam consequuntur soluta consequatur voluptatibus culpa? 
						Cum iste, recusandae atque quam doloribus facilis suscipit totam quasi!</p>
					<Link to="/register" type="button" className="btn btn-hero">
						Login / Register
					</Link>
				</div>
				{/* Info */}

				{/* Main image, it's a 2 column layout */}
				<img src={ jobOffers } alt="job hunting" className="img main-img" />
				{/* Main image */}

			</div>
		</Wrapper>
	);

};

// Export
export default Landing;