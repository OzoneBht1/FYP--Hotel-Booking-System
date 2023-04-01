import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, styled } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import {
  Alert,
  Autocomplete,
  Divider,
  Menu,
  MenuList,
  Snackbar,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuItem from "@mui/material/MenuItem";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useHotelSearchMutation } from "../../store/api/hotelSlice";
import { IHotelData, IQuery } from "../types/types";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
interface IFilteredListSearchForm {
  onSearch: (query: IQuery) => void;
}

const Search = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "white",

  // padding: "0 10px",
  alignItems: "center",
  paddingLeft: 14,
  justifyContent: "center",
  // padding: "0px 14px",
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,

  // width: "80%",

  width: "95%",

  height: "56px",
  // [theme.breakpoints.up("xs")]: {
  //   width: "80%",
  // },
}));

const Icon = styled(Box)(({ theme }) => ({
  width: 30,
  height: 30,
}));

const PlusMinusIcon = styled(Box)(({ theme }) => ({
  width: 25,
  height: 25,
  border: "1px solid #ccc",
  borderRadius: "50%",
}));

const BookingDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  // flexWrap: "wrap",
  paddingRight: "10px",
  [theme.breakpoints.up("md")]: {
    flexWrap: "nowrap",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#333",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const FilteredListSearch = ({ onSearch }: IFilteredListSearchForm) => {
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<Date | null>(
    null
  );
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<Date | null>(
    null
  );
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [people, setPeople] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hotelSearch, { isLoading }] = useHotelSearchMutation();
  const [hotels, setHotels] = useState<IHotelData[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const handlePeopleChange = (increment: number) => {
    if (people < 2 && increment < 0) return;
    setPeople((prev) => prev + increment);
  };

  const handleRoomChange = (increment: number) => {
    if (rooms < 2 && increment < 0) return;
    setRooms(rooms + increment);
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 6000);
  }, [openSnackbar]);

  // const textSearchHandler = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  // ) => {
  //   setSearchText(e?.target.value || "");
  // };

  const searchHotel = useCallback(
    (q: string) => {
      hotelSearch({ q })
        .unwrap()
        .then((res) => {
          setHotels(res.results);
        });
    },
    [hotelSearch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      searchHotel(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const formSubmitHandler = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setErrorMessage("");
    if (!selectedCheckInDate || !selectedCheckOutDate) {
      setOpenSnackbar(true);
      setErrorMessage("Please select check in and check out dates");
      return;
    }

    const checkInISO = selectedCheckInDate.toISOString();
    const checkOutISO = selectedCheckOutDate.toISOString();

    const checkInDate = checkInISO.split("T")[0];
    const checkOutDate = checkOutISO.split("T")[0];

    const dateFormatCheckIn = new Date(checkInISO);
    const dateFormatCheckOut = new Date(checkOutISO);
    console.log(dateFormatCheckIn, dateFormatCheckOut);
    console.log(dateFormatCheckIn > dateFormatCheckOut);
    if (dateFormatCheckIn > dateFormatCheckOut) {
      setOpenSnackbar(true);
      setErrorMessage("Check out date must be greater than check in date");
      return;
    }

    if (!!searchQuery) {
      setOpenSnackbar(true);
      setErrorMessage("Please provide a query");
      return;
    }

    const queryData = {
      checkInDate,
      checkOutDate,
      people,
      searchQuery,
      rooms,
    };
    onSearch(queryData);
  };

  return (
    <Box
      component="form"
      onSubmit={formSubmitHandler}
      display="flex"
      width="70%"
      padding={2}
      gap={1}
      alignItems="center"
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          Check out date must be greater than check in date
        </Alert>
      </Snackbar>
      <Search>
        <Icon>
          <SearchIcon />
        </Icon>
        <Autocomplete
          freeSolo
          fullWidth={true}
          options={hotels}
          disableClearable={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              // border: "1px solid yellow",
            },
            "& .MuiAutocomplete-endAdornment": {
              display: "none",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-root:hover ": {
              border: "none",
            },
            "& .Mui-focused": {
              border: "none",
            },
            "& .MuiAutocomplete-inputRoot !important": {
              padding: "0",
            },
          }}
          // value={selectedCountry || null}
          autoComplete={true}
          isOptionEqualToValue={(selectedValue, optionValue) => {
            return selectedValue.name === optionValue.name;
          }}
          autoHighlight={true}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          onInputChange={(event, newValue) => {
            setSearchQuery(newValue);
          }}
          renderInput={(params) => (
            <TextField sx={{ height: "24px" }} {...params} />
          )}
        />
      </Search>

      <BookingDetails>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <Box
            sx={{
              // display: { xs: "flex", md: "block" },
              width: "100%",

              flexWrap: "nowrap",
            }}
          > */}
          <DatePicker
            renderInput={(props) => (
              <TextField
                {...props}
                variant="filled"
                sx={{
                  marginRight: 0.5,
                  width: { xs: "48%", md: "30%" },
                  backgroundColor: "white",
                  flexShrink: 1,
                }}
              />
            )}
            label="Check-in date"
            value={selectedCheckInDate}
            onChange={(newValue) => {
              console.log(newValue);
              setSelectedCheckInDate(newValue);
            }}
          />
          <DatePicker
            renderInput={(props) => (
              <TextField
                {...props}
                variant="filled"
                sx={{
                  width: { xs: "45%", sm: "48%", md: "30%" },
                  flexShrink: 1,
                  backgroundColor: "white",
                }}
              />
            )}
            label="Check-out date"
            value={selectedCheckOutDate}
            onChange={(newValue) => {
              setSelectedCheckOutDate(newValue);
            }}
          />
          {/* </Box> */}
        </LocalizationProvider>
        <Button
          onClick={handleMenuOpen}
          color="inherit"
          variant="outlined"
          sx={{
            border: "1px solid",
            borderColor: grey[400],
            backgroundColor: "white",
            justifyContent: "flex-start",
            width: { xs: "98%", md: "35%" },
            height: "56px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            justifyContent="flex-start"
          >
            <Icon>
              <SupervisorAccountIcon
                // color={theme.palette.background.primary}
                sx={{ width: 30, height: 30, color: grey[600] }}
              />
            </Icon>
            <Typography variant="body2" textTransform="none">
              {people} {people > 1 ? "People" : "Person"}
            </Typography>

            <Typography variant="body2" textTransform="none">
              {rooms} {rooms > 1 ? "Rooms" : "Room"}
            </Typography>
          </Stack>
        </Button>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 250,
              border: "1px solid #d3d4d5",
            },
          }}
        >
          <MenuList>
            <MenuItem>
              <StyledBox>
                <StyledTypography>Rooms:</StyledTypography>
                <Box display="flex" alignItems="center">
                  <Button onClick={() => handleRoomChange(-1)}>
                    <PlusMinusIcon>
                      <RemoveIcon />
                    </PlusMinusIcon>
                  </Button>
                  <StyledTypography>{rooms}</StyledTypography>
                  <Button onClick={() => handleRoomChange(1)}>
                    <PlusMinusIcon>
                      <AddIcon />
                    </PlusMinusIcon>
                  </Button>
                </Box>
              </StyledBox>
            </MenuItem>
            <Divider />

            <MenuItem>
              <StyledBox>
                <StyledTypography>People:</StyledTypography>
                <Box display="flex" alignItems="center">
                  <Button onClick={() => handlePeopleChange(-1)}>
                    <PlusMinusIcon>
                      <RemoveIcon />
                    </PlusMinusIcon>
                  </Button>
                  <StyledTypography>{people}</StyledTypography>
                  <Button onClick={() => handlePeopleChange(1)}>
                    <PlusMinusIcon>
                      <AddIcon />
                    </PlusMinusIcon>
                  </Button>
                </Box>
              </StyledBox>
            </MenuItem>
          </MenuList>
        </Menu>
      </BookingDetails>
      <Button
        type="submit"
        variant="contained"
        sx={{
          // bottom: -10,
          width: "40%",
          height: "56px",
          borderRadius: "10px",
          backgroundColor: "primary.light",
          color: "white",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default FilteredListSearch;
