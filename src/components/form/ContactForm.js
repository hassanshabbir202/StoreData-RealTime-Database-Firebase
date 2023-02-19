import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const ContactForm = () => {
  const [data, setData] = useState({
    email: "",
    select: "",
    password: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const { email, select, password } = data;
    if (email && select && password) {
      let response = await fetch(
        "https://realtime-database-698d7-default-rtdb.firebaseio.com/Contact.json",
        {
          method: "POST",
          headers: {
            ContentType: "website/json",
          },
          body: JSON.stringify({
            email,
            select,
            password,
          }),
        }
      );
      if (response) {
        alert("Data Stored!");
        setData({
          email: "",
          select: "",
          password: "",
        });
      } else {
        alert("plz Fill the Data");
      }
    }
  };

  return (
    <>
      <Container>
        <Form>
          <h1 className="my-4">Basic Form</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              style={{ width: "500px" }}
              autoComplete="off"
              value={data.email}
              onChange={handleChange}
              name="email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            style={{ width: "500px" }}
            value={data.select}
            onChange={handleChange}
            name="select"
          >
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              style={{ width: "500px" }}
              autoComplete="off"
              value={data.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={formSubmit}>
            Submit Form
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ContactForm;
