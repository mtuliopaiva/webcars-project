// Importe os módulos necessários
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword/index";
import { AuthProvider } from "./context/AuthContext";
import useAuthentication from "./hooks/useAuthentication";
import Profile from "./pages/Profile";

// Componente funcional AppRoutes
const AppRoutes: React.FC = () => {
  const { user } = useAuthentication();
  console.log("USER", user);

  return (
    <AuthProvider value={{ user }}>
      <Router>
        <Routes>
          {/* Rota inicial para usuários autenticados */}
          {user && <Route path="/" element={<Home />} />
          }

          {/* Rota inicial para usuários Não autenticados */}
          {!user && <Route path="/" element={<Login />} />}

          {/* Rotas para usuários não autenticados */}
          {!user && (
            <>
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </>
          )}

          {/* Rotas para users autenticados */}
          {user && <Route path="/*" element={<Navigate to="/" />} />}
          {user && <Route path="/profile" element={<Profile />} />}

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
