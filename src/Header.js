import { Stack, Col } from "react-bootstrap";
import image1 from './arms.png'
import Image from 'react-bootstrap/Image';



function Header() {
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">
          <Image className="image" src={image1}></Image>
        </div>
        <div className="p-2">
          <h3 className="header">THE HOLY BIBLE</h3>
          <Col>
            <p>KJV</p>
          </Col>
        </div>
      </Stack>
    </div>

  )
};


export default Header;