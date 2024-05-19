import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Content from './Content/Components/Content';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={10} className="text-center">
          <h1>Memorize Mate</h1>
          <div className="my-4">
            <Content />
          </div>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
