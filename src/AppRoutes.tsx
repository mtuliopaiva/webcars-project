// Importe os módulos necessários
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login'
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword/index'; // Corrigi o caminho para o arquivo ForgotPassword
import { AuthProvider } from './context/AuthContext';
import useAuthentication from './hooks/useAuthentication';

// Componente funcional AppRoutes
const AppRoutes: React.FC = () => {
  useEffect(() => {
  }, []);

  const { user } = useAuthentication();
  console.log("USER", user);

  return (
    <AuthProvider value={{ user }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Exporte o componente
export default AppRoutes;
