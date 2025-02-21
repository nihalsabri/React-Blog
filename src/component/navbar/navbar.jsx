import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import './navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">Blog</Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>

        {user ? (
          <>
            <li>Welcome, {user.username}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
            <li><Link to="/dashboard"> Dashboard </Link></li>

          </>
        ) : (   <>
            <li><Link to="/login">Log in </Link></li>
          <li><Link to="/signup">Sign up</Link></li> </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
