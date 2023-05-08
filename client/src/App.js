import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import CartMenu from "./scenes/global/CartMenu";
import axios from "axios";
import Form4 from "./scenes/login2";
import Calendar from "./scenes/calendar/calendar";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8880/login");
        if (response.data.loggedIn === false) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="app">
      {!isLoginPage &&<Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Form4 />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      {!isLoginPage &&<CartMenu />}
      {!isLoginPage &&<Footer />}
    </div>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Router;
