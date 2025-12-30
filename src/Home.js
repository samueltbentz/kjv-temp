import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Navbar } from "react-bootstrap";
import { BsSunFill, BsMoonFill } from "react-icons/bs"; // npm install react-icons



const bibleBooks = [
  { id: "genesis", display: "Genesis", chapters: 50 },
  { id: "exodus", display: "Exodus", chapters: 40 },
  { id: "leviticus", display: "Leviticus", chapters: 27 },
  { id: "numbers", display: "Numbers", chapters: 36 },
  { id: "deuteronomy", display: "Deuteronomy", chapters: 34 },
  { id: "joshua", display: "Joshua", chapters: 24 },
  { id: "judges", display: "Judges", chapters: 21 },
  { id: "ruth", display: "Ruth", chapters: 4 },
  { id: "1samuel", display: "1 Samuel", chapters: 31 },
  { id: "2samuel", display: "2 Samuel", chapters: 24 },
  { id: "1kings", display: "1 Kings", chapters: 22 },
  { id: "2kings", display: "2 Kings", chapters: 25 },
  { id: "1chronicles", display: "1 Chronicles", chapters: 29 },
  { id: "2chronicles", display: "2 Chronicles", chapters: 36 },
  { id: "ezra", display: "Ezra", chapters: 10 },
  { id: "nehemiah", display: "Nehemiah", chapters: 13 },
  { id: "esther", display: "Esther", chapters: 10 },
  { id: "job", display: "Job", chapters: 42 },
  { id: "psalms", display: "Psalms", chapters: 150 },
  { id: "proverbs", display: "Proverbs", chapters: 31 },
  { id: "ecclesiastes", display: "Ecclesiastes", chapters: 12 },
  { id: "songofsolomon", display: "Song of Solomon", chapters: 8 },
  { id: "isaiah", display: "Isaiah", chapters: 66 },
  { id: "jeremiah", display: "Jeremiah", chapters: 52 },
  { id: "lamentations", display: "Lamentations", chapters: 5 },
  { id: "ezekiel", display: "Ezekiel", chapters: 48 },
  { id: "daniel", display: "Daniel", chapters: 12 },
  { id: "hosea", display: "Hosea", chapters: 14 },
  { id: "joel", display: "Joel", chapters: 3 },
  { id: "amos", display: "Amos", chapters: 9 },
  { id: "obadiah", display: "Obadiah", chapters: 1 },
  { id: "jonah", display: "Jonah", chapters: 4 },
  { id: "micah", display: "Micah", chapters: 7 },
  { id: "nahum", display: "Nahum", chapters: 3 },
  { id: "habakkuk", display: "Habakkuk", chapters: 3 },
  { id: "zephaniah", display: "Zephaniah", chapters: 3 },
  { id: "haggai", display: "Haggai", chapters: 2 },
  { id: "zechariah", display: "Zechariah", chapters: 14 },
  { id: "malachi", display: "Malachi", chapters: 4 },
  { id: "matthew", display: "Matthew", chapters: 28 },
  { id: "mark", display: "Mark", chapters: 16 },
  { id: "luke", display: "Luke", chapters: 24 },
  { id: "john", display: "John", chapters: 21 },
  { id: "acts", display: "Acts", chapters: 28 },
  { id: "romans", display: "Romans", chapters: 16 },
  { id: "1corinthians", display: "1 Corinthians", chapters: 16 },
  { id: "2corinthians", display: "2 Corinthians", chapters: 13 },
  { id: "galatians", display: "Galatians", chapters: 6 },
  { id: "ephesians", display: "Ephesians", chapters: 6 },
  { id: "philippians", display: "Philippians", chapters: 4 },
  { id: "colossians", display: "Colossians", chapters: 4 },
  { id: "1thessalonians", display: "1 Thessalonians", chapters: 5 },
  { id: "2thessalonians", display: "2 Thessalonians", chapters: 3 },
  { id: "1timothy", display: "1 Timothy", chapters: 6 },
  { id: "2timothy", display: "2 Timothy", chapters: 4 },
  { id: "titus", display: "Titus", chapters: 3 },
  { id: "philemon", display: "Philemon", chapters: 1 },
  { id: "hebrews", display: "Hebrews", chapters: 13 },
  { id: "james", display: "James", chapters: 5 },
  { id: "1peter", display: "1 Peter", chapters: 5 },
  { id: "2peter", display: "2 Peter", chapters: 3 },
  { id: "1john", display: "1 John", chapters: 5 },
  { id: "2john", display: "2 John", chapters: 1 },
  { id: "3john", display: "3 John", chapters: 1 },
  { id: "jude", display: "Jude", chapters: 1 },
  { id: "revelation", display: "Revelation", chapters: 22 },
];

