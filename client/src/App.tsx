import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/auth/register.tsx';
import Login from './components/auth/login.tsx';
import { ThemeProvider } from "./components/theme-provider.tsx"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={
                  <Login />
              } />
              <Route path="/register" element={
                  <Register />
              } />
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}