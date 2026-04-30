import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BecomePartner from "./pages/BecomePartner";
import AdminPanel from "./pages/AdminPanel";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

const AppRoutes = () => (
  <>
    <Route index element={<Home />} />
    <Route path="cars" element={<Cars />} />
    <Route path="become-partner" element={<BecomePartner />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route path="admin" element={<AdminPanel />} />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/en">
              {AppRoutes()}
            </Route>
            <Route path="/">
              {AppRoutes()}
            </Route>
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
