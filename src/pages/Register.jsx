// Imports
import { useEffect, useRef, useState } from "react";
import { toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../store/features/user/userSlice";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";

// Initial state
const initialState = {
	name:'',
	email:'',
	password:'',
	isMember:true
};

// Component
const Register = () => {

	// Store
	const { user, isLoading } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// State
	const [state, setState] = useState(initialState);
	const { name, email, password, isMember } = state;

	// Redirect to dashboard if already connected
	const navigate = useNavigate();
	useEffect(() => {
		if (user){
			setTimeout(() => {
				navigate('/');
			}, 1000);
		}
		/* No problem to add navigate in dependencies
		because navigate function will never change
		because it's created with use function */
	}, [user, navigate]);

	// Autofocus on email input
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	useEffect(() => {
		emailRef.current.focus();
	}, []);

	// Inputs change
	const handleChange = (e) => {
		setState((oldState) => {
			return { ...oldState, [e.target.name]:e.target.value };
		});
	};

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		if (!email || !password || (!isMember && !name)){
			// https://fkhadra.github.io/react-toastify/introduction
			toast.error('Please fill out all fields', {
				autoClose:1777,
				transition:Flip
			});
			// Re-focus on empty input
			if (!isMember && !name){
				nameRef.current.focus();
				return;
			}
			if (!email){
				emailRef.current.focus();
				return;
			}
			if (!password){
				passwordRef.current.focus();
				return;
			}
		}
		// Login
		if (isMember){
			dispatch(loginUser({ email, password }));
			return;
		}
		// Register
		dispatch(registerUser({ name, email, password }));
	};

	// Show demo
	const showDemo = () => {
		dispatch(loginUser({ email:'testUser@test.com', password:'secret' }));
	};

	// Toggle member (switch to Login or Register form)
	const toggleMember = () => {
		setState((oldState) => {
			return { ...oldState, isMember:!isMember };
		});
		// Re-focus on first input
		// setTimeout because changes in state are asynchronous ;-)
		setTimeout(() => {
			if (isMember){
				nameRef.current.focus();
			} else {
				emailRef.current.focus();
			}
		}, 10);
	};

	// Return
	return(
		<Wrapper className="full-page">
			<form className="form" onSubmit={ submitForm }>

				{/* Header */}
				<Logo/>
				<h3>{ isMember ? 'Login' : 'Register' }</h3>
				{/* Header */}

				{/* Name */}
				{ !isMember && <FormRow ref={ nameRef } type="text" name="name" 
					value={ name } handleChange={ handleChange }/> }
				{/* Name */}

				{/* Email */}
				<FormRow ref={ emailRef } type="email" name="email" 
					value={ email } handleChange={ handleChange }/>
				{/* Email */}

				{/* Password */}
				<FormRow ref={ passwordRef } type="password" name="password" 
					value={ password } handleChange={ handleChange }/>
				{/* Password */}

				{/* Buttons */}
				{/* Disabled also if user, because of the timeout to redirect to dashboard, 
				which allows to click for one second after the login or register 
				is fullfilled which resets isLoading to false ,-) */}
				<button type="submit" className="btn btn-block" disabled={ isLoading || user }>
					{ isLoading || user ? 'Loading...' : 'Submit' }
				</button>
				<button type="button" className="btn btn-block btn-hipster" 
					disabled={ isLoading || user } onClick={ showDemo }>
				{ isLoading || user ? 'Loading...' : 'Demo' }
				</button>
				<p>
					{ isMember ? 'Not a member yet ?' : 'Already a member ?' }
					<button type="button" className="member-btn" onClick={ toggleMember }>
						{ isMember ? 'Register' : 'Login' }
					</button>
				</p>
				{/* Buttons */}

			</form>
		</Wrapper>
	);

};

// Export
export default Register;