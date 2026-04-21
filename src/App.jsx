import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./Pages/Home'))
const Bangles = lazy(() => import('./Pages/Bangles'))
const Bracelets = lazy(() => import('./Pages/Bracelets'))
const Earrings = lazy(() => import('./Pages/Earrings'))
const Necklace = lazy(() => import('./Pages/Necklace'))
const Pendant = lazy(() => import('./Pages/Pendant'))
const Rings = lazy(() => import('./Pages/Rings'))
const SignIn = lazy(() => import('./Pages/SignIn'))
const SignUp = lazy(() => import('./Pages/SignUp'))
const Cart = lazy(() => import('./Pages/Cart'))
const DeliveryAddress = lazy(() => import('./Pages/NavbarPages/DeliveryAddress'))
const Payment = lazy(() => import('./Pages/NavbarPages/Payment'))
const Accounts = lazy(() => import('./Pages/NavbarPages/Accounts'))
const Help = lazy(() => import('./Pages/NavbarPages/Help'))
const MyOrders = lazy(() => import('./Pages/NavbarPages/MyOrders'))
const Settings = lazy(() => import('./Pages/NavbarPages/Settings'))
const ProductOverview = lazy(() => import('./Pages/ProductOverview'))
const ProductDetail = lazy(() => import('./Pages/ProductDetail'))
const OrderSuccess = lazy(() => import('./Pages/OrderSuccess'))

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {


  return (
    <>
    <div className='min-h-screen'
    style={{
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #000000 0%, #1a0a00 20%, #5C2E00 45%, #A0521A 70%, #D4873A 100%)"
  }}>
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
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
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
