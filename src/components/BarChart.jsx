// Imports
import { ResponsiveContainer, BarChart, Bar, 
	XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Component
const BarChartComponent = ({ stats }) => {

	// Return
	return(
		<ResponsiveContainer width="100%" height={ 450 }>
			<BarChart data={ stats } margin={ { top:50 } }>
				<CartesianGrid strokeDasharray="10 10"/>
				{/* Because in stats array => {date: 'Jul 2021', count: 1} ... */}
				<XAxis dataKey="date"/>
				<YAxis allowDecimals={ false }/>
				<Tooltip/>
				{/* Same for count ;-) ... */}
				<Bar type="monotone" dataKey="count" barSize={ 90 } fill="#3b82f6"/>
			</BarChart>
		</ResponsiveContainer>
	);

};

// Export
export default BarChartComponent;