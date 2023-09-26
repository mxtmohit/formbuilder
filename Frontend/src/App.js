import style from "./App.module.css";
import COmp from "./COmp";
import Authpage from "./Pages/AuthPage/Authpage";
import Radiobuttons from "./Pages/Formdesign/Formelements/Radiobuttons";
import Formpage from "./Pages/Formdesign/Formpage";
import UserFormpage from "./Pages/UserForm/UserFormPage/UserFormpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import ResponsePage from './Pages/Formdesign/Formelements/Responsepage/ResponsePage';
import ResponseForm from "./Pages/Formdesign/Formelements/Responsepage/ResponseForm";
import ResponsePage from "./Pages/Dashboard/DashboarComponent/AllResponsePage/ResponsePage";
import ResponseListPage from "./Pages/Dashboard/DashboarComponent/AllResponsePage/ResponseListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Authpage />} />

        <Route
          path={`/dashboard/viewresponses/:formid/viewform/:responseid`}
          element={<UserFormpage />}
        />
        <Route
          path={`/dashboard/editviewform/:formid`}
          element={
            <Formpage
            // qnArraymain1={qnArraymain1}
            // titleobj1={titleobj1}
            // formids={formid}
            />
          }
        />
        <Route
          path={`/dashboard/viewresponses/:formid`}
          element={<ResponseListPage />}
        />
        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route
          path={`/dashboard/editviewform/:formid`}
          element={<Formpage />}
        />
        <Route path="/dashboard/createform" element={<Formpage />} />
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/form/:formid" element={<UserFormpage />} />
        {/* <Radiobuttons/> */}
        {/* <COmp /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
