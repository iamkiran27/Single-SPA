import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { useQuery, gql,useMutation } from "@apollo/client";

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

const EDIT_EVENT = gql`
 mutation UpdateCalenderEvent($request: UpdateCalenderEventRequest!) {
  UpdateCalenderEvent(request: $request)
}
`; 
const DELETE_EVENT = gql`
  mutation DeleteCalenderEvent($eventId: ID!) {
  DeleteCalenderEvent(eventID: $eventId)
}
`;

export default function EditModal({
  isEventModal,
  setisEventModal,
  date,
  events,
  setevents,
  currentEvent,
  iseditEvent,
  userID,
  setiseditEvent,
  seteventId,
}) {
  const handleOpen = () => setisEventModal(true);
  const handleClose = () => {
    setisEventModal(false);
    setiseditEvent(false);
    seteventId("");
  };
  //   var today = new Date();
  //   var currenttime =
  //     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //   const timevar = date + "T" + currenttime;
  //   const timevar2 = "2014-08-18T21:11:54";

  //   var nowDateTime = today.toISOString();
  //   var nowDate = nowDateTime.split("T")[0];

  //   var target = new Date("2022-10-03" + "T" + currenttime);
  const [eventName, seteventName] = React.useState(currentEvent.title);
  const [startTime, setstartTime] = React.useState(dayjs(currentEvent.start));
  const [endTime, setendTime] = React.useState(dayjs(currentEvent.end));
  const [editNewEvent, editnewevent] = useMutation(EDIT_EVENT);
  const [deleteSelectedEvent, res] = useMutation(DELETE_EVENT);

  useEffect(() => {
    seteventName(currentEvent.title);
    setstartTime(currentEvent.start);
    setendTime(currentEvent.end);
  }, [currentEvent]);

  const handleStartChange = (newValue) => {
    console.log("Start time : ", newValue);
    setstartTime(newValue);
  };
  const handleEndChange = (newValue) => {
    console.log(newValue);
    setendTime(newValue);
  };
  const editEvent = () => {
    const eveid = currentEvent.id;
    // console.log(eventid);
    console.log(typeof startTime);
    if (typeof startTime !== "string") {
      var sttime = startTime.format("HH:mm:ss");
    } else var sttime = currentEvent.start.split("T")[1];

    if (typeof endTime !== "string") {
      var edtime = endTime.format("HH:mm:ss");
    } else var edtime = currentEvent.end.split("T")[1];
    var curdate = currentEvent.start.split("T")[0];
    // console.log("Start time : ", sttime);
    // console.log("End time : ", edtime);
    console.log(userID);

    const updatedevent = {
      id: eveid,
      title: eventName,
      userID:userID,
      start: `${curdate}T${sttime}`,
      end: `${curdate}T${edtime}`,
    };

    // axios.put(`https://mock.microapp.tk/events/${eveid}`, updatedevent);
    editNewEvent({
      variables: {
        "request": {
          "eventID": `${eveid}`,
          "title": `${eventName}`,
          "start": `${updatedevent.start}`,
          "end": `${updatedevent.end}`
        }
      },
    })
    var updatedEvents = events.map((event_i) => {
      if (event_i.id != eveid) return event_i;
      else return updatedevent;
    });
    setevents(updatedEvents);
    // setstartTime(target);
    // setendTime(target);
    // seteventName();
    handleClose();
    window.location.reload();
  };

  const deleteEvent = () => {
    const eveid = currentEvent.id;
    // axios.delete(`https://mock.microapp.tk/events/${eveid}`);
    deleteSelectedEvent({
      variables: {
        "eventId": `${eveid}`
      },
    }).then((res) => window.location.reload());
    // var updatedEvents = events.map((event_i) => {
    //   if (event_i.id != eveid) return event_i;
    // });
    var updatedEvents = events.filter((event) => event.id != eveid);
    setevents([...updatedEvents]);
    handleClose();
    window.location.reload();
  };
  return (
    <div>
      <Modal
        open={isEventModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* {iseditEvent == false ? ( */}
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit event
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
              onClick={editEvent}
              sx={{
                width: "180px",
                color: "#f20a7e",
                "&:hover": {
                  backgroundColor: "#f20a7e",
                  color: "white",
                },
              }}
            >
              Edit event
            </Button>
            <Button
              variant="outlined"
              onClick={deleteEvent}
              sx={{
                ml: "14px",
                width: "180px",
                color: "#f20a7e",
                "&:hover": {
                  backgroundColor: "#f20a7e",
                  color: "white",
                },
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Typography>
        </Box>
        {/* ) 
        : (
          <Box sx={style}>hlo</Box>
        )} */}
      </Modal>
    </div>
  );
}
