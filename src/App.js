import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import CoverPlaceholder from "./components/CoverPlaceholder";
import Archive from './pages/Archive';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<CoverPlaceholder />} />
            <Route path="/arsiv" element={<Archive />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
