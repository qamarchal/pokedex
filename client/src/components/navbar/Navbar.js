import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar({ user }) {
  const logout = () => {
    window.open("/api/auth/logout", "_self")
  }

  return (
    <div className="navbar">
      <span className="title">
        <Link className="menu" to="/">Pokédex</Link>
      </span>
      {user ? (
        <ul className="menu-group">
          <li className="menu">
            <img src={user.photos[0].value} alt="user" className="avatar" />
          </li>
          <li className="menu">{user.displayName}</li>
          <li className="menu" onClick={logout}>Logout</li>
        </ul>
      ) : (
        <Link className="menu" to="/login">Login</Link>
      )}
    </div>
  )
}