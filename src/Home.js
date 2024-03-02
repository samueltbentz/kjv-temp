import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



function Home() {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState("");



  const search = async (e) => {
    e.preventDefault();

    console.log(`http://localhost:8000/${book}/${chapter}/${verse}`)

    await fetch(`http://localhost:8000/${book}/${chapter}/${verse}`)
      .then(response => response.json())
      .then((data) => {
        if (Array.isArray(data.result)) {
          let text = ""
          for (let x in data.result) {
            let num = parseInt(x) + 1
            text = text + "[" + num + "] " + data.result[x] + "\n"
          }
          setBook(book.charAt(0).toUpperCase() + book.slice(1))
          setResult(text)
        } else {
          setBook(book.charAt(0).toUpperCase() + book.slice(1))
          setResult(data.result)
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <Form className="form">
        <Row>
          <Col>
            <Form.Control className="mb-3" type='text' placeholder='Book' onChange={(e) => setBook(e.target.value)} />
          </Col>
          <Col>
            <Form.Control className="mb-3" type='text' placeholder='Chapter' onChange={(e) => setChapter(e.target.value)} />
          </Col>
          <Col>
            <Form.Control className="mb-3" type='text' placeholder='Verse' onChange={(e) => setVerse(e.target.value)} />
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button className="mb-3" size="lg" type="submit" onClick={search}>Search</Button>
        </div>
      </Form>

      {result && (
        <Card className="mb-3" >
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