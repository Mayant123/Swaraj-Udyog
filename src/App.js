import { Route, Routes } from "react-router-dom";
import './App.css';
import AdminManagement from './Components/AdminManagement';
import Header from './Components/Header';
import Home from './Components/Home';
import PreviewPage from './Components/PreviewPage';
import PrivateCompoenent from './Components/PrivateComponents';
import LoginForm from './Components/forms/LoginForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="main">
        <Routes>
          <Route element={<PrivateCompoenent/>}>
            <Route path="/" element={<Home />} />
            <Route path='/preview' element={<PreviewPage/>} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin-management" element={<AdminManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
