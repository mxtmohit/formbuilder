import React, { useEffect, useState, useRef } from "react";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Snapshot from "./DashboarComponent/UserFormPage/Snapshot";
import { NavLink } from "react-router-dom";
import SnapshotBlank from "./DashboarComponent/UserFormPage/SnapshotBlank";


const Dashboard = () => {
  const [formsArray, setFormsArray] = useState([]);
  const [cardDataArray, setCardDataArray] = useState([{}]);
  const [screenshot, setScreenshot] = useState();
  const { token, email } = useSelector((state) => state.userSlice);

  const targetRef = useRef(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkuser=useSelector((s)=>s.userSlice.token)

  



  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };



  useEffect(() => {

    if (!checkuser) {
     
      navigate("/auth");
    }
    
    const fetchForms = async () => {
      try {
        const res = await axios.get(
          `/getforms`,
          config
        );

        setFormsArray(res.data.forms);
       
      } catch (e) {
       
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
      
      <div className={styles.wrapper}>
        <div className={styles.topContainer}>
          <div className={styles.formCard}>
            <Link
              to={`/dashboard/createform`} 
              
            >
              <SnapshotBlank
              

              />
            </Link>
          </div>
          {formsArray?.map((item) => {
            return (
              <div className={styles.formCard}>
                <Link
                  to={`/dashboard/editviewform/${item._id}`}
                  state={{formData:item  }}
                  // style={({ isActive }) => ({
                  //   color: isActive ? "Red" : "Black",
                  // })}
                >
                  <Snapshot
                    qnarraydata={item.qnArray}
                    formid={item._id}
                    titleData={item.title}
                    useRef1={targetRef}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <div className={styles.btmContainer}></div>
      </div>
    </div>
  );
};

export default Dashboard;
