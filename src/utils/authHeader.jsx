// Auth header (Bearer)
// With avoid to declare headers for each request ;-)
const authHeader = (thunkAPI) => {
	return {
		headers:{
			// With getState whe access user store, and then user in state ;-)
			authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
		}
	};
};

// Export
export default authHeader;