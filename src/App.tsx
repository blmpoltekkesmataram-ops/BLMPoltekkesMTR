import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import VisiMisi from './components/VisiMisi';
import Tupoksi from './components/Tupoksi';
import LogoPhilosophy from './components/LogoPhilosophy';
import Structure from './components/Structure';
import LeadershipStructure from './components/LeadershipStructure';
import OrmawaStructure from './components/OrmawaStructure';
import News from './components/News';
import Aspirasi from './components/Aspirasi';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminToolbar from './components/AdminToolbar';
import Toast from './components/Toast';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Beranda');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setShowLogin(false);
    showToast('Login berhasil!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsEditMode(false); // Exit edit mode on logout
    showToast('Anda telah logout.');
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };
  
  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Beranda':
        return <Home setPage={setCurrentPage} isEditMode={isEditMode} showToast={showToast} />;
      case 'Profil':
        return (
          <>
            <Profile />
            <VisiMisi isEditMode={isEditMode} showToast={showToast} />
            <Tupoksi />
            <LogoPhilosophy isEditMode={isEditMode} showToast={showToast} />
          </>
        );
      case 'Struktur BLM':
        return (
          <>
            <Structure />
            <LeadershipStructure isEditMode={isEditMode} showToast={showToast} />
          </>
        );
      case 'Alur Ormawa':
        return <OrmawaStructure />;
      case 'Berita':
        return <News isLoggedIn={isLoggedIn} isEditMode={isEditMode} showToast={showToast} />;
      case 'Aspirasi':
        return <Aspirasi />;
      case 'Galeri':
        return <Gallery isEditMode={isEditMode} showToast={showToast} />;
      default:
        return <Home setPage={setCurrentPage} isEditMode={isEditMode} showToast={showToast} />;
    }
  };

  return (
    <div className={`bg-slate-50 text-slate-800 antialiased font-sans ${isLoggedIn ? 'pt-14' : ''}`}>
      {isLoggedIn && (
        <AdminToolbar
          currentUser={currentUser}
          onLogout={handleLogout}
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
        />
      )}
      <Navbar 
        currentPage={currentPage} 
        setPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
      {showLogin && !isLoggedIn && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
};

export default App;