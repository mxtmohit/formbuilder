import React, { useEffect, useMemo, useState } from "react";
import s from "./Snapshot.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import Formboiler from "../../../UserForm/UserFormElements/Formboiler";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

let i = 0;
const Snapshot = ({qnarraydata,titleData,useRef1,isNew}) => {


  const { formid } = useParams();
  const navigate=useNavigate()
  console.log(qnarraydata,titleData,useRef1);

  const [selectedtype, setSelectType] = useState(0);
  const [titleobj, setTitle] = useState(titleData?? {})
  
  return (
    <div ref={useRef1} className={s.main}>
      <div className={s.wrapper}>
        
        {isNew?<h1>ADD new</h1>:titleData?.title}
       
      </div>
      <>{isNew || <div className={s.dateCard}>ffsd</div>}</>
      
    </div>
  );
};

export default Snapshot;
