import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>My App</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/Home" style={styles.link}>Home</Link></li>
        <li><Link to="/About" style={styles.link}>About</Link></li>
        <li><Link to="/Services" style={styles.link}>Services</Link></li>
        <li><Link to="/Contact" style={styles.link}>Contact</Link></li>
      </ul>
    </nav>
  );
};

// Simple inline styles for now
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
  },
  logo: {
    color: "#61dafb",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};


export default Navbar;
