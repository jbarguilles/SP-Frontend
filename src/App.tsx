import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing/LandingPage';
import { ProfileForm } from './pages/PatientRegistration/PatientRegistrationPage';
import { PatientRecordForm } from './pages/PatientRecord/PatientRecordPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/patient-registration" element={<ProfileForm />} />
        <Route path="/patient-record" element={<PatientRecordForm />} />
      </Routes>
    </Router>
  );
}

export default App;
