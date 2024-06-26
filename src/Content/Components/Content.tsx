import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";

const Content = () => {
  return (
    <nav>
      <ListGroup>
        <ListGroup.Item>
          <NavLink to="/">
            Home
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item>
          <NavLink to="/phrases">
            Phrases
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item>
          <NavLink to="/demo">
            Components Demo
          </NavLink>
        </ListGroup.Item>
      </ListGroup>
    </nav>
  );
}

export default Content;
