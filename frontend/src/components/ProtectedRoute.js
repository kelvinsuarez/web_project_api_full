import React from "react";
import PropTypes from "prop-types";
import {Navigate} from 'react-router-dom';

function ProtectedRoute ({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/signin"/>
}

ProtectedRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;