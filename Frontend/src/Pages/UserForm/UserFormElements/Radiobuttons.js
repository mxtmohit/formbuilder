import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./Radiobuttons.module.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from '@mui/icons-material/Clear';

//import {AddIcon} from "@material-ui/icons";

let i = 0;

const Radiobuttons = ({setoptionvalueArray,data}) => {
  const [radioLabel, setRadioLabel] = useState("");
  const [editradioLabel, setEditRadioLabel] = useState("");
  const [radioOptions, setRadioOptions] = useState([]);
  const [radioClickedId, setRadioClickedId] = useState();

  let isActive = false;
 useEffect(()=>{setData()},[])

 const setData=()=>{
  
  if(data)
    setRadioOptions(data)
 }  


 

  
   
   
  

  const Handleradioclick = (item) => {
    setRadioClickedId(item.id);
    setEditRadioLabel(item.label);
  };

 
    

  

  return (
    <div className={style.container}>
      {
      radioOptions.map((item, idx) => {
       
        return (
          <div className={style.radioRow}>
            <div
              className={style.radioContainer}
              // onClick={() => Handleradioclick(item)}
              
            >
              <FormControlLabel
                name="radio"
                checked={false}
                value={item.label}
                control={<Radio />}
                label={
                
                    <div className={style.labelText}>{item.label}</div>
                  
                }
              />
            </div>
            
          </div>
        );
      })
      }
      
       
     
    </div>
  );
};

export default Radiobuttons;
