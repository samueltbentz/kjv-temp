import { Container, Stack } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import arms from "./arms.png";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "var(--surface)",
        color: "var(--text)",
        transition: "all 0.3s ease",
        padding: "1.5rem 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Container>
        <Stack
          direction="horizontal"
          className="align-items-center justify-content-center flex-wrap gap-4"
        >
          <div className="flex-shrink-0">
            <Image
              src={arms}
              alt="Arms with Bible"
              fluid
              style={{ maxHeight: "140px", width: "auto", objectFit: "contain" }}
            />
          </div>

          <div className="text-center">
            <h2
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontWeight: "bold",
                marginBottom: "0.25rem",
                color: "var(--text)",
              }}
            >
              THE HOLY BIBLE
            </h2>

            <h5
              className="subtitle-kjv mb-2"  // ← new class for easy targeting
              style={{
                fontWeight: "500",
                color: "var(--muted)",
              }}
            >
              King James Version
            </h5>

            <p
              className="fst-italic mb-0"
              style={{
                color: "var(--muted)",
                fontSize: "1.05rem",
              }}
            >
              For ever, O Lord, thy word is settled in heaven.
            </p>
          </div>
        </Stack>
      </Container>
    </header>
  );
}

export default Header;