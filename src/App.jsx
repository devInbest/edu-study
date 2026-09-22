import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import SiteShell from '@/components/layout/SiteShell/SiteShell';
import { getCollegeBySlug } from '@/data/colleges';
import { getCourseBySlug } from '@/data/courses';
import MantineProvider from '@/providers/MantineProvider';

import AboutPage from './app/about/page';
import CollegesPage from './app/colleges/page';
import ContactPage from './app/contact/page';
import CoursePageView from './app/courses/CoursePageView';
import HomePage from './app/page';
import PrivacyPage from './app/privacy/page';
import ServicesPage from './app/services/page';
import TermsPage from './app/terms/page';
import CollegeDetail from './components/colleges/CollegeDetail/CollegeDetail';

function CollegeDetailRoute() {
  const { slug } = useParams();
  const college = getCollegeBySlug(slug);
  if (!college) {
    return <Navigate to="/colleges" replace />;
  }
  return <CollegeDetail college={college} />;
}

function CourseDetailRoute() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  if (!course) {
    return <Navigate to="/colleges" replace />;
  }
  return <CoursePageView course={course} />;
}

function NotFoundPage() {
  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go home</a>
    </div>
  );
}

export default function App() {
  return (
    <MantineProvider>
      <SiteShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/colleges/:slug" element={<CollegeDetailRoute />} />
          <Route path="/courses/mbbs-md-ms" element={<Navigate to="/courses/mbbs" replace />} />
          <Route path="/courses/:slug" element={<CourseDetailRoute />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteShell>
    </MantineProvider>
  );
}
