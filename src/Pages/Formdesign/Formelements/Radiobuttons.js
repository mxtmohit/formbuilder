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

const Radiobuttons = () => {
  const [radioLabel, setRadioLabel] = useState("");
  const [editradioLabel, setEditRadioLabel] = useState("");
  const [radioOptions, setRadioOptions] = useState([]);
  const [radioClickedId, setRadioClickedId] = useState();

  let isActive = false;

  const HandleDeleteOption=(id)=>{

    setRadioOptions(radioOptions.filter((item)=>{
      return item.id!=id

    }))

  }

  const HandleAddOption = () => {
    if (radioLabel.length != 0) {
      setRadioOptions([
        ...radioOptions,
        { label: radioLabel, value: radioLabel, id: i },
      ]);
    }

    setRadioLabel("");
    isActive = false;
    // setEditRadioLabel("")
    setRadioClickedId(-1);
  };
  i++;

  const Handleradioclick = (item) => {
    setRadioClickedId(item.id);
    setEditRadioLabel(item.label);
  };

  const HandlesaveEdit = (id) => {
    const updatedradiolabelarray = radioOptions.map((item) => {
      if (item.id == id)
        return { ...item, label: editradioLabel, value: editradioLabel };
      return item;
    });
    if (
      JSON.stringify(updatedradiolabelarray) != JSON.stringify(radioOptions)
    ) {
      console.log("hello");
      setRadioOptions(updatedradiolabelarray);
    }
    setRadioClickedId(-1);
  };

  useEffect(() => {
    console.log(radioOptions);
  }, [radioOptions]);

  return (
    <div className={style.container}>
      {
      radioOptions.map((item, idx) => {
        isActive = item.id == radioClickedId;
        return (
          <div className={style.radioRow}>
            <div
              className={style.radioContainer}
              // onClick={() => Handleradioclick(item)}
              onMouseEnter={() => {
                Handleradioclick(item);
              }}
            >
              <FormControlLabel
                name="radio"
                checked={false}
                value={item.label}
                control={<Radio />}
                label={
                  isActive ? (
                    <Input
                      fullWidth
                      onChange={(e) => setEditRadioLabel(e.target.value)}
                      onMouseLeave={() => {
                        HandlesaveEdit(item.id);
                        isActive = false;
                      }}
                      value={editradioLabel}
                    />
                  ) : (
                    <div className={style.labelText}>{item.label}</div>
                  )
                }
              />
            </div>
            <IconButton className={style.rmvicon} onClick={()=>HandleDeleteOption(item.id)}>
              <ClearIcon  />
            </IconButton>
          </div>
        );
      })
      }
      
       
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          name="radio"
          value="female"
          control={<Radio />}
          label={
            <Input
              value={radioLabel}
              onClick={() => setRadioClickedId(-1)}
              onChange={(e) => setRadioLabel(e.target.value)}
            />
          }
        />

        <IconButton onClick={HandleAddOption}>
          <AddIcon />
        </IconButton>

        {/* <div className={style.btn} onClick={HandleAddOption}>
          +
        </div> */}
      </div>
    </div>
  );
};

export default Radiobuttons;
