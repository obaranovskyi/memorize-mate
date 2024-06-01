import Form from "react-bootstrap/Form";

type Props = {
  pageSize: number;
  onPageSizeChanged: (pageSize: number) => void;
};

const AmountPerPage = ({ pageSize, onPageSizeChanged }: Props) => {
  return (
    <Form.Select
      aria-label="Amount per page"
      value={pageSize}
      onChange={e => onPageSizeChanged(+e.target.value)}
      as="select"
    >
      <option value="5">5</option>
      <option value="15">15</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </Form.Select>
  );
}

export default AmountPerPage;
