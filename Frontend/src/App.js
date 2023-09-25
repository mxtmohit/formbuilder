
import style from'./App.module.css';
import COmp from './COmp';
import Authpage from "./Pages/AuthPage/Authpage"
import Radiobuttons from './Pages/Formdesign/Formelements/Radiobuttons';
import Formpage from './Pages/Formdesign/Formpage';
import UserFormpage from './Pages/UserForm/UserFormPage/UserFormpage'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/createform" element={<Formpage />} />
        <Route path="/auth" element={<Authpage />} />

        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route path="/dashboard/form/:formid" element={<UserFormpage />}/>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/form/:formid" element={<UserFormpage />} />
        {/* <Radiobuttons/> */}
        {/* <COmp /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
