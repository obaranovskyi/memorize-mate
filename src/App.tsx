import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Content from './Content/Components/Content';
import { Outlet, useNavigate } from 'react-router-dom';


function App() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  if (!user) navigate('/sign-in');

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={12} className="text-center">
          <h1>Memorize Mate</h1>
          <Row className="mt-5">
            <Col xs={{ span: 12, order: 2 }} md={9}>
              <Outlet />
            </Col>
            <Col xs={{ span: 12, order: 1 }} className="my-4" md={3}>
              <Content />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
