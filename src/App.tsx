import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Rent from "./pages/Rent";
import Land from "./pages/Land";
import PropertyDetail from "./pages/PropertyDetail";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import LoginPage from "./admin/LoginPage";
import AdminRoute from "./admin/AdminRoute";
import Dashboard from "./admin/pages/Dashboard";
import AdminProperties from "./admin/pages/AdminProperties";
import AdminBanners from "./admin/pages/AdminBanners";
import AdminTestimonials from "./admin/pages/AdminTestimonials";
import AdminAdvantages from "./admin/pages/AdminAdvantages";
import AdminEnquiries from "./admin/pages/AdminEnquiries";
import AdminSellEnquiries from "./admin/pages/AdminSellEnquiries";
import AdminVisitors from "./admin/pages/AdminVisitors";
import AdminSettings from "./admin/pages/AdminSettings";
import { usePageTracker } from "./hooks/usePageTracker";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTracker() {
  usePageTracker();
  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <ScrollToTop />
        <PageTracker />
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <AdminRoute>
                <AdminProperties />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <AdminRoute>
                <AdminBanners />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <AdminRoute>
                <AdminTestimonials />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/advantages"
            element={
              <AdminRoute>
                <AdminAdvantages />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <AdminRoute>
                <AdminEnquiries />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/sell-enquiries"
            element={
              <AdminRoute>
                <AdminSellEnquiries />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/visitors"
            element={
              <AdminRoute>
                <AdminVisitors />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/properties"
            element={
              <PublicLayout>
                <Properties />
              </PublicLayout>
            }
          />
          <Route
            path="/properties/:id"
            element={
              <PublicLayout>
                <PropertyDetail />
              </PublicLayout>
            }
          />
          <Route
            path="/land"
            element={
              <PublicLayout>
                <Land />
              </PublicLayout>
            }
          />
          <Route
            path="/rent"
            element={
              <PublicLayout>
                <Rent />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PublicLayout>
                <PrivacyPolicy />
              </PublicLayout>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <PublicLayout>
                <TermsConditions />
              </PublicLayout>
            }
          />
          <Route
            path="*"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
