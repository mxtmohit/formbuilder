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
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ResponseForm from "../../../Formdesign/Formelements/Responsepage/ResponseForm";
import Formpage from "../../../Formdesign/Formpage";
import ResponseListPage from "./ResponseListPage";
import Navbar from "../../../Formdesign/Formelements/Navbar";


const ResponsePage = () => {
  const viewFormState=useLocation()?.state?.viewForm

  const [responderList, setResponderList] = useState([]);
  const [title, setTitle] = useState();
  const [qnArraymain, setQnArraymain] = useState([]);
  const [formData, setFormData] = useState();
  const [viewForm,setViewForm]=useState(viewFormState??true)
  const [isAdmin,setIsAdmin]=useState(false)
  //console.log("ggggg", formid, responderList);


  useEffect(()=>{if(viewFormState!=undefined)setViewForm(()=>viewFormState)},[viewFormState])

  const { formid } = useParams();

  const { token } = useSelector((state) => state.userSlice);

  
//  console.log(navigate)
  

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
        `/form/${formid}`,
        config
      );
      // console.log(res.data);
      // console.log("hello",res.data.formData);
        if(res.status==200){
      setFormData(res.data.formData);
          
      const { title, qnData } = res.data.formData;
      setIsAdmin(res.data.isAdmin);
      setTitle(title);
      setQnArraymain(qnData);
        }

      // setFormData(res.)
    } catch (error) {
     
      // navigate("/auth");
      // setTitle({});
      // setQnArraymain([]);
    }
  };

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
    HandleFetchForm();
  }, []);
  let isClicked = true;
  const date = new Date(formData?.created_at);

  return (
    <>
      <div className={s.main1}>
        <div className={s.leftBox}>{isAdmin && formData?.title?.title}</div>
        <div className={s.mdlBtns}>
          <NavLink
            to={`/dashboard/editviewform/${formid}`}
            className={({ isActive }) =>
              isActive ? s.activeLink : s.normalLink
            }
            state={{ viewForm: true }}
            // state={{ responseData: responderList }}
          >
            Questions
          </NavLink>
          <NavLink
            to={`/dashboard/viewresponses/${formid}`}
            className={({ isActive }) =>
              isActive ? s.activeLink : s.normalLink
            }
            state={{ viewForm: false }}

            // state={[{ formid1: formid }, { responseData1: responderList }]}
          >
            Responses
          </NavLink>
        </div>

        <div className={s.rightBox}>
          {isAdmin && date.toLocaleString("en-IN")}
        </div>
      </div>
      <div>
        {viewForm && formData && isAdmin ? (
          <Formpage
            formid1={formData?._id}
            qnArraymain1={formData?.qnData}
            titleobj1={formData?.title}
            endtime={formData?.starttime}
            starttime={formData?.endtime}
          />
        ) : (
          <ResponseListPage responseData={responderList} />
        )}
      </div>
    </>
  );
};

export default ResponsePage;
