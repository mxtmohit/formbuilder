import React, { useEffect, useState } from "react";
import styles from "./Formpage.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import Formboiler from "./Formelements/Formboiler";
let i = 0;
const Formpage = () => {
  i++;
  const [selectedtype, setSelectType] = useState(0);
  
  
  

  //let style="20vh"

  // console.log(selectedtype)



  const HandlesetSelectType = (e) => {
    setSelectType(e);
    console.log(selectedtype);
  };
  console.log(i);
  const Handlecompclick = (idx) => {
    //console.log("hello");

    setCompActiveIndex(idx);
  };

  const comps = { 10: <Formboiler setSelectType={HandlesetSelectType} /> };

  const [Formelements, setFormelements] = useState([
    { component: <Formboiler setSelectType={HandlesetSelectType} /> },
  ]);

  const handleFormElements = () => {
    setFormelements([...Formelements, { component: comps[10] }]);
    setCompActiveIndex(Formelements.length);
  };
  const [compActiveIndex, setCompActiveIndex] = useState(0);
  //console.log(Formelements);

  let isactive = true;

  // useEffect(() => {}, [Formelements],compActiveIndex);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {Formelements.map((Comp, idx) => {
          isactive = idx == compActiveIndex;
          //console.log(isactive)

          return React.cloneElement(Comp.component, {
            onClick: () => {
              Handlecompclick(idx);

            },
            isactive: { isactive },
          });
        })}

        {/* <div className={styles.menuInput}>
          <Select
            autoWidth
            value={1}
            onChange={handleMenuChange}
            //   displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={1}>single correct</MenuItem>
            <MenuItem value={2}>Multiple correct</MenuItem>
          </Select>
        </div> */}
      </div>

      <div onClick={handleFormElements} className={styles.addBtn}>
        + Add
      </div>
      {/* <div onClick={handleFormElements} className={styles.addBtn}>
        + submit
      </div> */}
    </div>
  );
};

export default Formpage;
