import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing/LandingPage';
import PatientRegistration from './pages/PatientRegistration/PatientRegistrationPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<PatientRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
