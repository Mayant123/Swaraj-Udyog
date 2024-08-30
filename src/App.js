import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import LoginForm from './Components/forms/LoginForm';
import PreviewPage from './Components/PreviewPage';
import PrivateCompoenent from './Components/PrivateComponents';
import AdminManagement from './Components/AdminManagement';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInEmail= user.email;
  console.log(loggedInEmail);
  
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="main">
        <Routes>
          <Route element={<PrivateCompoenent/>}>
            <Route path="/" element={<Home />} />
            <Route path='/preview' element={<PreviewPage loggedInEmail={loggedInEmail}/>} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin-management" element={<AdminManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
