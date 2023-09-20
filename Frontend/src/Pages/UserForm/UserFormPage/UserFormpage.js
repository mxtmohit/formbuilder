import React, { useEffect, useMemo, useState } from "react";
import styles from "./UserFormpage.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import Formboiler from "../UserFormElements/Formboiler"
import TitleBar from "../UserFormElements/TitleBar";
import axios from "axios";
import { useParams } from "react-router-dom";

let i = 0;
const UserFormpage = () => {

  const {formid}=useParams()
  console.log(formid)

  const [selectedtype, setSelectType] = useState(0);
  const [titleobj, setTitle] = useState(
    JSON.parse(localStorage.getItem("maintitle")) ?? {}
  );
  const [qnArray, setQnArray] = useState({});
  const [formData, setFormData] = useState({});
  const [qnArraymain, setQnArraymain] = useState(
    JSON.parse(localStorage.getItem("usermainarray")) ?? [{ itemid: 0 }]
  );
  const [clicked, setclicked] = useState(0);
  

  if (JSON.parse(localStorage.getItem("usermainarray")))
    i = JSON.parse(localStorage.getItem("usermainarray"))?.length;

  let updatedcomps;

  let flag = true;

  const updateMainArray = (updatedarray) => {
    setQnArraymain(()=>updatedarray);
    
  };


useEffect(()=>{
  setFormData({title:titleobj,qnArraymain:qnArraymain})
},[qnArraymain,titleobj])

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
    console.log(qnArray?.options?.optionarray)
    if (qnArray?.Qntext || qnArray?.Qntext == ""||qnArray?.Options?.optionarray) {
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
        handleaddclick={handleaddclick}
        setSelectType={HandlesetSelectType}
      />
    ),
  };

  

 


  useEffect(() => {

    if (qnArraymain)
      localStorage.setItem("usermainarray", JSON.stringify(qnArraymain));
    localStorage.setItem("usermaintitle", JSON.stringify(titleobj));
  }, [qnArraymain,titleobj]);

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

useEffect(()=>{
  HandleFetchForm()
},[])
const HandleFetchForm = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/form/${formid}`);
    console.log(res.data)
    console.log(res.data.formData);

    setFormData(res.data.formData)

    

    const {title,qnData,user}=res.data.formData
    
    setTitle(title)
    setQnArraymain(qnData)

  

    // setFormData(res.)
  } catch (error) {
    console.log("coudnt submit my bad");
    setTitle("");
    setQnArraymain("");

  }
};  

  

const HandleFormUpload= async() => {
  try {
      const res = await axios.post("http://localhost:5000/form/submit", formData);
  } catch (error) {
    console.log("coudnt submit my bad")
  }
  
};
  

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <TitleBar  data={titleobj} />
        {qnArraymain.map((item, idx) => {
         

          return React.cloneElement(comps[10], {
            
           
            key: item.itemid,
            data: item,
            itemid: item.itemid,
           
          });
        })}
     

  
      </div>
      <div className={styles.BtnContainer}>
        
        <div onClick={() => HandleFormUpload()} className={styles.submitBtn}>
          upload Form
        </div>
     
      </div>
    </div>
  );
};

export default UserFormpage;
