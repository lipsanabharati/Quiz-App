import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg,setMsg]=useState("");

    const navigate = useNavigate();


    const handleSubmit = async(e) => {
      e.preventDefault(); //always at first

       if(!username||!email||!password)
       {
            setMsg("Please fill all the fields.");
            return; //stop further execution
       }
       

       try{
        const response=await axios.post(
            "http://localhost:5000/api/auth/register",
            {
                username:username,
                email:email,
                password_hash:password
            }
        );//all key value pairs must match with the database name

        console.log(response.data);

        //redirect after success
        navigate("/login");
       }
       catch(error)
       {
        //this block catches any error that axios may send
        console.log(error);

        //axios has an object .response which gets any error data from the server
        if(error.response)
        {
            alert(error.response.data.message);
        }
        else
        {
            alert("Server Error");
        }
       }
    };

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col justify-between font-sans">
            <header className="p-6">
                <nav className="flex justify-end">
                    <Link to='/login' className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition">
                        Login
                    </Link>
                </nav>
            </header>

            <section className="flex flex-col items-center px-4">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Please enter your details to sign up...
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="uname" className="text-sm font-semibold text-gray-600">Username:</label>
                            <input 
                                type="text" 
                                id='uname' 
                                name='uname'
                                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email:</label>
                            <input 
                                type="email" 
                                id='email' 
                                name='email' 
                                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password:</label>
                            <input 
                                type="password" 
                                id='password' 
                                name='password' 
                                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        <button 
                            type='submit' 
                            className="mt-2 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </section>

            {msg && <p style={{ color: "red" }}>{msg}</p>}

            <footer className="p-8 text-center text-gray-400">
                &copy; 2026 Quiz System
            </footer>
        </main>
    );
}

export default Signup;