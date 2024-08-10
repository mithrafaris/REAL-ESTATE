
import { Link } from 'react-router-dom';


const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-md text-center animate__animated animate__pulse infinite">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      </div>
    </div>
  );
};

export default PageNotFound;
