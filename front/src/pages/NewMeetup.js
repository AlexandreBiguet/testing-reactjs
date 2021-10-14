import { useHistory } from "react-router";

import NewMeetupForm from "../components/meetup/NewMeetupForm";

function NewMeetupPage() {
  const history = useHistory();

  function addMeetupHandler(newMeetup) {
    // could use axios

    console.log(newMeetup);

    fetch("http://localhost:8080/v1/meetup", {
      method: "POST",
      body: JSON.stringify({
        title: "s",
        image: "http://www.coucou.fr",
        address: "s",
        description: "s",
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          history.replace("/");
        } else {
          console.error(
            "something wrong: " + response.status + " : " + response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("POST failed: " + error.message);
      });
  }

  return (
    <section>
      <h1> Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
