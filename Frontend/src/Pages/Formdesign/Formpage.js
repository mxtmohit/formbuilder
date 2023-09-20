import React, { useEffect, useMemo, useState } from "react";
import styles from "./Formpage.module.css";
import { MenuItem, Select, Snackbar, TextField } from "@mui/material";
import Formboiler from "./Formelements/Formboiler";
import TitleBar from "./Formelements/TitleBar";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import ClockInput from "./Formelements/datepicker/ClockInput";
import Snackbaralert from "./Formelements/shared/Snackbaralert";



let i = 0;
const Formpage = () => {
  const [selectedtype, setSelectType] = useState(0);
  const [titleobj, setTitle] = useState(
    JSON.parse(localStorage.getItem("maintitle")) ?? {}
  );

  const [message,setmessage]=useState("")
  const [isOpen,setIsOpen]=useState(false)
  const [type,setType]=useState("")
  const [qnArray, setQnArray] = useState({});
  const [user,setUser]=useState("test@123")
  const [formData, setFormData] = useState({});
  const [Activate,setActivate]=useState();
  const [deActivate, setDeactivate] = useState();
  const [qnArraymain, setQnArraymain] = useState(
    JSON.parse(localStorage.getItem("mainarray")) ?? [{ itemid: 0 }]
  );
  const [clicked, setclicked] = useState(0);
  const [eleId, SetEleId] = useState(
    JSON.parse(localStorage.getItem("mainarray"))?.length
      ? qnArraymain[qnArraymain?.length - 1]?.itemid + 1
      : 1
  );

  if (JSON.parse(localStorage.getItem("mainarray")))
    i = JSON.parse(localStorage.getItem("mainarray"))?.length;

  let updatedcomps;

  let flag = true;

  const updateMainArray = (updatedarray) => {
    setQnArraymain(()=>updatedarray);
    
  };
console.log(formData)

useEffect(()=>{
  setFormData({title:titleobj,qnData:qnArraymain,user:user})
  if (Activate) {
    setFormData(()=>({ ...formData, starttime: Activate}));
  }
  if (deActivate) {
    setFormData({ ...formData,endtime: deActivate });
  }
},[qnArraymain,titleobj,Activate,deActivate])

console.log(formData)

  const handleaddclickmain = () => {
    

    updatedcomps = qnArraymain.map((item) => {
      if (item.itemid == qnArray.itemid) {
        flag = false;
        return qnArray;
      }
      return item;
    });

    if (JSON.stringify(updatedcomps) !== JSON.stringify(qnArraymain))
      setQnArraymain(updatedcomps);
    if (flag) {
      setQnArraymain((prev) => [...prev, qnArray]);
    }
  };

  useEffect(() => {
    console.log(qnArray?.options?.optionarray)
    if (qnArray?.Qntext || qnArray?.Qntext == ""||qnArray?.Options?.optionarray) {
      console.log("usefeect worked2", qnArray);
      handleaddclickmain();
    }
  }, [qnArray]);

  

  const handleaddclick = (a) => {
    setQnArray(a);
  };

  const HandlesetSelectType = (e) => {
    setSelectType(e);
  };

  const Handlecompclick = (idx) => {
    setCompActiveIndex(idx);
  };
  console.log()

  const comps = {
    10: (
      <Formboiler
        clicked={clicked}
        // key={eleId}
        handleaddclick={handleaddclick}
        setSelectType={HandlesetSelectType}
      />
    ),
  };

  const HandleSetTitle=(obj)=>{
    setTitle(obj)
  }

  const HandleDeleteElement = (id) => {
    console.log("clicked id: ", id);
    const updatedMainArray = qnArraymain.filter((item) => {
      return item.itemid !== id;
    });
    updateMainArray(updatedMainArray);
  };



  useEffect(() => {

    if (qnArraymain)
      localStorage.setItem("mainarray", JSON.stringify(qnArraymain));
    localStorage.setItem("maintitle", JSON.stringify(titleobj));
  }, [qnArraymain,titleobj]);

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
    setQnArraymain([...qnArraymain, { itemid: k }]);
    console.log(i);
    setFormelements((prev) => [
      ...prev,
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
    // SetEleId((previd) => previd + 1);
    setCompActiveIndex(qnArraymain.length);
  };
  const [compActiveIndex, setCompActiveIndex] = useState(0);
  let isactive = true;

const HandleFormUpload= async() => {
  try {
      setType("info")
      setIsOpen(true)
      const res = await axios.post("http://localhost:5000/createform ", formData);
      console.log(res.data)
      if(res.status==200){
          setIsOpen(true)

          navigator.clipboard.writeText(`http://localhost:3000/form/${res.data.id}`);
        setType("success")
        setmessage("Form Successfully Uploaded and Link copied to the ClipBoard")
      }

  } catch (error) {
    console.log("coudnt submit my bad")
      setIsOpen(true)
      setType("error")
      setmessage("something went wrong try gain later")
  }
  
};
  

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <TitleBar setTitleobj={HandleSetTitle} data={titleobj} />
        {qnArraymain.map((item, idx) => {
          isactive = idx == compActiveIndex;

          return React.cloneElement(comps[10], {
            onClick: () => {
              Handlecompclick(idx);
            },
            isactive: { isactive },
            key: item.itemid,
            data: item,
            itemid: item.itemid,
            HandleDelete: HandleDeleteElement,
          });
        })}
        {!qnArraymain.length && (
          <div className="divs">
            <h1>welldone idiot</h1>
          </div>
        )}
        <div>
          <Snackbaralert setIsOpen={setIsOpen} isOpen={isOpen} type={type} message={message}/>
        </div>
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
      <div className={styles.BtnContainer}>
        <div
          onClick={() => (
            SetEleId((prev) => prev + 1), handleFormElements(eleId)
          )}
          className={styles.addBtn}
        >
          + Add
        </div>
        <div onClick={() => HandleFormUpload()} className={styles.submitBtn}>
          upload Form and copylink
        </div>
        <div>
          <ClockInput setdatetime={setActivate} />
          <ClockInput setdatetime={setDeactivate} />
        </div>
        {/* <div onClick={handleFormElements} className={styles.addBtn}>
        + submit
      </div> */}
      </div>
    </div>
  );
};

export default Formpage;
