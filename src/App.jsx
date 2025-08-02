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
import { useDispatch } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";

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
  const fetchAccount = async () => {
    const response = await handleFetchAccount();
    console.log(response);
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
      errorElement: <div>404 Not Found</div>,
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
      <RouterProvider router={router} />
    </>
  );
}
