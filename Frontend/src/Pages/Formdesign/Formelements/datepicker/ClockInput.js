import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ClockInput({setdatetime,label}) {
  const [value, setValue] = React.useState(dayjs(""));

  const handlereset=()=>{
    setValue("")
    setdatetime("");
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
      
        <DateTimePicker sx={{backgroundColor:"white",color:"black"}}
         label={label}
          value={value}
          onChange={(newValue) => {setValue(()=>newValue);setdatetime(()=>value)}}
        />
      </DemoContainer>
      <div onClick={handlereset}>reset</div>
      
      
    </LocalizationProvider>
  );
}
