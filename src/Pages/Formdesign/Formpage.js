import React, { useEffect, useMemo, useState } from "react";
import styles from "./Formpage.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import Formboiler from "./Formelements/Formboiler";
let i = 0;
const Formpage = () => {
  const [selectedtype, setSelectType] = useState(0);
  const [qnArray, setQnArray] = useState({});
  const [qnArraymain, setQnArraymain] = useState(JSON.parse(localStorage.getItem("mainarray")) ?? [{}])
  const [clicked, setclicked] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [localStorageData, setLocalStorageData] = useState();
  const [loadedcomp,setloadedcomp]=useState()

  console.log("local", localStorageData);

  // useEffect(() => {
    
  //     setLocalStorageData(JSON.parse(localStorage.getItem("mainarray")) ?? "");
  //   }
  // , []);

  useEffect(() => {
    if (qnArraymain)
      localStorage.setItem("mainarray", JSON.stringify(qnArraymain));
  }, [qnArraymain]);

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

    updatedcomps = qnArraymain.map((item,idx) => {
      // if(qnArraymain.length>0){
      console.log(qnArray, " || ", item);
      if (idx == qnArray.itemid) {
        flag = false;
        return qnArray;
      }
      return item;
    });
    if((JSON.stringify(updatedcomps) !== JSON.stringify(qnArraymain)))
      setQnArraymain(updatedcomps);
    if (flag) {
      setQnArraymain((prev) => [...prev, qnArray]);
    }
  };

  useEffect(() => {
    console.log("usefeect worked1");
    if (qnArray?.Qntext || qnArray?.Qntext == "") {
      console.log("usefeect worked2", qnArray);
      handleaddclickmain();
    }
  }, [qnArray]);



  console.log("main rray : ", qnArraymain);

  const handleaddclick = (a) => {
    console.log("called", a);
    setQnArray(a);
  };
  const HandlesetSelectType = (e) => {
    setSelectType(e);
  };

  const Handlecompclick = (idx) => {
    
    setCompActiveIndex(idx);
    console.log("activeindex",compActiveIndex);
  };

  console.log("qnArray : ", qnArray);

  const comps = {
    10: (
      <Formboiler
        clicked={clicked}
        
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
    setQnArraymain([...qnArraymain,{}])
    console.log(k);
    setFormelements([
      ...Formelements,
      {
        component: (
          <Formboiler
            clicked={clicked}
            itemid={k}
            handleaddclick={handleaddclick}
            setSelectType={HandlesetSelectType}
          />
        ),
      },
    ]);

    setCompActiveIndex(qnArraymain.length);
  };
  const [compActiveIndex, setCompActiveIndex] = useState(0);
  //console.log(Formelements);

  let isactive = true;

  // useEffect(() => {}, [Formelements],compActiveIndex);
  // console.log(clicked);
// useEffect(()=>{
//   if (JSON.parse(localStorage.getItem("mainarray"))) {
//     setloadedcomp(Formelements.map((item, idx) => {
//       isactive = idx == compActiveIndex;
//       return(
// <Formboiler
//         clicked={clicked}
//         itemid={item[0]?.itemid}
//         data={item[0]}
//         handleaddclick={handleaddclick}
//         setSelectType={HandlesetSelectType}
//         onClick={() => {
//           Handlecompclick(idx);
//         }}
//         isactive={isactive}
//       />)}
//     ));
//   }},[])
if(qnArraymain.length>10)
    setQnArraymain([{}])
  console.log("lod,",loadedcomp);
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {
          qnArraymain.map((item, idx) => {
            isactive = idx == compActiveIndex;

            return React.cloneElement(comps[10], {
              onClick: () => {
                Handlecompclick(idx);
              },
              isactive: {isactive },
              data:item,
              itemid:idx
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
