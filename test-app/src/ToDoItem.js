import moment from "moment";

export default function ToDoItem(props) {
  return (
    <>
      <tr>
        <th scope="row">{props.id}</th>
        <td>{props.name}</td>
        <td>{moment(props.dueDate).format("YYYY-MM-DD")}</td>
        <td>{props.done ? "Done" : "Not Done"}</td>

        <button
          type="button"
          className="btn-close"
          onClick={() => props.onDelete(props)}
        ></button>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => props.onEdit(props)}
        >
          Edit
        </button>
      </tr>
    </>
  );
}

/*
sample to-do item:

{id: 1,
name: "email x",
dueDate: (date),
done: (bool)}

*/
