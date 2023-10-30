// Imports
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "normalize.css";
import './index.css';

// Redux
import { Provider } from "react-redux";
import store from "./store/store.jsx";

// ReactDOM
ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={ store }>
		<App />
	</Provider>
);