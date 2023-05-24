import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "./styles/app.scss"
import "./styles/header.scss"
import "./styles/home.scss"
import "./styles/Founder.scss"
import "./styles/Menu.scss"
import "./styles/footer.scss"
import "./styles/footer.scss"
import "./styles/contact.scss"
import "./styles/cart.scss"
import "./styles/shipping.scss"
import "./styles/confirmOrder.scss"
import "./styles/paymentSuccess.scss"
import "./styles/login.scss"
import "./styles/profile.scss"
import "./styles/Myorders.scss"
import "./styles/OrdersDetail.scss"
import "./styles/Dashboard.scss"
import "./styles/about.scss"


import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Home from "./components/home/Home"
import Contact from "./components/contact/Contact"
import Cart from "./components/cart/cart"
import Shipping from "./components/cart/shipping"
import ConfirmOrder from "./components/cart/confirmOrder"
import PaymentSuccess from "./components/cart/paymentSuccess"
import Login from "./components/login/login"
import Profile from "./components/profile/profile"
import MyOrders from "./components/myOrders/myOrders"
import OrderDetails from "./components/myOrders/OrderDetails"
import Dashboard from "./components/admin/Dashboard"
import Users from "./components/admin/users"
import Orders from "./components/admin/orders"
import About from "./components/about/about"
import NotFound from "./components/layout/NotFound"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/user";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";
function App() {
  const dispatch = useDispatch();
  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);



  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/me" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirmOrder" element={<ConfirmOrder />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirectAdmin="/me"
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/orders" element={<Orders />} />
        </Route>
        
        
        
        

        <Route path="*" element={<NotFound />} />


      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
