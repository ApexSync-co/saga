import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // The AuthContext is designed to only render children when loading is false.
    // So if this component renders, we definitively know the final auth state.
    
    if (!isAuthenticated) {
        // Redirect to sign-in page, but save the current location they were trying to go to
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
