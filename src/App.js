import logo from './logo.svg';
import './App.css';
import LinkRefComponent from './LinkRefComponent';
import InvoiceRefComponent from './InvoiceRefComponent';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/link/:linkref",
    element: (
      <LinkRefComponent />
    )
  },
  {
    path: "/invoice/:invoiceref",
    element: (
      <InvoiceRefComponent />
    )
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
