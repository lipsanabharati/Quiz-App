import { Link } from "react-router-dom";

function QuizCard({ title, category, time, link }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition max-w-sm">
      
      {/* Title */}
      <h4 className="text-lg font-bold text-gray-800 mb-4">
        {title}
      </h4>

      {/* Details */}
      <ul className="text-sm text-gray-600 space-y-2 mb-6">

        <li className="flex justify-between">
          <span className="font-semibold text-gray-500">Category:</span>
          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold uppercase">
            {category}
          </span>
        </li>

        <li className="flex justify-between">
          <span className="font-semibold text-gray-500">Time Limit:</span>
          <span>{time}</span>
        </li>

      </ul>

      {/* Button */}
      <Link
        to={link}
        className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
      >
        Start Quiz
      </Link>

    </div>
  );
}

export default QuizCard;