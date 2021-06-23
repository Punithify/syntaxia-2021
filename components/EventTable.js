import MySpinner from "./MySpinner";
import { Table } from "reactstrap";

export default function EventTable({ events }) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Slots Left</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events &&
            events.map((singleEvent) => (
              <tr key={singleEvent.id}>
                <td>{singleEvent.label}</td>
                <td>
                  {singleEvent.seats === 0 ? "event closed" : singleEvent.seats}{" "}
                </td>
              </tr>
            ))
          ) : (
            <MySpinner />
          )}
        </tbody>
      </Table>
    </>
  );
}
