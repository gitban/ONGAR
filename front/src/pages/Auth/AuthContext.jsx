import { createContext, useContext, useState, useEffect } from 'react';
import Login from '../admin/Login';
import { API_BASE_URL } from '../../../config';

// 1. Creamos el contexto (no hace falta exportarlo si usamos el hook)
const AuthContext = createContext();

// 2. Exportación NOMBRADA del Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); // 👈 Nuevo: para evitar flasheos de pantalla

  
    // 1. DEFINIR LAS FUNCIONES
    const login = (newToken) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
    };
  useEffect(() => {
    const verificarToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/administradores`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Token inválido");
        }
        // Si el token es válido, mantenemos el estado
      } catch (error) {
        console.warn("Sesión expirada o inválida; "+ error);
        logout(); // Limpiamos todo si el backend dice que no sirve
      } finally {
        setLoading(false);
      }
    };

    verificarToken();
  }, [token]);

  if (loading) return <div>Cargando sesión...</div>; // O un spinner

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Exportación NOMBRADA del Hook (Fíjate en el 'export')
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};