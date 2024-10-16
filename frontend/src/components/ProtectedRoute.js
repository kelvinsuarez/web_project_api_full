import React from "react";
import {Navigate} from 'react-router-dom';

function ProtectedRoute ({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/signin"/>
}

export default ProtectedRoute;