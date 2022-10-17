import { React, useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TransitionsModal from "./components/TransitionsModal";
import EditModal from "./components/EditModel";
import { useQuery, gql } from "@apollo/client";
import "./calender.css";
// const events1 = [
//   {
//     id: 1,
//     title: "Buy mac",
//     start: "2022-10-02T18:00:00",
//     end: "2021-10-02T19:00:00",
//   },
//   {
//     id: 2,
//     title: "event 2",
//     start: "2022-10-16T13:45:00",
//     end: "2022-10-16T18:00:00",
//   },
// ];

const Calender = () => {
  const [events, setevents] = useState([]);
  const [userid, setuserid] = useState("user1");
  const [iseditEvent, setiseditEvent] = useState(false);
  const [currentEvent, setcurrentEvent] = useState({});
  const [isEventModal, setisEventModal] = useState(false);
  const [eventId, seteventId] = useState();
  

const { error, loading, data } = useQuery(gql`
  query {
  CalenderEvent(userID: "user1") {
    id
    title
    start
    end
  }
}
`);

if (data) {
  console.log("Events are ", data.CalenderEvent);
  // setevents(data.CalenderEvent);
}

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/events?userID=${userid}`)
  //     .then((res) => {
  //       setevents(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(data)

  const [isModelOpen, setisModelOpen] = useState(false);
  const [date, setdate] = useState("date");

  const dateClick = (e) => {
    console.log("Date is  , ", e.dateStr.split("T")[0]);
    setdate(e.dateStr.split("T")[0]);
    setisModelOpen(true);
  };

  const eventClick = (e) => {
    console.log("event is  , ", e.event.id);
    setisEventModal(true);
    seteventId(e.event.id);
    setiseditEvent(true);

    axios
      .get(`http://localhost:8080/events/${e.event.id}`)
      .then((res) => {
        setcurrentEvent({ ...res.data });
        console.log("Current event is : ", res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {!iseditEvent&&data && (
        <TransitionsModal
          isModelOpen={isModelOpen}
          setisModelOpen={setisModelOpen}
          date={date}
          events={events}
          setevents={setevents}
          iseditEvent={iseditEvent}
          setiseditEvent={setiseditEvent}
          eventId={eventId}
          userid={userid}
        />
      )}
      <EditModal
        isEventModal={isEventModal}
        setisEventModal={setisEventModal}
        setisAddOpen={setisModelOpen}
        events={events}
        seteventId={seteventId}
        iseditEvent={iseditEvent}
        setiseditEvent={setiseditEvent}
        setevents={setevents}
        date={date}
        currentEvent={currentEvent}
        userID={userid}
      />
      <Box sx={{ marginTop: "70px" }}>
        {data&&<FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            center: "dayGridMonth,timeGridWeek,timeGridDay new",
          }}
          customButtons={{
            new: {
              text: "-",
              click: () => console.log("new event"),
            },
          }}
          events={data.CalenderEvent}
          eventColor="#f20a7e"
          nowIndicator
          dateClick={dateClick}
          eventClick={eventClick}
        />}
      </Box>
    </div>
  );
};

export default Calender;
