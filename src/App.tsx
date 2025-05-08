import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TrainingPage from './pages/TrainingPage';
import MembershipPage from './pages/MembershipPage';
import Login from './pages/Login';
import ResourcesPage from './pages/ResourcesPage';
import GalleryPage from './pages/GalleryPage';
import FindSpecialistPage from './pages/FindSpecialistPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import RenewMembershipPage from './pages/RenewMembershipPage';
import JoinDirectory from './pages/JoinDirectoryForm';
import MemberPortal from './components/portal/memberportal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="training" element={<TrainingPage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path="login" element={<Login />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="find-specialist" element={<FindSpecialistPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="renew-membership" element={<RenewMembershipPage />} />
        <Route path="join-directory" element={<JoinDirectory />} />

        <Route path="member-portal" element={<MemberPortal />} />


      </Route>
    </Routes>
  );
}

export default App;