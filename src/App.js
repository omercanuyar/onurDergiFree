import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import CoverPlaceholder from "./components/CoverPlaceholder";
import Archive from './pages/Archive';
import Hakkimizda from './components/Hakkimizda';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<CoverPlaceholder />} />
            <Route path="/hakkimizda" element={<Hakkimizda />} />
            <Route path="/arsiv" element={<Archive />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
