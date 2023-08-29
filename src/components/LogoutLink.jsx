import axios from "axios";
import { Nav } from "react-bootstrap";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Nav>
      <Nav.Link href="/" onClick={handleClick}>
        Logout
      </Nav.Link>
    </Nav>
  );
}
