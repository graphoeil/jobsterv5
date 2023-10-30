// Component
const FormRowSelect = ({ name, value, handleChange, labelText, options }) => {

	// Return
	return(
		<div className="form-row">
			<label htmlFor={ name }>{ labelText || name }</label>
			<select name={ name } id={ name } className="form-select" value={ value } onChange={ handleChange }>
				{
					options.map((itemValue, index) => {
						return <option key={ index } value={ itemValue }>
							{ itemValue }
						</option>;
					})
				}
			</select>
		</div>
	);

};

// Export
export default FormRowSelect;