import { Box, TextField, Typography } from "@mui/material";
import {
  containerStyle3,
  dateFieldContainerStyle,
  datePickerContainerStyle,
  searchFieldContainerStyle,
} from "../../../../../constants";

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const OrderFilter = ({
  searchInput,
  setSearchInput,
  setStartDate,
  setEndDate,
}: Props) => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  return (
    <Box sx={containerStyle3}>
      <Box>
        <Typography variant="h4" component="h1" sx={{ marginBottom: "20px" }}>
          Orders
        </Typography>
        <Box component="form" sx={{ display: "flex", gap: "20px" }}>
          <Box sx={searchFieldContainerStyle}>
            <TextField
              label="Search name"
              variant="outlined"
              fullWidth
              value={searchInput}
              onChange={handleSearchInputChange}
              sx={{ width: "300px" }}
            />
          </Box>
          <Box sx={dateFieldContainerStyle}>
            <Box sx={datePickerContainerStyle}>
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={handleStartDateChange}
              />
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={handleEndDateChange}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderFilter;
