import { ClipboardList, FilePlus } from "lucide-react"
import { Link } from "react-router-dom"

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <h1 className="text-3xl font-bold text-sky-700 mb-4">Welcome to Party Forms!</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Easily create, and submit dynamic forms. Get started by creating a new form or submitting one you've received.
      </p>

      <div className="flex space-x-6">
        <Link
          to="/create-form"
          className="flex items-center space-x-2 px-5 py-3 bg-sky-700 text-white rounded-xl hover:bg-sky-800 transition"
        >
          <FilePlus className="w-5 h-5" />
          <span>Create Form</span>
        </Link>

        <Link
          to="/submit-form"
          className="flex items-center space-x-2 px-5 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
        >
          <ClipboardList className="w-5 h-5" />
          <span>Submit Form</span>
        </Link>
      </div>
    </div>
  )
}