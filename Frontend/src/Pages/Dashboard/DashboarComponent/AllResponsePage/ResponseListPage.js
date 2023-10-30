import { useEffect, useState } from "react";
import s from "./ResponsePage.module.css";
import axios from "axios";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ResponseForm from "../../../Formdesign/Formelements/Responsepage/ResponseForm";
import Formpage from "../../../Formdesign/Formpage";
import UserFormpage from "../../../UserForm/UserFormPage/UserFormpage";

const ResponseListPage = () => {
  const [responderList, setResponderList] = useState([]);
  
  // const navigate=useNavigate()
  // navigate.replace("/dashboard")

  const responseListState=useLocation().state
   

  const { token } = useSelector((state) => state.userSlice);

  const {formid}=useParams()

  //window.history.popState()

  
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const res = await axios.get(
  //     `http://localhost:5000/form/${formid}`,
  //     config
  //   );

  const fetchResponses = async () => {
    try {
      const res = await axios.get(
        `/getresponse/${formid}`,
        config
      );
      if (res.status == 200) {
        setResponderList(res.data.allresponses);
      }
    } catch (e) {
     
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <>
      <div className={s.main}>
        <div className={s.wrapper}>
         
          {responderList.map((item) => {

            const date = new Date(item.submittedAt);
            return(
            <>
              <Link
                key={item._id}
                to={`/dashboard/viewresponses/${formid}/viewform/${item._id}`} state={{response:item.response}}
              >
                {item.user}<br/>
                {date.toLocaleString('en-IN')}
              </Link>
            </>)
})}
        </div>
      </div>
{/*  */}
    </>
  );
};

export default ResponseListPage;
