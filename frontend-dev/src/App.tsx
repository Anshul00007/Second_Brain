import './App.css';
import Landingpage from './Page/Landingpage';
import Signup from './Page/signup';
import Signin from './Page/signin';
import Dashboard from './Page/dashboard';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
	    <Routes>
        <Route index element={< Landingpage/>} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Signin" element={<Signin />} />
        <Route path="Dashboard" element={<Dashboard/>} />
        <Route path="*" element={<Landingpage />} />
      </Routes>
    </BrowserRouter>

      


  
    </div>
  );
}

export default App;
