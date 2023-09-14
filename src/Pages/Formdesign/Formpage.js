import React, { useEffect, useMemo, useState } from "react";
import styles from "./Formpage.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import Formboiler from "./Formelements/Formboiler";
let i = 0;
const Formpage = () => {
  const [selectedtype, setSelectType] = useState(0);
  const [qnArray, setQnArray] = useState({});
  const [qnArraymain, setQnArraymain] = useState([{}]);
  const [clicked, setclicked] = useState(0);
  const [itemId, setItemId] = useState(0);
  //  console.log("qn : ", qnArray);

  let updatedcomps;

  let flag = true;
  //console.log("main",handleaddclick)
  const handleaddclickmain = () => {
    // if(qnArraymain.filter((item)=>{
    //   if(qnArray.itemid!=item.itemid){

    //   }
    // }))
    // {
    //   setQnArraymain((prev)=>[...prev, qnArray]);
    // }

    updatedcomps = qnArraymain.map((item) => {
      // if(qnArraymain.length>0){
      console.log(qnArray, " || ", item);
      if (item?.itemid == qnArray.itemid) 
      {
        flag = false;
        return qnArray;
      }
      return item;
      // }else
      //  setQnArraymain(qnArray)
    });
    setQnArraymain(updatedcomps);
    if (flag) 
    {
      setQnArraymain((prev) => [...prev, qnArray]);
    }
  };

  useEffect(() => {
    console.log("usefeect worked1");
    if (qnArray?.Qntext || qnArray?.Qntext=="") {
      console.log("usefeect worked2", qnArray);
      handleaddclickmain();
    }
  }, [qnArray]);

  console.log("main rray : ", qnArraymain);

  //let style="20vh"

  // console.log(selectedtype)

  const handleaddclick = (a) => {
    console.log("called", a);
    setQnArray(a);
  };
  const HandlesetSelectType = (e) => {
    setSelectType(e);
  };

  const Handlecompclick = (idx) => {
    setCompActiveIndex(idx);
  };

  console.log("qnArray : ", qnArray);

  const comps = {
    10: (
      <Formboiler
        clicked={clicked}
        itemid={clicked}
        handleaddclick={handleaddclick}
        setSelectType={HandlesetSelectType}
      />
    ),
  };

  const [Formelements, setFormelements] = useState([
    {
      component: (
        <Formboiler
          clicked={clicked}
          itemid={clicked}
          handleaddclick={handleaddclick}
          setSelectType={HandlesetSelectType}
        />
      ),
    },
  ]);

  const handleFormElements = (k) => {
    // setFormelements([...Formelements, { component: comps[10] }]);
    console.log(k)
    setFormelements([...Formelements, { component: (
      <Formboiler
        clicked={clicked}
        itemid={k}
        handleaddclick={handleaddclick}
        setSelectType={HandlesetSelectType}
      />
    )}]);
    

    setCompActiveIndex(Formelements.length);
  };
  const [compActiveIndex, setCompActiveIndex] = useState(0);
  //console.log(Formelements);

  let isactive = true;

  // useEffect(() => {}, [Formelements],compActiveIndex);
  // console.log(clicked);
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

      <div
        onClick={() => (i++, handleFormElements(i))}
        className={styles.addBtn}
      >
        + Add
      </div>
      {/* <div onClick={handleFormElements} className={styles.addBtn}>
        + submit
      </div> */}
    </div>
  );
};

export default Formpage;
