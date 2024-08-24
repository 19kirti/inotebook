import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {

  const[alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert({msg: message})

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }


  return (
    <>
    <NoteState>
    <Router>
    <NavBar/>
    <Alert alert={alert}/>
    <div class = "container">
      <Routes>
        
        <Route exact path="/" element={<Home showAlert={showAlert} />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<LogIn showAlert={showAlert} />} />
        <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />


      </Routes>
      </div>

    </Router>
    </NoteState>

   </>

  );
}

export default App;
