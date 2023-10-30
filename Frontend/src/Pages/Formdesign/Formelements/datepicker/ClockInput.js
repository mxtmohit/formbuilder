import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ClockInput({ setdatetime, label,time }) {

  const datetime=new Date(time)
  //alert(time)
  const [value, setValue] = React.useState(dayjs(datetime??""));

  React.useEffect(() => {
//console.log(value);
  }, [value]);

  const handlereset = () => {
    setValue("");
    setdatetime("");
  };
  const handleChange = (time) => {
    setValue(time);
    setdatetime(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          sx={{ backgroundColor: "white", color: "black" }}
          label={label}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue);
          }}
        />
      </DemoContainer>
      <div onClick={handlereset}>reset</div>
    </LocalizationProvider>
  );
}