const Home = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const selectedBookData = bibleBooks.find((b) => b.id === book);
  const maxChapters = selectedBookData?.chapters ?? 0;

  // Toggle dark mode & save preference
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Load saved preference or system default on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDarkMode(saved === "dark");
    }
  }, []);

const loadChapter = async () => {
    if (!book || !chapter) return;
    const bookKey = book.toLowerCase();
    const url = `./bible/${bookKey}.json`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const bookName = Object.keys(data)[0];
      const chapIndex = Number(chapter) - 1;

      if (chapIndex < 0 || chapIndex >= data[bookName].length) {
        setResult("Chapter not found");
        return;
      }

      const verses = data[bookName][chapIndex];
      let text = verse
        ? verses[Number(verse) - 1] || "Verse not found"
        : verses.map((v, i) => `[${i + 1}] ${v}`).join("\n");

      setDisplayTitle(
        `${bookName.charAt(0).toUpperCase() + bookName.slice(1)} ${chapter}${
          verse ? `:${verse}` : ""
        }`
      );
      setResult(text);
    } catch (err) {
      setResult("Error loading content");
    }
  };


  // Auto-load chapter when book changes
// Then your useEffect:
useEffect(() => {
  if (book && maxChapters > 0) {
    setChapter("1");
    setVerse("");
    loadChapter();
  }
}, [book, maxChapters, loadChapter]);

  
  const prevChapter = () => {
    const num = Number(chapter);
    if (num > 1) setChapter(String(num - 1));
  };

  const nextChapter = () => {
    const num = Number(chapter);
    if (num < maxChapters) setChapter(String(num + 1));
  };

  return (
    <>
      {/* Modern Navbar with Dark Mode Toggle */}
      <Navbar
        expand="sm"
        className={`sticky-top ${darkMode ? "bg-dark" : "bg-light"} border-bottom shadow-sm`}
        style={{ zIndex: 1000 }}
      >
        <Container fluid className="px-3 py-2">
          <Navbar.Brand className="fw-bold fs-4">KJV Reader</Navbar.Brand>
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="outline-secondary"
              size="sm"
              className="d-flex align-items-center gap-2"
              onClick={toggleDarkMode}
            >
              {darkMode ? <BsSunFill /> : <BsMoonFill />}
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container
        fluid="md"
        className={`py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
        style={{ minHeight: "100vh", transition: "all 0.3s ease" }}
      >
        {/* Main controls */}
        <Row className="g-3 mb-4 justify-content-center">
          <Col xs={12} sm={6} md={5} lg={4}>
            <Form.Select
              size="lg"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              className="shadow-sm"
            >
              <option value="">Select Book...</option>
              {bibleBooks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.display}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col xs={6} sm={3} md={3} lg={2}>
            <Form.Select
              size="lg"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              disabled={!maxChapters}
              className="shadow-sm"
            >
              <option value="">Ch.</option>
              {[...Array(maxChapters)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col xs={6} sm={3} md={2}>
            <Form.Control
              size="lg"
              placeholder="Verse"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              className="shadow-sm"
            />
          </Col>
        </Row>

        {/* Prev/Next + Load */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
          <Button
            variant={darkMode ? "outline-light" : "outline-dark"}
            onClick={prevChapter}
            disabled={!chapter || Number(chapter) <= 1}
          >
            ← Previous Chapter
          </Button>

          <Button
            size="lg"
            variant="primary"
            onClick={loadChapter}
            disabled={!book || !chapter}
            className="px-5"
          >
            Load
          </Button>

          <Button
            variant={darkMode ? "outline-light" : "outline-dark"}
            onClick={nextChapter}
            disabled={!chapter || Number(chapter) >= maxChapters}
          >
            Next Chapter →
          </Button>
        </div>

        {/* Result */}
        {result && (
          <Card
            className={`shadow-lg border-0 ${
              darkMode ? "bg-secondary text-light" : "bg-white"
            }`}
          >
            <Card.Header
              className={`text-center fs-3 fw-bold py-3 ${
                darkMode ? "bg-primary" : "bg-primary"
              } text-white`}
            >
              {displayTitle}
            </Card.Header>
            <Card.Body
              className="p-4 p-md-5"
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: "1.25rem",
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
              }}
            >
              {result}
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Home;