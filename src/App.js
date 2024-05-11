import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import JobPostPage from './pages/JobPostPage/JobPostPage';
import { ToastContainer} from 'react-toastify';
import HomePage from './pages/HomePage/HomePage';
import JobDescriptionPage from './pages/JobDescriptionPage/JobDescriptionPage';
import ProtectRoute from './component/ProtectRoute';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/create-job" element={<ProtectRoute Component={JobPostPage}/>}></Route>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/job-description/:id" element={<JobDescriptionPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
