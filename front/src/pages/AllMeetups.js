import { useState, useEffect } from "react";

import axios from "axios";

import MeetupList from "../components/meetup/MeetupList";

// https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState();
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  function getAllMeetups() {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/v1/meetups")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }

  useEffect(getAllMeetups, []);

  if (isLoading) {
    return (
      <section>
        {" "}
        <p> Loading ... </p>
      </section>
    );
  }

  return (
    <section>
      <h1> All Meetups Page</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
