import logo from './logo.svg';
import './App.css';
import LinkRefComponent from './LinkRefComponent';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InvoiceRefComponent from './Invoices/InvoiceRefComponent';

const router = createBrowserRouter([
	{
		path: '/link/:linkref',
		element: <LinkRefComponent />,
	},
	{
		path: '/invoice/:invoiceref',
		element: <InvoiceRefComponent />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
