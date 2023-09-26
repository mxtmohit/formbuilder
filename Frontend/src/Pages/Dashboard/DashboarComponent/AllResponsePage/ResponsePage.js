import { useEffect, useState } from "react";
import s from "./ResponsePage.module.css";
import axios from "axios";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ResponseForm from "../../../Formdesign/Formelements/Responsepage/ResponseForm";
import Formpage from "../../../Formdesign/Formpage";
import ResponseListPage from "./ResponseListPage";
import Navbar from "../../../Formdesign/Formelements/Navbar";

const ResponsePage = () => {
  const [responderList, setResponderList] = useState([]);
  const [title, setTitle] = useState();
  const [qnArraymain, setQnArraymain] = useState([]);
  const [formData, setFormData] = useState();
  //console.log("ggggg", formid, responderList);

  const { formid } = useParams();

  const { token } = useSelector((state) => state.userSlice);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const res = await axios.get(
  //     `http://localhost:5000/form/${formid}`,
  //     config
  //   );

  const HandleFetchForm = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // You can add other headers here if needed
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:5000/form/${formid}`,
        config
      );
      // console.log(res.data);
      // console.log("hello",res.data.formData);

      setFormData(res.data.formData);

      const { title, qnData } = res.data.formData;
      //setIsAdmin(res.data.isAdmin);
      setTitle(title);
      setQnArraymain(qnData);

      // setFormData(res.)
    } catch (error) {
      console.log("coudnt submit my bad");
      // navigate("/auth");
      // setTitle({});
      // setQnArraymain([]);
    }
  };

  const fetchResponses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getresponse/${formid}`,
        config
      );
      if (res.status == 200) {
        setResponderList(res.data.allresponses);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchResponses();
    HandleFetchForm();
  }, []);
  let isClicked = true;
  return (
    <>
      <div className={s.main1}>
        <div className={s.leftBox}></div>
        <div className={s.mdlBtns}>
          <Link
            to={`/dashboard/editviewform/${formid}`}
              state={{ responseData: responderList }}
    
          >
            Questions
          </Link>
          <Link
            to={`/dashboard/viewresponses/${formid}`}
          
            // state={[{ formid1: formid }, { responseData1: responderList }]}
          >
            Responses
          </Link>
        </div>
        <div className={s.rightBox}>title</div>
      </div>

      <Routes>
        <>
          <Route
            path={`/dashboard/editviewform/:formid`}
            element={<Formpage />}
          />
          <Route
            path={`/dashboard/viewresponses/:formid`}
            element={<ResponseListPage />}
          ></Route>
        </>
      </Routes>
    </>
  );
};

export default ResponsePage;
