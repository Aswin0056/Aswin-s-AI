import { Link } from "react-router-dom";
import "../styles/Media.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      {/* Top Section */}
      <div style={styles.topSection}>
        {/* Logo and Description */}
        <div style={styles.column}>
          <img
            src="/logo192.png"
            alt="ExpenSaver Logo"
            style={styles.logo}
          />
          <p style={styles.description}>
            LIX is not just logic — she expresses, understands, and connects.
          </p>
        </div>

        {/* Company Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Company</h4>
          <ul style={styles.list}>
            <li><Link to="/about" style={styles.link}>About Us</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact</Link></li>
            <li>
              <a href="https://azhstudioofficial.online" rel="noreferrer" style={styles.link}>
                Azh Studio
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Support</h4>
          <ul style={styles.list}>
            <li><Link to="/faq" style={styles.link}>FAQs</Link></li>
            <li><Link to="/terms" style={styles.link}>Terms of Service</Link></li>
            <li><Link to="/privacy" style={styles.link}>Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomSection}>
        <p style={styles.smallText}>
          © {currentYear} <strong style={styles.white}>LIX</strong>
          <strong style={styles.gold}></strong>. All rights reserved.
        </p>
        <p style={styles.smallText}>
          Built with 🤍 by{" "}
          <a
            href="https://azhstudioofficial.online"
            target="_blank"
            rel="noreferrer"
            style={styles.goldLink}
          >
            Azh Studio
          </a>
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#fff",
    color: "whiteSmoke",
    padding: "3rem 2rem",
    fontFamily: "Arial, sans-serif",
    marginTop: "4rem",
  },
  topSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: "2rem",
    borderBottom: "1px solid #444",
    paddingBottom: "2rem",
  },
  column: {
    flex: "1 1 220px",
    minWidth: "180px",
  },
  logo: {
    width: "120px",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "0.95rem",
    color: "#000",
    maxWidth: "280px",
  },
  heading: {
    marginBottom: "1rem",
    color: "goldenrod",
    fontSize: "1.1rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "#000",
    marginBottom: "0.5rem",
    display: "inline-block",
    transition: "color 0.2s",
    fontSize: "0.9rem",
  },
  bottomSection: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.5rem",
    fontSize: "0.85rem",
  },
  smallText: {
    margin: 0,
    color: "#000",
  },
  white: {
    color: "black",
  },
  gold: {
    color: "goldenrod",
  },
  goldLink: {
    color: "goldenrod",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
