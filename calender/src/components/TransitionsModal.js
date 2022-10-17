import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  isModelOpen,
  setisModelOpen,
  setisAddOpen,
  date,
  eventid,
  events,
  setevents,
}) {
  const handleOpen = () => setisModelOpen(true);
  const handleClose = () => {
    setisModelOpen(false);
    // setisAddOpen(false);
  };
  var today = new Date();
  var currenttime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const timevar = date + "T" + currenttime;
  const timevar2 = "2014-08-18T21:11:54";

  var nowDateTime = today.toISOString();
  var nowDate = nowDateTime.split("T")[0];

  var target = new Date("2022-10-03" + "T" + currenttime);

  const [startTime, setstartTime] = React.useState(dayjs(target));
  const [endTime, setendTime] = React.useState(dayjs(target));

  const [eventName, seteventName] = React.useState();

  const handleStartChange = (newValue) => {
    console.log("Start time : ", newValue);
    setstartTime(newValue);
  };
  const handleEndChange = (newValue) => {
    console.log(newValue);
    setendTime(newValue);
  };
  const addEvent = () => {
    const eveid = eventid + 1;
    console.log(eventid);
    var sttime = startTime.format("HH:mm:ss");
    var edtime = endTime.format("HH:mm:ss");
    console.log("Start time : ", sttime);
    console.log("End time : ", edtime);

    const newevent = {
      id: Date.now(),
      title: eventName,
      start: `${date}T${sttime}`,
      end: `${date}T${edtime}`,
    };

    console.log("Event  : ", newevent);

    axios.post(`http://localhost:8080/events`, newevent);
    setevents([...events, newevent]);
    setstartTime(target);
    setendTime(target);
    seteventName();
    handleClose();
  };
  return (
    <div>
      <Modal
        open={isModelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add an event
            </Typography>

            <Box
              sx={{ marginLeft: "auto", cursor: "pointer" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>Event name :{"      "}</Typography>
              <OutlinedInput
                onChange={(event) => {
                  seteventName(event.target.value);
                }}
                variant="standard"
                placeholder="Add an event"
                label="Event"
                value={eventName}
              />
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                <Typography sx={{ mr: 2 }}>Start Time :</Typography>
                <TimePicker
                  label="Time"
                  value={startTime}
                  onChange={handleStartChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                <Typography sx={{ mr: 2 }}>End Time :</Typography>
                <TimePicker
                  label="Time"
                  value={endTime}
                  onChange={handleEndChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </LocalizationProvider>
          </Typography>
          <Typography sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              onClick={addEvent}
              sx={{
                width: "222px",
                color: "#f20a7e",
                "&:hover": {
                  backgroundColor: "#f20a7e",
                  color: "white",
                },
              }}
            >
              Add event
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
