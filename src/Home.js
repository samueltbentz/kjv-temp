import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
  }, [book, chapter, verse]);



  const search = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())
    console.log(formDataObj)
    let book_input = formDataObj.book.toLowerCase().replace(/ /g, '')
    let chapter_input = formDataObj.chapter
    let verse_input = formDataObj.verse

    fetch(`./bible/${book_input}.json`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) => {
        let book_res = Object.keys(data)[0];
        let text = ""
        let chapter_count = data[book_res].length

        let full = false;
        if (!chapter_input) {
          full = true
          chapter_input = "1"
        }
        if (!verse_input) {
          full = true
          verse_input = "1"
        }
        let verse_count = data[book_res][chapter_input - 1].length
        if ((chapter_input) > chapter_count) {
          console.log("undefined chapter")
        } else {
          if ((verse_input) > verse_count) {
            console.log("undefined verse")
          } else {
            if (full) {
              let full_chapter = data[book_res][chapter_input - 1]
              for (let x in full_chapter) {
                text = text + data[book_res][chapter_input - 1][x] + "\n"
              }
              let textArr = text.split('\n');
              textArr.pop()
              console.log(textArr)
              setBook(book_res)
              setChapter(chapter_input)
              setVerse(verse_input)
              setResult(textArr)
            } else {
              let val = data[book_res][chapter_input - 1][verse_input - 1]
              let arr = [val]
              setBook(book_res)
              setChapter(chapter_input)
              setVerse(verse_input)
              setResult(arr)
            }
          }
        }
      })

      .catch(error => console.error(error))
  }

  function bookName(entry) {
    let res = ""
    if (!isNaN(+entry.charAt(0))) {
      res = entry.charAt(0) + " " + entry.charAt(1).toUpperCase() + entry.slice(2)

    } else {
      res = entry.charAt(0).toUpperCase() + entry.slice(1)

    }
    return res
  }

  return (

    <div>
      <Form className="form" onSubmit={search}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Control className="mb-3" type='text' name="book" placeholder='Book' />
          </Col>
          <Col xs={6} md={3}>
            <Form.Control className="mb-3" type='text' name="chapter" placeholder='Chapter' />
          </Col>
          <Col xs={6} md={3}>
            <Form.Control className="mb-3" type='text' name="verse" placeholder='Verse' />
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button className="mb-3" size="lg" type="submit">Search</Button>
        </div>
      </Form>

      {result.length > 0 && result.length !== 1 && (
        <Card className="mb-3">
          <Card.Header id="card-header">{bookName(book)} {chapter}</Card.Header>
          <Card.Body>
            <blockquote id="verse_result" className="blockquote mb-0">
              {result.map((item, index) => (
                <p className="scripture"><span>{index + 1}</span> {item}</p>
              ))}
            </blockquote>
          </Card.Body>
        </Card>
      )}
      {result.length === 1 && (
        <Card className="mb-3">
          <Card.Header id="card-header">{bookName(book)} {chapter}{verse ? (":" + verse) : ("")}</Card.Header>
          <Card.Body>
            <blockquote id="verse_result" className="blockquote mb-0">
              {result.map((item, index) => (
                <p className="scripture">{item}</p>
              ))}
            </blockquote>
          </Card.Body>
        </Card>
      )}

    </div>
  )


}

export default Home;