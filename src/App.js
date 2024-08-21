import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Form from './Components/forms/Form';
import LoginForm from './Components/forms/LoginForm';
import PreviewPage from './Components/PreviewPage';
import PrivateCompoenent from './Components/PrivateComponents';

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
            <Route path='/preview' element={<PreviewPage />} />
            <Route path="/form" element={<Form />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
