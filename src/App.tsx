import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/store/authStore';
import DemoModeBanner from '@/components/DemoModeBanner';
import ArtisanLayout from '@/components/layout/ArtisanLayout';
import BuyerLayout from '@/components/layout/BuyerLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import FloatingAIChat from '@/components/FloatingAIChat';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import PlaceholderPage from '@/components/PlaceholderPage';

// ─── Real page imports ─────────────────────────────────────────────────────────
import ArtisanDashboard from '@/pages/artisan/Dashboard';
import AIImageStudio from '@/pages/artisan/AIImageStudio';
import VoiceCatalog from '@/pages/artisan/VoiceCatalog';
import PricingAssistant from '@/pages/artisan/PricingAssistant';
import FindBuyers from '@/pages/artisan/FindBuyers';
import BuyerEnquiries from '@/pages/artisan/BuyerEnquiries';
import GrowthEngine from '@/pages/artisan/GrowthEngine';
import DigitalCraftIdentity from '@/pages/artisan/DigitalCraftIdentity';
import AIBusinessManager from '@/pages/artisan/AIBusinessManager';
import BuyerDashboard from '@/pages/buyer/Dashboard';
import PostRequirement from '@/pages/buyer/PostRequirement';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminAnalytics from '@/pages/admin/Analytics';
import MarketIntelligence from '@/pages/admin/MarketIntelligence';

// ─── Protected Route ───────────────────────────────────────────────────────────
interface ProtectedRouteProps { children: React.ReactNode; requiredRole: UserRole; redirectTo?: string; }
function ProtectedRoute({ children, requiredRole, redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (user?.role !== requiredRole) {
    const roleHome: Record<UserRole, string> = { artisan: '/artisan/dashboard', buyer: '/buyer/dashboard', admin: '/admin/dashboard' };
    return <Navigate to={roleHome[user!.role]} replace />;
  }
  return <>{children}</>;
}

// ─── Placeholder pages for non-critical routes ────────────────────────────────
const AddProduct = () => <AIImageStudio />;
const MyProducts = () => (
  <div className="p-6 max-w-4xl space-y-4">
    <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[{name:'Bamboo Storage Basket Set',cat:'Bamboo Craft',price:'₹2,800',img:'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=300'},{name:'Handwoven Cotton Saree',cat:'Handloom',price:'₹3,200',img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300'},{name:'Block Print Bedsheet',cat:'Block Print',price:'₹2,200',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300'}].map(p=>(
        <div key={p.name} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
          <div className="p-4"><h3 className="font-bold text-gray-900 text-sm">{p.name}</h3><p className="text-xs text-gray-500">{p.cat}</p><p className="font-black text-orange-600 mt-1">{p.price}</p></div>
        </div>
      ))}
    </div>
  </div>
);
const Orders = () => <PlaceholderPage title="Orders" description="Track all orders, shipment status, payment collection, and buyer communication." icon="🛒" color="orange" />;
const ArtisanProfile = () => <DigitalCraftIdentity />;
const MatchArtisans = () => <PostRequirement />;
const BuyerEnquiriesPage = () => <PlaceholderPage title="My Enquiries" description="Track all enquiries sent to artisans, view responses, negotiate terms, and confirm bulk orders." icon="📨" color="indigo" />;
const AdminLogin = () => <Navigate to="/login" replace />;
const ArtisanManagement = () => <PlaceholderPage title="Artisan Management" description="Verify, onboard, and manage artisans: KYC status, craft certification, GI tags, and performance reports." icon="👥" badge="Simulated Data" color="gray" />;
const AdminProducts = () => <PlaceholderPage title="Products" description="Browse, moderate, and curate all product listings across the platform." icon="📦" badge="Simulated Data" color="gray" />;

// ─── Artisan FloatingChat wrapper ──────────────────────────────────────────────
function ArtisanRouteWrapper({ children }: { children: React.ReactNode }) {
  return (<>{children}<FloatingAIChat /></>);
}

// ─── App Shell ─────────────────────────────────────────────────────────────────
function AppShell() {
  const location = useLocation();
  const showBanner = !location.pathname.startsWith('/admin');
  return (
    <div className="flex flex-col min-h-screen">
      {showBanner && <DemoModeBanner />}
      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Artisan */}
          <Route path="/artisan" element={<ProtectedRoute requiredRole="artisan"><ArtisanRouteWrapper><ArtisanLayout /></ArtisanRouteWrapper></ProtectedRoute>}>
            <Route path="dashboard" element={<ArtisanDashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="my-products" element={<MyProducts />} />
            <Route path="ai-image-studio" element={<AIImageStudio />} />
            <Route path="voice-catalog" element={<VoiceCatalog />} />
            <Route path="pricing" element={<PricingAssistant />} />
            <Route path="find-buyers" element={<FindBuyers />} />
            <Route path="enquiries" element={<BuyerEnquiries />} />
            <Route path="growth-engine" element={<GrowthEngine />} />
            <Route path="craft-identity" element={<DigitalCraftIdentity />} />
            <Route path="ai-manager" element={<AIBusinessManager />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<ArtisanProfile />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Buyer */}
          <Route path="/buyer" element={<ProtectedRoute requiredRole="buyer"><BuyerLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<BuyerDashboard />} />
            <Route path="post-requirement" element={<PostRequirement />} />
            <Route path="match-artisans" element={<MatchArtisans />} />
            <Route path="enquiries" element={<BuyerEnquiriesPage />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin" redirectTo="/admin/login"><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="market-intelligence" element={<MarketIntelligence />} />
            <Route path="artisans" element={<ArtisanManagement />} />
            <Route path="products" element={<AdminProducts />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (<BrowserRouter><AppShell /></BrowserRouter>);
}
