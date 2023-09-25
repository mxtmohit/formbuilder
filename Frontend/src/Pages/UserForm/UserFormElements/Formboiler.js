import React, { useEffect, useMemo, useState } from "react";
import styles from "./Formboiler.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Radiobuttons from "./Radiobuttons";
import Checkbutton from './Checkbutton'

const Formboiler = ({ setSelectType, isactive,itemid, onClick,handleaddclick,clicked,data,HandleDelete}) => {
  const [selectedValue, setSelectedValue] = useState("0");
  const [qnOptionType, setqnOptionType] = useState('0');
  const [qnValue,setQnValue]=useState();
  const [optionValueArray,setoptionvalueArray]=useState();
  const [optionResponse,setOptionResponse]=useState()
  const [itemidstate,setItemIdstate]=useState(itemid);
  console.log("itemdid",data)

  useEffect(()=>{
setData()
  },[])

  const setData=()=>
  {if(data){
    setSelectedValue(data?.Options?.type)
    setQnValue(data?.Qntext)
    setoptionvalueArray(data?.Options?.optionarray)
    setqnOptionType(data?.Options?.type);
    setItemIdstate(itemid);
  }
  }

  




  
  
  //setIdActive(isActive)

  const [radioOption, setRadioOption] = useState([{ value: 1, label: 1 }]);
    // const handleMenuChange = (value) => {
    //   setqnOptionType(value);
    // };
   
 

  const handleChange = (event) => {
    
    
    setSelectedValue(event.target.value);
    setqnOptionType(event.target.value);
    setSelectType(event.target.value);
  };
  // console.log("heollo",isactive)
 const optiontype = (qnOpType)=>{
  switch(qnOpType){
    case(0):{
      return (
        <div className={styles.inputndd}>
          <div className={styles.Qn}>
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              value={qnValue}
              onChange={(e) => setOptionResponse(e.target.value)}
            />
          </div>
        </div>
      );
    }
    case(1):
      return (
        <div className={styles.radioBtn}>
          <Radiobuttons
            setoptionvalueArray={setOptionResponse}
            data={optionValueArray}
          />
        </div>
      );
      // break;
      
      case(2):
        return (
          <div className={styles.checkBtn}>
            <Checkbutton
              setoptionvalueArray={setOptionResponse}
              data={optionValueArray}
            />
          </div>
        );
     
    }
    
    }

  return (
    <div onClick={onClick} className={styles.Formcomps}>
      <div className={styles.inputndd}>
        <div className={styles.qnInput}>
          <div className={styles.Qn}>{qnValue}</div>
        </div>

        
      </div>
      {optiontype(qnOptionType)}
    
      {/* <div className={styles.radioBtn}>
        <Radiobuttons />
      </div>
      
      <div className={styles.checkBtn}>
        <Radiobuttons />
      </div> */}
    </div>
  );
};

export default Formboiler;
