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
  const [itemidstate,setItemIdstate]=useState(itemid);
  console.log("itemdid",itemid)

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

    console.log("hhh",itemid,data)
   
  useEffect(()=>{
  console.log("hello i m main");
  handleaddclick({
    itemid: itemidstate,
    Qntext: qnValue,
    Options: { type: qnOptionType, optionarray: optionValueArray },
  })},[optionValueArray,qnValue,itemidstate])

  const handleChange = (event) => {
    
    
    setSelectedValue(event.target.value);
    setqnOptionType(event.target.value);
    setSelectType(event.target.value);
  };
  // console.log("heollo",)
 const optiontype = (qnOpType)=>{
  switch(qnOpType){
    case(0):{
      return;
    }
    case(1):
      return(
    <div className={styles.radioBtn}>
        <Radiobuttons setoptionvalueArray={setoptionvalueArray} data={optionValueArray}/>
      </div>)
      // break;
      
      case(2):
        return (
          <div className={styles.checkBtn}>
            <Checkbutton
              setoptionvalueArray={setoptionvalueArray}
              data = { optionValueArray }
            />
          </div>
        );
     
    }
    
    }

  return (
    <div onClick={onClick} className={styles.Formcomps}>
      <div className={styles.inputndd}>
        <div className={styles.qnInput}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Question title"
            variant="standard"
            value={qnValue}
            onChange={(e) => setQnValue(e.target.value)}
          />
        </div>

        <div className={styles.menuInput}>
          {isactive.isactive && (
            <Select
              value={qnOptionType}
              
              onChange={handleChange}
              sx={{ width: "100%" }}
              // onChange={handleChange}
              //   displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={0}>
                Text
              </MenuItem>
              <MenuItem value={1}>single correct</MenuItem>
              <MenuItem value={2}>multiple correct</MenuItem>
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          )}
        </div>
      </div>
      {optiontype(qnOptionType)}
      <IconButton
        className={styles.rmvicon}
        onClick={() => HandleDelete(itemidstate)}
      >
        <DeleteOutlineIcon />
      </IconButton>
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
