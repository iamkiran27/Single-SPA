import { React, useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TransitionsModal from "./components/TransitionsModal";
import EditModal from "./components/EditModel";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import authClient from "./sdk/api";

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


const GET_CALENDER_DATA = gql`
  query  CalenderEvent($userID: ID!) {
  CalenderEvent(userID: $userID) {
    id
    title
    start
    end
  }
}
`;

const Calender = () => {
  const [events, setevents] = useState([]);
  const [userid, setuserid] = useState(localStorage.getItem("userId"));
  const [iseditEvent, setiseditEvent] = useState(false);
  const [currentEvent, setcurrentEvent] = useState({});
  const [isEventModal, setisEventModal] = useState(false);
  const [eventId, seteventId] = useState();

  const [calenderData, setcalenderData] = useState()


  const [getCalenderEvents, { loading, error, data }] = useLazyQuery(GET_CALENDER_DATA);


  const handleSignIn = () => {
    // this.clearSession();

    let state = authClient.generateRandomValue();
    let nonce = authClient.generateRandomValue();
    // Store state and nonce parameters into the session, so we can retrieve them after
    // user will be redirected back with access token or code (since react state is cleared in this case)
    sessionStorage.setItem("state", state);
    sessionStorage.setItem("nonce", nonce);

    authClient.authorize(state, nonce);
  };


useEffect(() => {
  const hashes = authClient.parseHash();
  console.log("hashes ;", hashes.access_token);
  

  if(hashes.access_token == undefined && localStorage.getItem("userId"))
  {
    getCalenderEvents({variables : {userID : localStorage.getItem("userId")}}).then(res=>{ setcalenderData(res.data)})

  }
  else if(hashes.access_token == undefined && !localStorage.getItem("userId")) {
    handleSignIn()

  }

else if (hashes)
{
  console.log("Inside the hashes");
  authClient.getUserInfo(hashes.access_token).then((res) => {
      console.log("Res in calender : ", res);

      localStorage.setItem("userId", res.preferred_username);  

    }).then(res => {
      getCalenderEvents({variables : {userID : localStorage.getItem("userId")}}).then(res=>{ setcalenderData(res.data)})

    })
}
 



}, [])






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
      .get(`http://34.123.211.211:8080/events/${e.event.id}`)
      .then((res) => {
        setcurrentEvent({ ...res.data });
        console.log("Current event is : ", res.data);
      })
      .catch((err) => console.log(err));
  };



  return (
    <div className="App">
      {!iseditEvent && calenderData && (
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
        { calenderData && <FullCalendar
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
          events={calenderData.CalenderEvent}
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
