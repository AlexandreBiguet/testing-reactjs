import { useHistory } from "react-router";

import NewMeetupForm from "../components/meetup/NewMeetupForm";

import axios from "axios";

function NewMeetupPage() {
  const history = useHistory();

  function addMeetupHandler(newMeetup) {
    axios.post("http://localhost:8080/v1/meetup", newMeetup).then(
      (response) => {
        if (response.status === 200) {
          history.replace("/");
        } else {
          console.error(
            "something wrong: " + response.status + " : " + response.statusText
          );
        }
      },
      (error) => {
        console.error("POST failed: " + error.message);
      }
    );
  }

  return (
    <section>
      <h1> Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
