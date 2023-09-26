import { useEffect, useState } from "react";
import s from "./ResponsePage.module.css";
import axios from "axios";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ResponseForm from "../../../Formdesign/Formelements/Responsepage/ResponseForm";
import Formpage from "../../../Formdesign/Formpage";
import UserFormpage from "../../../UserForm/UserFormPage/UserFormpage";

const ResponseListPage = () => {
  const [responderList, setResponderList] = useState([]);

  const responseListState=useLocation().state
   console.log("ggggdg",responseListState);

  const { token } = useSelector((state) => state.userSlice);

  const {formid}=useParams()

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
  }, []);
console.log(responderList)
  return (
    <>
      <div className={s.main}>
        <div className={s.wrapper}>
         
          {responderList.map((item) => (
            <>
              <Link
                key={item._id}
                to={`/dashboard/viewresponses/${formid}/viewform/${item._id}`} state={{response:item.response}}
              >
                {item.user}
              </Link>
            </>
          ))}
        </div>
      </div>

      <Routes>
        <>
          {/* <Route
            path="/dashboard/viewresponse/:responseid"
            render={() => {
              // You can directly access 'formid' or any other data you want here
              const propsToPass = {
                formid: formid,
              };
              return <ResponseForm {...propsToPass} />; // Render the 'ResponseForm' component with props
            }}
          /> */}

          {/* <Route
            path={`/dashboard/editviewform/:formid`}
            element={
              <Formpage
                qnArraymain1={qnArraymain1}
                titleobj1={titleobj1}
                formids={formid}
              />
            }
          />*/}
          <Route
            path={`/dashboard/viewresponses/:formid/viewform/:responseid`}
            element={
              <UserFormpage
                // formid1={formid}
                // responseData1={responderList}
              />
            }
          />
        </>
      </Routes>
    </>
  );
};

export default ResponseListPage;
