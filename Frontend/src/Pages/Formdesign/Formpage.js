import React, { useEffect, useMemo, useState } from "react";
import styles from "./Formpage.module.css";
import { MenuItem, Select, Snackbar, TextField } from "@mui/material";
import Formboiler from "./Formelements/Formboiler";
import TitleBar from "./Formelements/TitleBar";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import ClockInput from "./Formelements/datepicker/ClockInput";
import Snackbaralert from "./Formelements/shared/Snackbaralert";
import { useSelector } from "react-redux";
import Navbar from "./Formelements/Navbar";
import ResponsePage from "../Dashboard/DashboarComponent/AllResponsePage/ResponsePage";
import { useLocation } from "react-router-dom";

let i = 0;
const Formpage = ({ formid1, qnArraymain1, titleobj1, formDataValues,starttime,endtime }) => {
  //console.log("formdata values", formDataValues);
  const location = useLocation();
  // const [formState,setFormState]=useState()
  const formState = formDataValues;
//console.log("sss", formState);
  const [selectedtype, setSelectType] = useState(0);
  const [titleobj, setTitle] = useState(
    // formState.title.title
    titleobj1 ?? JSON.parse(localStorage.getItem("maintitle")) ?? {}
  );
  //console.log("dsdsd", formState?.title);

  const [message, setmessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [qnArray, setQnArray] = useState({});

  // const [formid,setFormid]=useState(undefined)
  // const [user,setUser]=useState("test@123")

  const [formData, setFormData] = useState({});
  const [showResponse, setshowResponse] = useState(false);
  const [Activate, setActivate] = useState();
  const [deActivate, setDeactivate] = useState();
  const [qnArraymain, setQnArraymain] = useState(
    qnArraymain1 ??
      JSON.parse(localStorage.getItem("mainarray")) ?? [{ itemid: 0 }]
  );

    const [fieldsEmpty,setFieldsEmpty]=useState(false)
    let timestart
    let timeend

  const [clicked, setclicked] = useState(0);
  // console.log(qnArraymain1)
  const [eleId, SetEleId] = useState(
    qnArraymain1?.length > 0 ??
      qnArraymain1[qnArraymain1?.length - 1] ??
      JSON.parse(localStorage.getItem("mainarray"))?.length
      ? qnArraymain[qnArraymain?.length - 1]?.itemid + 1
      : 1
  );
  const { email, token } = useSelector((state) => state.userSlice);

  //console.log("ggdd", formState);

 // console.log("qnarray", qnArray);
  if (JSON.parse(localStorage.getItem("mainarray")))
    i = JSON.parse(localStorage.getItem("mainarray"))?.length;

  let updatedcomps;

  const [formid, setFormid] = useState(formid1);
 // console.log("titleid", formid);
  let flag = true;

  const updateMainArray = (updatedarray) => {
    setQnArraymain(() => updatedarray);
  };
//console.log(formData);

  useEffect(() => {
    setFormData({ title: titleobj, qnData: qnArraymain, user: email });
    if (Activate) {
      setFormData(() => ({ ...formData, starttime: Activate }));
    }
    if (deActivate) {
      setFormData({ ...formData, endtime: deActivate });
    }
  }, [qnArraymain, titleobj, Activate, deActivate]);

  //console.log(formData);

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
   // console.log(qnArray?.options?.optionarray);
    if (
      qnArray?.Qntext ||
      qnArray?.Qntext == "" ||
      qnArray?.Options?.optionarray
    ) {
     // console.log("usefeect worked2", qnArray);
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
 // console.log();

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

  const HandleSetTitle = (obj) => {
    setTitle(obj);
  };

  const HandleDeleteElement = (id) => {
//console.log("clicked id: ", id);
    const updatedMainArray = qnArraymain.filter((item) => {
      return item.itemid !== id;
    });
    updateMainArray(updatedMainArray);
  };

  useEffect(() => {
    let keys = ["mainarray", "maintitle"];

    if (qnArraymain){
      localStorage.setItem("mainarray", JSON.stringify(qnArraymain));
    localStorage.setItem("maintitle", JSON.stringify(titleobj));
    }
    


    
  }, [qnArraymain, titleobj]);

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
   // console.log(i);
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

  const HandleFormUpload = async () => {

    // console.log("check",fieldsEmpty)
    if(!fieldsEmpty && titleobj.title){
    try {
      setType("info");
      setIsOpen(true);
      const res = await axios.post("/createform ", {
        formData,
        token,
        formid,
      });
      //alert(formData)
      // console.log(res.data.me)
      if (res.status == 200) {
        setIsOpen(true);
        setFormid(res.data.id);
        navigator.clipboard.writeText(`/form/${formid}`);
        setType("success");
        setmessage(
          "Form Successfully Uploaded and Link copied to the ClipBoard"

        );

        // console.log("ttff", res.data);
        // timestart = res.data.starttime;
        // timeend = res.data.endtime;
      } else if (res.status == 202) {
        setIsOpen(true);

        navigator.clipboard.writeText(
          `/form/${res.data.id}`
        );
        setType("success");
        setmessage(res.data.message);
      }
      
    } catch (error) {
     // console.log("couldnt submit my bad");
      setIsOpen(true);
      setType("error");
      setmessage("something went wrong try gain later");
    }
  }else{
    setIsOpen(true);
    setType("error");
    setmessage("please make sure that no fields are empty");
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
            setFieldsEmpty:setFieldsEmpty
          });
        })}
        {!qnArraymain.length && (
          <div className="divs">
            <h1>welldone idiot</h1>
          </div>
        )}
        <div>
          <Snackbaralert
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            type={type}
            message={message}
          />
        </div>
        <div className={styles.BtnContainer}>
          <div>
            <div
              onClick={() => (
                SetEleId((prev) => prev + 1), handleFormElements(eleId)
              )}
              className={styles.addBtn}
            >
              + Add
            </div>
            <div
              onClick={() => HandleFormUpload()}
              className={styles.submitBtn}
            >
              upload Form and copylink
            </div>
          </div>
          <div>
            <ClockInput
              label={"Set Start Time"}
              sx={{ backgroundColor: "white" }}
              setdatetime={setActivate}
              time={timestart}
            />{console.log("dd",timeend)}
            <ClockInput label={"Set Expiry Time"} setdatetime={setDeactivate} time={endtime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formpage;
