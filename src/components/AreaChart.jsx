// Imports
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Component
const AreaChartComponent = ({ stats }) => {

	// Return
	return(
		<ResponsiveContainer width="100%" height={ 450 }>
			<AreaChart data={ stats } margin={ { top:50 } }>
				<CartesianGrid strokeDasharray="3 3"/>
				{/* Because in stats array => {date: 'Jul 2021', count: 1} ... */}
				<XAxis dataKey="date"/>
				<YAxis allowDecimal={ false } />
				<Tooltip/>
				{/* Same for count ;-) ... */}
				<Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6"/>
			</AreaChart>
		</ResponsiveContainer>
	);

};

// Export
export default AreaChartComponent;