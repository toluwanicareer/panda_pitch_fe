import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ProjectRoutes from './routes/projectRoutes';
import Store from './redux/Store';
import * as serviceWorker from './serviceWorker';
import '../public/css/index.css';

ReactDOM.render(
	<Provider store={Store}>
		<ProjectRoutes />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
