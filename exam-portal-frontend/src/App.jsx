import { Routes, Route } from "react-router-dom";

import Home from "./pages/auth/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TrueFalseQuestions from "./pages/admin/TrueFalseQuestions";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Questions from "./pages/admin/Questions";
import Quizzes from "./pages/admin/Quizzes";
import Results from "./pages/admin/Results";
import AdminFeedback from "./pages/admin/Feedback";
import StudentFeedback from "./pages/user/Feedback";
import UserDashboard from "./pages/user/Dashboard";
import Quiz from "./pages/user/Quiz";
import UserResults from "./pages/user/Results";
import Leaderboard from "./pages/user/Leaderboard";
import Resources from "./pages/user/Resources";
import Attendance from "./pages/user/Attendance";
import CodingProblems from "./pages/admin/CodingProblems";
import CodingExam from "./pages/user/CodingExam";
import CodingSubmissions from "./pages/admin/CodingSubmissions";
import TrueFalseExam from "./pages/user/TrueFalseExam";
import TrueFalseSubmissions from "./pages/admin/TrueFalseSubmissions";
import TrueFalseResults from "./pages/user/TrueFalseResults";
import CodingResults from "./pages/user/CodingResults";
import Grades from "./pages/user/Grades";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
  path="/profile"
  element={<Profile />}
/>
      <Route
  path="/user/grades"
  element={<Grades />}
/>
      <Route
  path="/user/true-false-results"
  element={<TrueFalseResults />}
/>
<Route
  path="/user/coding-results"
  element={<CodingResults />}
/>
      <Route
  path="/admin/true-false-submissions"
  element={<TrueFalseSubmissions />}
/>
      <Route path="/register" element={<Register />} />
      <Route path="/user/coding"element={<CodingExam />}/>
      <Route path="/admin/coding-submissions"element={<CodingSubmissions />}/>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/categories" element={<Categories />} />
      <Route path="/admin/questions" element={<Questions />} />
      <Route path="/admin/quizzes" element={<Quizzes />} />
      <Route path="/admin/results" element={<Results />} />
      <Route
  path="/user/true-false-exam"
  element={<TrueFalseExam />}
/>
      <Route
  path="/admin/true-false"
  element={<TrueFalseQuestions />}
/>
      <Route
  path="/admin/coding"
  element={<CodingProblems />}
/>
     <Route
  path="/admin/feedback"
  element={<AdminFeedback />}
/>

<Route
  path="/user/feedback"
  element={<StudentFeedback />}
/>

      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/quiz" element={<Quiz />} />
      <Route path="/user/results" element={<UserResults />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/user/resources" element={<Resources />} />
      <Route path="/user/attendance" element={<Attendance />} />
    </Routes>
  );
}

export default App;