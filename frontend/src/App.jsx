import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import PrincipalMessage from './pages/PrincipalMessage';
import Programs from './pages/Programs';
import FeeStructure from './pages/FeeStructure';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Scholarships from './pages/Scholarships';
import Faculty from './pages/Faculty';

import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageGallery from './admin/ManageGallery';
import ManageActivities from './admin/ManageActivities';
import ManageAnnouncements from './admin/ManageAnnouncements';
import ManagePrincipalMessage from './admin/ManagePrincipalMessage';
import ManageFees from './admin/ManageFees';
import ManagePrograms from './admin/ManagePrograms';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/principal" element={<PrincipalMessage />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/fees" element={<FeeStructure />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="activities" element={<ManageActivities />} />
              <Route path="announcements" element={<ManageAnnouncements />} />
              <Route path="principal-message" element={<ManagePrincipalMessage />} />
              <Route path="fees" element={<ManageFees />} />
              <Route path="programs" element={<ManagePrograms />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
