import Home from './components/jsx/Home';
import Prepare from './components/jsx/create/addPrep';
import Hotline from './components/jsx/create/hotline';
import InternationalNews from './components/jsx/create/intnews';
import LocalNews from './components/jsx/create/localnews';
// import Login from './components/jsx/login';
import NationalNews from './components/jsx/create/natnews';
// import Signin from './components/jsx/signup';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from './components/jsx/Navigation';
import News from './components/jsx/News';
import Preparation from './components/jsx/Preparation';
import Admin from './components/jsx/Admin';
import About from './components/jsx/About';
import Footer from './components/jsx/footer';

function App() {
  return (
    <>
    <Navigation/>
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotline" element={<Hotline />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/preparation" element={<Preparation />} />
        <Route path="/news" element={<News />} />
        <Route path="/local" element={<LocalNews />} />
        <Route path="/national" element={<NationalNews />} />
        <Route path="/international" element={<InternationalNews />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
