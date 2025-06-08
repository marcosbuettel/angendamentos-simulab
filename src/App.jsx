import './App.css';
import Calendar from './components/Calendar/Calendar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Home />
      {/* <button onClick={() => enviarDadoMockado()}>TESTAR</button> */}
      {/* <Calendar /> */}
      {/* <Login /> */}
    </>
  );
}

export default App;
