import './App.css';
import './App.styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import OutLoginLayout from './layouts/out-login/out-login';
import InLoginLayout from './layouts/in-login/in-login';
import General from './pages/general/general';
import { AnimatePresence } from 'framer-motion';
import Book from './pages/book/book';
import Register from './layouts/register/Register';
import PrivateAdminRoutes from './components/PrivateAdminRoutes'
import UserActive from './pages/user/userActive';
import UserBlock from './pages/user/userBlock';
import Staff from './pages/staff/staff';
import History from './pages/history/history';
import Profile from './pages/profile/profile';
import UploadBook from './pages/book/uploadBook';
import Author from './pages/author/author';
import Category from './pages/category/category';
import Publisher from './pages/publisher/publisher';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './layouts/forgot-password/forgot-password';
import ResetPasswordFail from './components/resetPassword/resetPasswordFail';
import ResetPassword from './components/resetPassword/resetPassword';
import ResetPasswordSuccess from './components/resetPassword/resetPasswordSuccess';
import Order from './pages/order/order';

function App() {
  
  return (
    <div className="App">
      <AnimatePresence>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<InLoginLayout />} path="/management" >
                <Route element={<General />} path="/management" />
                <Route element={<Book />} path="/management/book" />
                <Route element={<UploadBook />} path="/management/add-book" />
                <Route element={<Author />} path="/management/author" />
                <Route element={<Publisher />} path="/management/publisher" />
                <Route element={<Category />} path="/management/category" />
                <Route element={<Order />} path="/management/orders" />
                <Route element={<UserActive />} path="/management/user-active" />
                <Route element={<UserBlock />} path="/management/user-block" />
                <Route element={<Staff />} path="/management/staff" />
                <Route element={<History />} path="/management/history" />
                <Route element={<Profile />} path="/management/profile" />
                <Route element={<ChangePassword />} path="/management/changepassword" />
              </Route>
            </Route>
            <Route element={<OutLoginLayout />} path="/" />
            <Route element={<ForgotPassword />} path="/forgot-info"/>
            <Route element={<ResetPassword />} path="/forgot-password"/>
            <Route element={<ResetPasswordSuccess />} path="/forgot-password/newpass"/>
          </Routes>
        </Router>
      </AnimatePresence>
    </div>
  );
}

export default App;
