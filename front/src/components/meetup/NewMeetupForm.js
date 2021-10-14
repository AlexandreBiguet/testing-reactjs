import { useRef } from "react";

import Card from "../ui/Card";

import classes from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault(); // Preventing the browser to submit the form to the server

    // For reading values, using Ref works OK. If we want to change the value, we probably want to use state
    const title = titleInputRef.current.value;
    const image = imageInputRef.current.value;
    const address = addressInputRef.current.value;
    const description = descriptionInputRef.current.value;

    const meetup = {
      title: title,
      image: image,
      address: address,
      description: description,
    };

    props.onAddMeetup(meetup);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title"> Title </label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="image"> Image </label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="address"> Address </label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="description"> Description </label>
          <textarea
            required
            id="description"
            rows="10"
            ref={descriptionInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button> Add Meetup </button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
