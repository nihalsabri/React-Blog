import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }


  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/home" />;
  }


  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(
    PropTypes.oneOf(['ADMIN', 'MANAGE_POSTS', 'USER']) // Define allowed roles
  ),
};

export default ProtectedRoute;