import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );
    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        return;
      }
      throw error;
    }
  });

const Home = lazyWithRetry(() => import('./Pages/Home'))
const Bangles = lazyWithRetry(() => import('./Pages/Bangles'))
const Bracelets = lazyWithRetry(() => import('./Pages/Bracelets'))
const Earrings = lazyWithRetry(() => import('./Pages/Earrings'))
const Necklace = lazyWithRetry(() => import('./Pages/Necklace'))
const Pendant = lazyWithRetry(() => import('./Pages/Pendant'))
const Rings = lazyWithRetry(() => import('./Pages/Rings'))
const Sets = lazyWithRetry(() => import('./Pages/Sets'))
const SignIn = lazyWithRetry(() => import('./Pages/SignIn'))
const SignUp = lazyWithRetry(() => import('./Pages/SignUp'))
const ForgotPassword = lazyWithRetry(() => import('./Pages/ForgotPassword'))
const Cart = lazyWithRetry(() => import('./Pages/Cart'))
const DeliveryAddress = lazyWithRetry(() => import('./Pages/NavbarPages/DeliveryAddress'))
const Payment = lazyWithRetry(() => import('./Pages/NavbarPages/Payment'))
const Accounts = lazyWithRetry(() => import('./Pages/NavbarPages/Accounts'))
const Help = lazyWithRetry(() => import('./Pages/NavbarPages/Help'))
const MyOrders = lazyWithRetry(() => import('./Pages/NavbarPages/MyOrders'))
const Settings = lazyWithRetry(() => import('./Pages/NavbarPages/Settings'))
const ProductOverview = lazyWithRetry(() => import('./Pages/ProductOverview'))
const ProductDetail = lazyWithRetry(() => import('./Pages/ProductDetail'))
const OrderSuccess = lazyWithRetry(() => import('./Pages/OrderSuccess'))

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {


  return (
    <>
    <div className='min-h-screen bg-linear-to-b from-black via-[#A0521A] to-black'
  >
    <Navbar />
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductOverview />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/bangles" element={<Bangles />} />
      <Route path="/bracelets" element={<Bracelets />} />
      <Route path="/earrings" element={<Earrings />} />
      <Route path="/necklaces" element={<Necklace />} />
      <Route path="/pendants" element={<Pendant />} />
      <Route path="/rings" element={<Rings />} />
      <Route path="/sets" element={<Sets />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/delivery-address" element={<DeliveryAddress />} />
      <Route path="/payment-methods" element={<Payment />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/help" element={<Help />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
    </Suspense>
    <Footer />
    </div>
    </>
  )
}

export default App
