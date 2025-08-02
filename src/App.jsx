import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import Header from "./components/header";
import Footer from "./components/footer";
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import { useEffect } from "react";
import { handleFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/loading";
import NotFound from "./components/notfound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/protectedroute";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const fetchAccount = async () => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      return;
    }
    const response = await handleFetchAccount();
    if (response?.data) {
      dispatch(doGetAccountAction(response.data));
    }
  }
  useEffect(() => {
    fetchAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'contact',
          element: <ContactPage />
        },
        {
          path: 'book',
          element: <BookPage />
        }
      ]
    },
    {
      path: 'admin',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      ]
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />
    }
  ]);

  return (
    <>
      {
        isAuthenticated === true || window.location.pathname === '/login' || window.location.pathname === '/register' ?
          <RouterProvider router={router} />
          :
          <Loading />
      }
    </>
  );
}
