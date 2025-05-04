import PropTypes from "prop-types";

export type GetOrderItem = {
  success: boolean;
  message: string;
  _id: string;
  customer: {
    userId: string;
    name: string;
    email?: string;
  };
  status: string;
  products: {
    productId: string;
    productCount: number;
    productName: string;
    productPrice: number;
  }[];
  method: string;
  total: number;
  completed: string | null;
  createdAt: string;
  updatedAt: string;
  totalCount: number;
};

export type GetOrdersData = {
  data: GetOrderItem[];
  totalCount: number;
};

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;

  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActionsPropTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActionsPropTypes;

export interface OrderTableProps {
  list: GetOrderItem[];
  searchInput: string;
  totalCount: number;
  page: number;
  perPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  setList: React.Dispatch<React.SetStateAction<GetOrderItem[]>>;
}

export interface TableItemProps {
  setList: React.Dispatch<React.SetStateAction<GetOrderItem[]>>;
  item: GetOrderItem;
}

export interface OrderFilters {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}
