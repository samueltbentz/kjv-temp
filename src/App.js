// App.js (or your main page wrapper)
import { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import './index.css'; // if you have global styles

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;