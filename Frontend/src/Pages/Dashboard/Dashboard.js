import React, { useEffect, useState, useRef } from "react";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Snapshot from "./DashboarComponent/UserFormPage/Snapshot";
import { NavLink } from "react-router-dom";


const Dashboard = () => {
  const [formsArray, setFormsArray] = useState([]);
  const [cardDataArray, setCardDataArray] = useState([{}]);
  const [screenshot, setScreenshot] = useState();
  const { token, email } = useSelector((state) => state.userSlice);

  const targetRef = useRef(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };



  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/getforms/?user=${email}`,
          config
        );

        setFormsArray(res.data.forms);
        console.log(res.data);
      } catch (e) {
        console.log("server error", e);
        if (e.response?.status == 401) {
          dispatch(logoutAction());
          navigate("/auth");
        }
      }
    };
    fetchForms();
  }, []);
 
// console.log("idgorm",form)
  return (
    
      <div className={styles.mainContainer}>
        {formsArray.map((item) => {
          return (<NavLink
          to={`/dashboard/form/${item._id}`}
          style={({ isActive }) => ({
            color: isActive ? "Red" : "Black",
          })}
        >
          <div
                className={styles.formCard}
                
              >
                <Snapshot
                  qnarraydata={item.qnArray}
                  formid={item._id}
                  titleData={item.title}
                  useRef1={targetRef}
                />
              </div>
        </NavLink>
            // <Link to={`/dashboard/form/${item._id}`}>
            //   <div
            //     className={styles.formCard}
                
            //   >
            //     <Snapshot
            //       qnarraydata={item.qnArray}
            //       formid={item._id}
            //       titleData={item.title}
            //       useRef1={targetRef}
            //     />
            //   </div>
            // </Link>
          );
        })}
      </div>
    
  );
};

export default Dashboard;
