import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};



export default ProtectedRoute;

