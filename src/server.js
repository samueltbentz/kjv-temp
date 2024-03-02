const express = require('express')
const app = express();
const port = 8000;
const fs = require('node:fs')
const cors = require('cors')
app.use(cors())

app.listen(port, () => {
  console.log('Server running at http://localhost:' + port)
})


app.get("/:book/:chapter?/:verse?", (req, res) => {
  let full = false;
  let book = req.params.book.toLowerCase();
  let chapter = req.params.chapter
  let verse = req.params.verse
  if (!chapter) {
    chapter = "1"
    full = true
  }
  if (!verse) {
    verse = "1"
    full = true
  }
  console.log(book + " " + chapter + ":" + verse)

  fs.readFile(`./src/bible/${book}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let text = JSON.parse(data)
    let value = text[book]
    let chapter_count = value.length
    if ((chapter) > chapter_count) {
      console.log("undefined chapter")
      res.send({ "message": "not found" })
    } else {
      let verse_count = value[chapter - 1].length
      if ((verse) > verse_count) {
        console.log("undefined verse")
        res.send({ "message": "not found" })
      } else {
        if (full) {
          let full_chapter = value[chapter - 1]
          res.send({ "result": full_chapter })
        } else {
          let val = value[chapter - 1][verse - 1]
          res.send({ "result": val })
        }
      }
    }
  });

})