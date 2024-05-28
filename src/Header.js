import { Stack, Col, Row } from "react-bootstrap";
import image1 from './arms.png'
import Image from 'react-bootstrap/Image';


function Header() {
  return (
    <div>
      <Stack direction="horizontal">
        <div>
          <Image className="image" src={image1}></Image>
        </div>
        <div className="p-2">
          <h3 className="header">THE HOLY BIBLE</h3>
          <Col>
            <p>KJV</p>
          </Col>
        </div>
        <p className="title-verse">For ever, O Lord, thy word is settled in heaven.</p>
      </Stack>
    </div>

  )
};


export default Header;