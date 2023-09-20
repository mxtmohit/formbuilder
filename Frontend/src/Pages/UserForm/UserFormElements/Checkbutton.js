import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Input,
  Check,
  CheckGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./Checkbutton.module.css";
import ClearIcon from "@mui/icons-material/Clear";

let i = 0;

const CheckButton = ({ setoptionvalueArray,data }) => {
  const [checkLabel, setCheckLabel] = useState("");
  const [editcheckLabel, setEditCheckLabel] = useState("");
  const [checkOptions, setCheckOptions] = useState([]);
  const [checkClickedId, setCheckClickedId] = useState();
  

  let isActive = false;
  useEffect(()=>{
    setData()
  },[])
  const setData=()=>{
    if(data)
      setCheckOptions(data)
  }

  

  

  const Handlecheckclick = (item) => {
    setCheckClickedId(item.id);
    setEditCheckLabel(item.label);
  };

  

 

  return (
    <div className={style.container}>
      {checkOptions.map((item, idx) => {
        isActive = item.id == checkClickedId;
        return (
          <div className={style.radioRow}>
            <div
              className={style.checkContainer}
              // onClick={() => Handlecheckclick(item)}
              onMouseEnter={() => {
                Handlecheckclick(item);
              }}
            >
              <FormControlLabel
                value={item.label}
                control={<Checkbox />}
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

export default CheckButton;
