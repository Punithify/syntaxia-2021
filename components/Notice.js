import { ListGroupItem, ListGroup } from "reactstrap";

export default function Notice() {
  return (
    <>
      <ListGroup className=" mt-2 w-20 h-20">
        <ListGroupItem color="info">
          <h4>Note :</h4>
          <ul>
            <li>
              Registrations for all the events are only processed through the
              website.
            </li>
            <li>
              Everyone willing to participate in SYNTAXIA must register
              individually (even for group events, all the team members are
              expected to register individually).
            </li>
            <li>
              Participants can pay once and participate in any number of events.
            </li>
            <li>
              All team members must decide a unique group name before
              registering for the group events.
            </li>
            <li>
              {" "}
              Please avoid paying more than once. Refund of registration fee
              will not be entertained.
            </li>
          </ul>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}
