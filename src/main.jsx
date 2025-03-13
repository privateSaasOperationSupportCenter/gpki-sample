import './index.css'
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from './Layout.jsx';
import App from './App.jsx'
import { AuthProvider } from './contexts/auth';
import OAuth2Callback from './pages/OAuth2Callback.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="oauth2/callback" element={<OAuth2Callback />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
)
