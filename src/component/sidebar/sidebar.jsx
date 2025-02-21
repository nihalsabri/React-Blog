import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="../../dashboard/posts" className="sidebar-link">
            Posts
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="../dashboard/categories" className="sidebar-link">
            Categories
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="../../dashboard/users" className="sidebar-link">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;