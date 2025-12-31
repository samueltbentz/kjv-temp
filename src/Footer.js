import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

function Footer() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDarkMode(saved === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <footer
      className="mt-auto py-4 border-top"
      style={{
        backgroundColor: "var(--surface)",
        color: "var(--text)",
        transition: "all 0.3s ease",
      }}
    >
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        {/* Created by line – now using muted style */}
        <p className="mb-0" style={{ color: "var(--muted)" }}>
          Created by{" "}
          <a
            href="https://samueltbentz.github.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--primary)", textDecoration: "none" }}
          >
            Samuel Bentz
          </a>
        </p>

        {/* Dark Mode Toggle */}
        <Button
          variant="outline-secondary"
          size="sm"
          className="d-flex align-items-center gap-2"
          onClick={toggleDarkMode}
        >
          {darkMode ? <BsSunFill /> : <BsMoonFill />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Container>
    </footer>
  );
}

export default Footer;