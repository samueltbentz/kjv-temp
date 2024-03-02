import './App.css';
import Container from 'react-bootstrap/Container'
import Home from './Home'
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Container>
        <Header></Header>
        <Home></Home>
        <Footer></Footer>
      </Container>
    </div>
  );
}

export default App;
