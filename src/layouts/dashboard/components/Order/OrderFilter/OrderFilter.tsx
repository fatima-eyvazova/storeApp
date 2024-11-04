import { Box, TextField, Typography } from "@mui/material";
import {
  containerStyle3,
  dateFieldContainerStyle,
  datePickerContainerStyle,
} from "../../../../../constants";
import { OrderFilters } from "../../../pages/Orders/type";

const OrderFilter = ({ setStartDate, setEndDate }: OrderFilters) => {
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
