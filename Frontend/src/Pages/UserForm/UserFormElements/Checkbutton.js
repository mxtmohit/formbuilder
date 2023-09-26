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

const CheckButton = ({ setanswervalueArray, data ,ansdata}) => {
  const [checkLabel, setCheckLabel] = useState("");
  const [editcheckLabel, setEditCheckLabel] = useState("");
  const [checkOptions, setCheckOptions] = useState([]);
  const [checkClickedId, setCheckClickedId] = useState();
  const [checkResponse, setCheckResposne] = useState({});
  console.log(ansdata)

  useEffect(()=>{setCheckResposne(ansdata)},[])

  let isActive = false;
  useEffect(() => {
    setData();
  }, []);
  const setData = () => {
    if (data) setCheckOptions(data);
  };

  let response = checkResponse;

  const Handlecheckclick = (e, idx) => {
    setCheckResposne({ ...checkResponse, [e.target.value]: e.target.checked });
  };
  useEffect(() => {
    setanswervalueArray(checkResponse);
  }, [checkResponse]);

  console.log(" ", checkResponse[0]);

  return (
    <div className={style.container}>
      {checkOptions.map((item, idx) => {
        isActive = item.id == checkClickedId;
        return (
          <div className={style.radioRow}>
            <div
              className={style.checkContainer}
              // onClick={() => Handlecheckclick(item)}
            >
              <FormControlLabel
                value={item.label}
                control={
                  <Checkbox
                    checked={checkResponse[item.value] || false}
                    onChange={(e) => Handlecheckclick(e)}
                  />
                }
                label={<div className={style.labelText}>{item.label}</div>}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckButton;
