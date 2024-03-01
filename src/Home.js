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



  const search = () => {
    console.log(`http://localhost:8000/${book}/${chapter}/${verse}`)

    fetch(`http://localhost:8000/${book}/${chapter}/${verse}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        setResult(data.result)
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <h3>KJV</h3>
      <Form>
        <Row>
          <Col>
            <Form.Control type='text' placeholder='Book' onChange={(e) => setBook(e.target.value)} />
          </Col>
          <Col>
            <Form.Control type='text' placeholder='Chapter' onChange={(e) => setChapter(e.target.value)} />
          </Col>
          <Col>
            <Form.Control type='text' placeholder='Verse' onChange={(e) => setVerse(e.target.value)} />
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button size="lg" type="button" onClick={search}>Search</Button>
        </div>
      </Form>

      {result && (
        <Card>
          <Card.Header>{book} {chapter}:{verse}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
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