import PropTypes from "prop-types";
const TablePaginationActionsPropTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
export default TablePaginationActionsPropTypes;
