import Pagination from "react-bootstrap/Pagination";


type Props = {
  pages: number[];
  currPage: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ pages, currPage, onPageChange }: Props) => {
  const prev = () => {
    onPageChange(
      currPage > 1
        ? currPage - 1
        : 1
    );
  };

  const next = () => {
    onPageChange(
      currPage < pages.length
        ? currPage + 1
        : pages.length
    );
  };

  const first = () => {
    onPageChange(1);
  }

  const last = () => {
    onPageChange(pages.length);
  }

  return (
    <Pagination>
      <Pagination.First onClick={first} />
      <Pagination.Prev onClick={prev} />

      {pages.length && pages.map((page) => {
        return (
          <Pagination.Item
            onClick={() => onPageChange(page)}
            active={page === currPage}
            key={page}
          >
            {page}
          </Pagination.Item>
        );
      })}

      <Pagination.Next onClick={next} />
      <Pagination.Last onClick={last} />
    </Pagination>
  );
}

export default Paginator;
