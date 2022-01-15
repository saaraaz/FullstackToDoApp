import ToDoItem from "./ToDoItem";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

export default function ToDoList() {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [done, setDone] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit requested");
    if (!editId) {
      onAddItem();
    } else {
      onUpdateItem(editId);
    }
  };

  const onGetAll = () => {
    axios
      .get("https://localhost:44316/api/todos")
      .then((response) => setTodoList(response.data))
      .catch((err) => console.warn(err));
  };

  const onAddItem = () => {
    let newTask = { name, dueDate, done };
    axios
      .post("https://localhost:44316/api/todos", newTask)
      .then(() => console.log("Success!"))
      .catch((err) => console.warn(err));
  };

  const onUpdateItem = (itemId) => {
    let updatedTask = { name, dueDate, done };
    axios
      .put(`https://localhost:44316/api/todos/${itemId}`, updatedTask)
      .then(() => console.log("Success!"))
      .catch((err) => console.warn(err));
  };

  const onDeleteRequested = (anItem) => {
    console.log("Delete requested for item: ", anItem);
    axios
      .delete(`https://localhost:44316/api/todos/${anItem.id}`)
      .then((anItem) =>
        setTodoList(todoList.filter((task) => task.id !== anItem.id))
      )
      .catch((err) => console.warn(err));
  };

  const onEditRequested = (anItem) => {
    console.log("Edit requested for item: ", anItem);
    setEditId(anItem.id);
    setName(anItem.name);
    setDueDate(anItem.dueDate);
    setDone(anItem.done);
  };

  return (
    <div className="container">
      <form>
        <div className="form-group margin-top">
          <label htmlFor="formGroupExampleInput"> Name</label>
          <input
            type="text"
            value={name}
            className="form-control"
            placeholder="please enter task name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Due Date</label>
          <input
            type="date"
            //value={dueDate.substring(0, dueDate.indexOf("T"))}
            value={moment(dueDate).format("YYYY-MM-DD")}
            className="form-control"
            placeholder="please enter due date"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Done </label>
          <input
            type="checkbox"
            checked={done}
            aria-label="Checkbox for following text input"
            onChange={(e) => setDone(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          className="btn btn btn-warning"
          onClick={handleSubmit}
        >
          Add/Edit Task
        </button>
      </form>
      <br />
      <button className="btn btn-success" onClick={onGetAll}>
        ToDo List
      </button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Due on</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((aTask) => (
            <ToDoItem
              key={aTask.id}
              {...aTask}
              onDelete={onDeleteRequested}
              onEdit={onEditRequested}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
