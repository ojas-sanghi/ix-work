import React, { useState } from "react";

import { Task } from "../../models/task";
import Spinner from "../common/Spinner";

export default function TaskInput(props) {
  const [taskName, setTaskName] = useState("");
  const [saving, setSaving] = useState(false);

  async function onFormSubmitted(event) {
    event.preventDefault();

    // create a new task
    const task = new Task(null, taskName, false);

    setSaving(true);
    try {
      await props.onTaskCreated(task);
    } catch (err) {
      console.log(err);
    }
    setSaving(false);
      
    setTaskName("");
  }

  return (
    <div className="mt-4">
      <form onSubmit={onFormSubmitted}>
        <div className="input-group mb-3">
          <input
            value={taskName}
            onChange={(event) => {
              setTaskName(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Enter task name"
          />

          <button className="btn btn-outline-secondary" type="submit">
            {
              saving ? <Spinner variant="info"/> : "+"
            }
          </button>
        </div>
      </form>
    </div>
  );
}