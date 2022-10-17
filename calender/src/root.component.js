import Calender from "./Calender";
import ReactDOM from "react-dom";
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/',
});

export default function Root(props) {
  return <Provider value={client}><Calender />
  </Provider>;
}
