import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * A wrapper component that protects routes from unauthenticated access.
 * Redirects to login page if user is not authenticated.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo = '/login'
}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show nothing while checking authentication status
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        // Save the attempted location for redirecting after login
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Render the protected content
    return <>{children}</>;
};

export default ProtectedRoute;
