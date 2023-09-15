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
//import {AddIcon} from "@material-ui/icons";

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
    setCheckOptions(data)
  }

  const HandleAddOption = () => {
    if (checkLabel.length != 0) {
      setCheckOptions([
        ...checkOptions,
        { label: checkLabel, value: checkLabel, id: i },
      ]);
    }

    setCheckLabel("");
    isActive = false;
    // setEditCheckLabel("")
    setCheckClickedId(-1);
  };
  i++;

  const Handlecheckclick = (item) => {
    setCheckClickedId(item.id);
    setEditCheckLabel(item.label);
  };

  const HandlesaveEdit = (id) => {
    const updatedchecklabelarray = checkOptions.map((item) => {
      if (item.id == id)
        return { ...item, label: editcheckLabel, value: editcheckLabel };
      return item;
    });
    if (
      JSON.stringify(updatedchecklabelarray) != JSON.stringify(checkOptions)
    ) {
      console.log("hello");
      setCheckOptions(updatedchecklabelarray);
    }
    setCheckClickedId(-1);
  };

  useEffect(() => {
    setoptionvalueArray(checkOptions);
    console.log(checkOptions);
  }, [checkOptions]);

  return (
    <div className={style.container}>
      {checkOptions.map((item, idx) => {
        isActive = item.id == checkClickedId;
        return (
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
                isActive ? (
                  <Input
                    onChange={(e) => setEditCheckLabel(e.target.value)}
                    onMouseLeave={() => {
                      HandlesaveEdit(item.id);
                      isActive = false;
                    }}
                    value={editcheckLabel}
                  />
                ) : (
                  item.label
                )
              }
            />
          </div>
        );
      })}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          value="female"
          control={<Checkbox />}
          label={
            <Input
              value={checkLabel}
              onClick={() => setCheckClickedId(-1)}
              onChange={(e) => setCheckLabel(e.target.value)}
            />
          }
        />

        <div className={style.btn} onClick={HandleAddOption}>
          +
        </div>
      </div>
    </div>
  );
};

export default CheckButton;
