import Pagination from "react-bootstrap/Pagination";
import { range } from "../../Util/Array";


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

  const toPaginationElement = (page: number) => {
    return (
      <Pagination.Item
        onClick={() => onPageChange(page)}
        active={page === currPage}
        key={page}
      >
        {page}
      </Pagination.Item>
    );
  }

  const toPagination = () => {
    const offset = 5;
    // Less than five pages
    if (pages.length <= offset)
      return pages.map((page) => {
        return toPaginationElement(page);
      });

    // Current page is close to the start
    if (currPage <= offset) {
      return [
        ...range(1, offset).map(toPaginationElement),
        <Pagination.Ellipsis />
      ];
    }

    // Current page is close to the end
    if (currPage >= pages.length - offset) {
      return [
        <Pagination.Ellipsis />,
        ...range(pages.length - offset, pages.length)
          .map(toPaginationElement),
      ];
    }

    // Current page is in the middle
    return [
      toPaginationElement(1),
      <Pagination.Ellipsis />,
      toPaginationElement(currPage - 1),
      toPaginationElement(currPage),
      toPaginationElement(currPage + 1),
      <Pagination.Ellipsis />,
      toPaginationElement(pages.length)
    ];

  }

  return (
    <Pagination>
      <Pagination.First onClick={first} />
      <Pagination.Prev onClick={prev} />

      {toPagination()}

      <Pagination.Next onClick={next} />
      <Pagination.Last onClick={last} />
    </Pagination>
  );
}

export default Paginator;
