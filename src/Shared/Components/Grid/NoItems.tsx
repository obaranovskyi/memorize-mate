import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from './NoItems.module.css';

type Props = {
  label?: string;
};

const NoItems = ({ label }: Props) => {
  const defaultLabel = 'No items found';

  return (
    <Row className={`p-2 d-flex ${styles['no-items']}`}>
      <Col>{label ?? defaultLabel}</Col>
    </Row>
  );
}

export default NoItems;
