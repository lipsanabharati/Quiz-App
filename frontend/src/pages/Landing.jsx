import { Link } from 'react-router-dom';

function Landing() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
            <header className="p-6">
                <nav className="flex justify-end gap-4">
                    <Link to='/login' className='px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition'>
                        Login
                    </Link>
                    <Link to='/signup' className='px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition'>
                        Sign Up
                    </Link>
                </nav>
            </header>

            <section className="text-center px-4">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-2">Welcome to Quiz System...</h1>
                <h1 className="text-4xl font-bold text-indigo-600 mb-6">Test Your Knowledge...</h1>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Challenge yourself with our quizzes and see how much you know!
                </p>
            </section>

            <footer className="p-8 text-center text-gray-400 border-t border-gray-100">
                &copy; 2026 Quiz System
            </footer>
        </main>
    );
}

export default Landing;