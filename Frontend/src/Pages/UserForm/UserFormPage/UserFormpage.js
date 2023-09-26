import React, { useEffect, useMemo, useState } from "react";
import styles from "./UserFormpage.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import Formboiler from "../UserFormElements/Formboiler";
import TitleBar from "../UserFormElements/TitleBar";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Formpage from "../../Formdesign/Formpage";

let i = 0;
const UserFormpage = ({responseData1}) => {
  const { formid } = useParams();
  const navigate = useNavigate();
  const location = window.location.pathname;
   const lov = useLocation();
   const userResponse = lov.state.response;
   console.log("ggk", userResponse);

  const path = location?.split("/").slice(0, 3).join("/");

   console.log("route",responseData1)

  // console.log(formid);
  const [optionResponseObject, setOptionResponseObject] = useState();
  const [formResponseArray, setFormResponseArray] = useState([]);
  console.log("response", formResponseArray);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedtype, setSelectType] = useState(0);
  const [titleobj, setTitle] = useState(
    JSON.parse(localStorage.getItem("usermaintitle")) ?? {}
  );
  const [qnArray, setQnArray] = useState({});
  const [formData, setFormData] = useState({});
  const [qnArraymain, setQnArraymain] = useState(
    JSON.parse(localStorage.getItem("usermainarray")) ?? [{ itemid: 0 }]
  );
  const [clicked, setclicked] = useState(0);

  const { email, token } = useSelector((state) => state.userSlice);

  if (!token) navigate(`/auth/${formid}`);

  if (JSON.parse(localStorage.getItem("usermainarray")))
    i = JSON.parse(localStorage.getItem("usermainarray"))?.length;

  let updatedcomps;

  let flag = true;

  useEffect(()=>{
    //console.log(Object.keys(optionResponseObject)[0]);
    let isNew=true
    if(optionResponseObject){
    const newarray=formResponseArray.map((item)=>{
      
    //console.log("hwllo",Object.keys(item)[0] == Object.keys(optionResponseObject)[0]);
      
      if(Object.keys(item)[0]==Object.keys(optionResponseObject)[0]){
        isNew=false
        return optionResponseObject}
        
      else 
        return item
      
    })
    if(isNew)
      setFormResponseArray([...formResponseArray, optionResponseObject]);
    else
      setFormResponseArray(newarray);
  }
  //   setFormResponseArray([...formResponseArray,optionResponseObject])
  },[optionResponseObject])

  const updateMainArray = (updatedarray) => {
    setQnArraymain(() => updatedarray);
  };

  useEffect(() => {
    setFormData({ title: titleobj, qnArraymain: qnArraymain });
  }, [qnArraymain, titleobj]);

  const handleaddclickmain = () => {
    updatedcomps = qnArraymain.map((item) => {
      if (item.itemid == qnArray.itemid) {
        flag = false;
        return qnArray;
      }
      return item;
    });

    if (JSON.stringify(updatedcomps) !== JSON.stringify(qnArraymain))
      setQnArraymain(updatedcomps);
    if (flag) {
      setQnArraymain((prev) => [...prev, qnArray]);
    }
  };

  useEffect(() => {
    console.log(qnArray?.options?.optionarray);
    if (
      qnArray?.Qntext ||
      qnArray?.Qntext == "" ||
      qnArray?.Options?.optionarray
    ) {
      console.log("usefeect worked2", qnArray);
      handleaddclickmain();
    }
  }, [qnArray]);

  const handleaddclick = (a) => {
    setQnArray(a);
  };

  const HandlesetSelectType = (e) => {
    setSelectType(e);
  };

  const comps = {
    10: (
      <Formboiler
        clicked={clicked}
        // key={eleId}
        setOptionResponseObject={setOptionResponseObject}
        handleaddclick={handleaddclick}
        setSelectType={HandlesetSelectType}
      />
    ),
  };

  useEffect(() => {
    if (qnArraymain)
      localStorage.setItem("usermainarray", JSON.stringify(qnArraymain));
    localStorage.setItem("usermaintitle", JSON.stringify(titleobj));
  }, [qnArraymain, titleobj]);

  const [Formelements, setFormelements] = useState([
    {
      component: (
        <Formboiler
          clicked={clicked}
          itemid={clicked}
          handleaddclick={handleaddclick}
          setSelectType={HandlesetSelectType}
        />
      ),
    },
  ]);

  useEffect(() => {
    HandleFetchForm();
  }, []);
  const HandleFetchForm = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // You can add other headers here if needed
      },
    };

    // try{const axiosInstance = axios.create({
    //     baseURL: 'https://api.example.com', // Replace with your API base URL
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${accessToken}`, // Set the Authorization header with "Bearer" and the token
    //     },
    //   });

    //   // Make a GET request with the token in the header
    //   const response = await axiosInstance.get('/api/endpoint');

    //   console.log('Response:', response.data);
    //   // Handle the response data here

    // } catch (error) {
    //   console.error('Error:', error);}

    try {
      const res = await axios.get(
        `http://localhost:5000/form/${formid}`,
        config
      );
      // console.log(res.data);
      // console.log("hello",res.data.formData);

      setFormData(res.data.formData);

      const { title, qnData } = res.data.formData;
      setIsAdmin(res.data.isAdmin);
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

  const HandleFormUpload = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/form/submit",
        {formid,responseData:formResponseArray,token}
      );
    } catch (error) {
      console.log("coudnt submit my bad");
    }
  };
console.log(path == "/dashboard/form" == isAdmin)
  return (
    <>
      {(path == "/dashboard/form") == isAdmin ? (
        <Formpage
          qnArraymain1={qnArraymain}
          titleobj1={titleobj}
          formids={formid}
        />
      ) : (
        <>
          {/* {isAdmin ? (
          <Formpage qnArraymain1={qnArraymain} titleobj1={titleobj} />
        ) : ( */}
          <div className={styles.main}>
            <div className={styles.wrapper}>
              {/* {formData &&<h1>bsdk jwt ka neta mat bann</h1> } */}
              <TitleBar data={titleobj} />
              {qnArraymain.map((item, idx) => {
                return React.cloneElement(comps[10], {
                  key: item.itemid,
                  data: item,
                  itemid: item.itemid,
                  response1: userResponse[idx],
                });
              })}
            </div>
            {!responseData1 ?? (
              <div className={styles.BtnContainer}>
                <div
                  onClick={() => HandleFormUpload()}
                  className={styles.submitBtn}
                >
                  upload Form
                </div>
              </div>
            )}
          </div>
          {/* </>)} */}
        </>
      )}
    </>
  );
};

export default UserFormpage;
