import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Header from "./components/Header";
import CoverPlaceholder from "./components/CoverPlaceholder";
import Archive from './pages/Archive';
import Articles from './pages/Articles';
import Hakkimizda from './components/Hakkimizda';
import Footer from './components/Footer';
import SecretLogin from './pages/SecretLogin';
import AdminPanel from './pages/AdminPanel';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/giris-190-ozel') || 
                       location.pathname.startsWith('/yonetim-190-panel');

  return (
    <div className="App">
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<CoverPlaceholder />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/arsiv" element={<Archive />} />
          <Route path="/yazilar" element={<Articles />} />
          <Route path="/giris-190-ozel" element={<SecretLogin />} />
          <Route path="/yonetim-190-panel" element={<AdminPanel />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
