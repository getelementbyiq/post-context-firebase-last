import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./components/Root/ProtectedRoute";
import Signup from "./components/SignUp";
import Main from "./components/Main";
import MainLayout from "./components/MainLayout";
import SignIn from "./components/SignIn/";
import { Provider } from "react-redux";
import store from "./components/Redux/store";
import SearchPage from "./components/components/SearchPage";

const Root = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<SignIn />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="main"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Root} />;
    </Provider>
  );
}

export default App;
