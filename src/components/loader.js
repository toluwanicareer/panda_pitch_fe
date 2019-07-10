import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ children, isLoading, className }) => {
	if (isLoading) return <div className={className}>isLoading...</div>;
	return children;
};

// props initialization ( default values )
Loader.defaultProps = {
	isLoading: true,
	className: '',
};

// props type definition
Loader.propTypes = {
	isLoading: PropTypes.bool,
	className: PropTypes.string,
};

// default importing
export default Loader;
