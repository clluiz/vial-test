import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
        <p className="text-md text-gray-500 mt-2">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-4 inline-block text-lg text-blue-500 hover:text-blue-700">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
