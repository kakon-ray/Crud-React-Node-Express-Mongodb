import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../userContext/userContext";
import "./Delete";

import { Button, Modal } from "react-bootstrap";

export default function Delete() {
  const { id } = useParams();
  const [users, setUsers] = useContext(userContext);

  console.log(users[id]);

  const deleteUser = (id) => {
    const proceed = window.confirm("Are you deleted item");

    if (proceed) {
      const url = `http://localhost:5000/item/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const newServices = users.filter((service) => service._id != id);
            setUsers(newServices);
          }
        });
    }
  };

  return (
    <div>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Link to="/">
            <Button variant="secondary">Cancle</Button>
          </Link>
          <Link to="/">
            <Button onClick={() => deleteUser(id)} variant="danger">
              Delete
            </Button>
          </Link>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
