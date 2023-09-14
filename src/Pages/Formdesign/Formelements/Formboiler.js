import React, { useEffect, useMemo, useState } from "react";
import styles from "./Formboiler.module.css";

import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Radiobuttons from "./Radiobuttons";
import Checkbutton from './Checkbutton'

const Formboiler = ({ setSelectType, key, isactive,itemid, onClick,handleaddclick,clicked}) => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [qnOptionType, setqnOptionType] = useState(0);
  const [qnValue,setQnValue]=useState();
  const [optionValueArray,setoptionvalueArray]=useState();

  console.log("item id in boiler: ",itemid);

  // useEffect(()=>{
  
  //   if(clicked)
  //   console.log("111hello")
                                                                                        
  // },[clicked])
  
  
  console.log("arrya ",optionValueArray)
  //setIdActive(isActive)

  const [radioOption, setRadioOption] = useState([{ value: 1, label: 1 }]);
    // const handleMenuChange = (value) => {
    //   setqnOptionType(value);
    // };
   
  useEffect(()=>{
  console.log("hello i m main");
  handleaddclick({
    itemid: itemid,
    Qntext: qnValue,
    Options: { type: qnOptionType, optionarray: optionValueArray },
  })},[optionValueArray,qnValue])

  const handleChange = (event) => {
    
    
    setSelectedValue(event.target.value);
    setqnOptionType(event.target.value);
    setSelectType(event.target.value);
  };
  // console.log("heollo",isactive)
 const optiontype = (qnOpType)=>{
  switch(qnOpType){
    case(1):
      return(
    <div className={styles.radioBtn}>
        <Radiobuttons setoptionvalueArray={setoptionvalueArray} />
      </div>)
      // break;
      
      case(2):
        return (
          <div className={styles.checkBtn}>
            <Checkbutton setoptionvalueArray={setoptionvalueArray} />
          </div>
        );
      // break;
    }
    
    }

  return (
    <div onClick={onClick} className={styles.Formcomps}  >
      <div className={styles.inputndd} >
        <div className={styles.qnInput}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Question title"
            variant="standard"
            value={qnValue}
            onChange={(e)=>setQnValue(e.target.value)}
          />
        </div>

        <div className={styles.menuInput}>
          {isactive.isactive && (
            <Select
              value={selectedValue}
              onChange={handleChange}
              sx={{ width: "100%" }}
              // onChange={handleChange}
              //   displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>single correct</MenuItem>
              <MenuItem value={2}>multiple correct</MenuItem>
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          )}
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
