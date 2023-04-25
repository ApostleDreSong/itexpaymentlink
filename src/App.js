import logo from './logo.svg';
import './App.css';
import LinkRefComponent from './LinkRefComponent';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/:linkref",
    element: (
      <LinkRefComponent />
    ),
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
