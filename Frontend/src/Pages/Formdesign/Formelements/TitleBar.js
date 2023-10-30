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
  }, []);

  useEffect(() => {
    setTitleobj({
      title: title,
      description: description,
    });
  }, [title, description]);

  return (
    <div className={styles.Container}>
      <div className={styles.Title}>
        <Input
          sx={{ fontSize: "2rem" }}
          value={title}
          onChange={(event) => setTitle(()=>event.target.value)}
          placeholder="Title"
          fullWidth
        />
      </div>
      <div className={styles.Description}>
        <Input
          value={description}
          onChange={(event) => setDescription(()=>event.target.value)}
          placeholder="Description"
          fullWidth
        />
      </div>
    </div>
  );
};

export default TitleBar;
