import { Box, TextField, Button, Typography } from "@mui/material";

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

  return (
    <Box
      sx={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}
    >
      <Box>
        <Typography variant="h4" component="h1" sx={{ marginBottom: "20px" }}>
          Orders
        </Typography>
        <Box component="form" sx={{ display: "flex", gap: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            <TextField
              label="Search name"
              variant="outlined"
              fullWidth
              value={searchInput}
              onChange={handleSearchInputChange}
              sx={{ width: "300px" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderFilter;
