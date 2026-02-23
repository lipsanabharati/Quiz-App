import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Quiz from "./pages/QuizPage";
import Result from "./pages/Result";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* This is the 'Home' page */}
        <Route path="/" element={<Landing />} />
        
        {/* These match the URLs you used in your <Link> tags */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        <Route path="/quiz/:id" element={<Quiz />} />

        <Route path="/result" element={<Result />} />
        
        {/* Helpful: shows if a user types a wrong URL */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;