type Props = {
  currentPageNumber: number;
  getPreviousPage: () => void;
  getNextPage: () => void;
};

export const Pagination = (props: Props) => {
  return (
    <div>
      <button onClick={props.getPreviousPage}>back</button>
      <span>{props.currentPageNumber}</span>
      <button onClick={props.getNextPage}>forward</button>
    </div>
  );
};
