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
import Checkbutton from "./Checkbutton";

const Formboiler = ({
  setSelectType,
  isactive,
  itemid,
  onClick,
  handleaddclick,
  clicked,
  data,
  HandleDelete,
  setOptionResponseObject,
  response1
}) => {
  const [selectedValue, setSelectedValue] = useState("0");
  const [qnOptionType, setqnOptionType] = useState("0");
  const [qnValue, setQnValue] = useState();
  const [optionValueArray, setoptionvalueArray] = useState();
  const [optionResponse, setOptionResponse] = useState();
  const [itemidstate, setItemIdstate] = useState(itemid);

  const [textResponse, setTextResponse] = useState(
   response1 ? response1[Object.keys(response1)[0]] : ""
  );
console.log("response1",response1)
  

  useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    if (data) {
      setSelectedValue(data?.Options?.type);
      setQnValue(data?.Qntext);
      setoptionvalueArray(data?.Options?.optionarray);
      setqnOptionType(data?.Options?.type);
      setItemIdstate(itemid);
    }
  };

  // useEffect(() => {

  //   setOptionResponseObject({ [data._id]: optionResponse ?? textResponse });
  // }, [optionResponse, textResponse]);


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
  const optiontype = (qnOpType,res) => {
    switch (qnOpType) {
      case 0: {
        
        return (
          <div className={styles.inputndd}>
            <div className={styles.Qn}>
              <TextField
                fullWidth
                id="standard-basic"
                variant="standard"
                value={textResponse}
                ansdata={res}
                onChange={(e) => setTextResponse(e.target.value)}
              />
            </div>
          </div>
        );
      }
      case 1:
        return (
          <div className={styles.radioBtn}>
            <Radiobuttons
              setanswerValue={setOptionResponse}
              data={optionValueArray}
              ansdata={res}
            />
          </div>
        );
      // break;

      case 2:
        return (
          <div className={styles.checkBtn}>
            <Checkbutton
              setanswervalueArray={setOptionResponse}
              data={optionValueArray}
              ansdata={res}
            />
          </div>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseLeave={() => {
        setOptionResponseObject({ [data._id]: optionResponse ?? textResponse });
      }}
      className={styles.Formcomps}
    >
      <div className={styles.inputndd}>
        <div className={styles.qnInput}>
          <div className={styles.Qn}>{qnValue}</div>
        </div>
      </div>
      {/* {optiontype(qnOptionType,response1?response1[Object.keys(response1)[0]]:"")} */}
      {optiontype(
        qnOptionType,
        response1 ?? undefined
      )}

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
