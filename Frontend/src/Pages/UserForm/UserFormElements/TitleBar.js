import React, { useEffect, useState } from "react";
import styles from "./TitleBar.module.css";
import Input from "@mui/material/Input";
const TitleBar = ({ setTitleobj, data }) => {
  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [titledes, settitlesed] = useState();

  useEffect(() => {
    console.log(data);
    if (data) {
      setTitle(data?.title); setDescription(data?.description);
    }
  }, [data]);

 
  return (
    <div className={styles.Container}>
      <div className={styles.Title}>
       {title}
        
      </div>
      <div className={styles.Description}>
       {description}
        
      </div>
    </div>
  );
};

export default TitleBar;
