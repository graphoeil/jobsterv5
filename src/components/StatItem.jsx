// Import
import React from "react";
import styled from "styled-components";

// Component
const StatItem = React.memo(function StatItem({ title, count, icon, color, bcg }){

	// Return
    return(
        <Wrapper color={ color } bcg={ bcg }>
            <header>
				<span className="count">{ count }</span>
				<span className="icon">{ icon }</span>
			</header>
			<h5 className="title">{ title }</h5>
        </Wrapper>
    );

});

// Styled
const Wrapper = styled.article`
	padding: 2rem;
	background: var(--white);
	border-radius: var(--borderRadius);
	border-bottom: 5px solid ${(props) => { return props.color; }};
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.count {
		display: block;
		font-weight: 700;
		font-size: 50px;
		color: ${(props) => { return props.color; }};
	}
	.title {
		margin: 0;
		text-transform: capitalize;
		letter-spacing: var(--letterSpacing);
		text-align: left;
		margin-top: 0.5rem;
	}
	.icon {
		width: 70px;
		height: 60px;
		background: ${(props) => { return props.bcg; }};
		border-radius: var(--borderRadius);
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 2rem;
			color: ${(props) => { return props.color; }};
		}
	}
`;

// Export
export default StatItem;