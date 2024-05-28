import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState("");

  const search = (e) => {
    e.preventDefault();
    fetch(`./bible/${book}.json`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) => {
        let book_res = Object.keys(data)[0];
        let chapter_res = chapter
        let verse_res = verse
        let text = ""
        let chapter_count = data[book_res].length

        let full = false;
        if (!chapter) {
          full = true
          chapter_res = "1"
          setChapter("1")
        }
        if (!verse) {
          full = true
          verse_res = "1"
        }
        let verse_count = data[book_res][chapter_res - 1].length
        console.log(book_res + " " + chapter_res + ":" + verse_res)

        if ((chapter_res) > chapter_count) {
          console.log("undefined chapter")
        } else {
          if ((verse_res) > verse_count) {
            console.log("undefined verse")
          } else {
            if (full) {
              let full_chapter = data[book_res][chapter_res - 1]
              for (let x in full_chapter) {
                text = text + (Number(x) + 1) + " " + data[book_res][chapter_res - 1][x] + "\n\n"
              }
              setBook(book.charAt(0).toUpperCase() + book.slice(1))
              setResult(text)
            } else {
              let val = data[book_res][chapter - 1][verse - 1]
              setBook(book.charAt(0).toUpperCase() + book.slice(1))
              setResult(val)
            }
          }
        }
      })

      .catch(error => console.error(error))
  }
  return (

    <div>
      <Form className="form">
        <Row>
          <Col xs={12} md={6}>
            <Form.Control className="mb-3" type='text' placeholder='Book' onChange={(e) => setBook(e.target.value)} />
          </Col>
          <Col xs={6} md={3}>
            <Form.Control className="mb-3" type='text' placeholder='Chapter' onChange={(e) => setChapter(e.target.value)} />
          </Col>
          <Col xs={6} md={3}>
            <Form.Control className="mb-3" type='text' placeholder='Verse' onChange={(e) => setVerse(e.target.value)} />
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button className="mb-3" size="lg" type="submit" onClick={search}>Search</Button>
        </div>
      </Form>

      {result && (
        <Card className="mb-3">
          <Card.Header id="card-header">{book} {chapter}{verse ? (":" + verse) : ("")}</Card.Header>
          <Card.Body>
            <blockquote id="verse_result" className="blockquote mb-0">
              <p>
                {' '}
                {result}{' '}
              </p>
            </blockquote>
          </Card.Body>
        </Card>
      )}
    </div>
  )

}

export default Home;