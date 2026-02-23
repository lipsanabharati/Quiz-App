import { Link } from 'react-router-dom';
import QuizCard from '../components/quizCard';
import { useState,useEffect } from 'react';
import axios from "axios";

function Home() {
     const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/quiz/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(res.data); // see structure
        setQuizzes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();
  }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-sm p-4">
                <nav className="max-w-5xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-indigo-600">QuizSystem</h1>
                    <div className="flex gap-4">
                        <Link to='/login' className='text-gray-600 hover:text-indigo-600 font-medium transition'>Login</Link>
                        <Link to='/signup' className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition'>Sign Up</Link>
                    </div>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto p-8">
                <section className="mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-800">Welcome, user!</h2>
                    <p className="text-gray-600 mt-2">This is your main dashboard page. Ready to take a quiz?</p>
                </section>

                <section>
                 <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-2">Available Quizzes</h3>

                 {quizzes.map((quiz) => (
                        <QuizCard
                        key={quiz.quiz_id}
                        title={quiz.title}
                        category={quiz.category}
                        time={`${quiz.time_limit} seconds`}
                        link={`/quiz/${quiz.quiz_id}`}
                        />
                    ))}
                    
                    
                </section>

                <footer className="mt-20 py-8 text-center text-gray-400 border-t border-gray-100">
                    &copy; 2026 QuizSystem
                </footer>
            </main>
        </div>
    );
}

export default Home;