import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Grid,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { amenitiesMap } from "../icons/Icons";
import { listActions } from "../../store/list-slice";

interface IListPropertiesAmenitiesProps {
  onClickNext: () => void;
}

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  gap: 1,
  color: theme.palette.text.secondary,
}));

const ListPropertiesNameAmenities = ({
  onClickNext,
}: IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();
  const hotelNameRef = useRef<HTMLInputElement>(null);
  const amenities = useAppSelector((state) => state.list.amenities);
  const hotelAddressRef = useRef<HTMLInputElement>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nextClickHandler = () => {
    const hotelName = hotelNameRef!.current!.value;
    const hotelAddress = hotelAddressRef!.current!.value;
    console.log(hotelName);
    if (hotelName.trim().length === 0 || hotelAddress.trim().length === 0) {
      setError("Please fill out the hotel name and address");
      setShowSnackbar(true);
      return;
    }

    dispatch(
      listActions.setHotelNameAndAddress({
        hotel_name: hotelName,
        hotel_address: hotelAddress,
      })
    );
    onClickNext();
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(
        listActions.addAmenity({
          amenity: e.target.value,
        })
      );
    } else {
      dispatch(
        listActions.removeAmenity({
          amenity: e.target.value,
        })
      );
    }
  };
  return (
    <Container component="main">
      {error && showSnackbar && (
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}

      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",

          alignItems: "left",
          width: "100%",
          gap: 5,
        }}
      >
        <Box display="flex" sx={{}} flexDirection="row" gap={5} width="100%">
          <TextField
            required
            id="outlined-required"
            label="Hotel Name"
            fullWidth
            inputRef={hotelNameRef}
          />

          <TextField
            required
            id="outlined-required"
            multiline
            fullWidth
            label="Hotel Address"
            inputRef={hotelAddressRef}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h4" component="h4">
            Accessibility Features
          </Typography>
          <Typography variant="body2">Select all that apply*</Typography>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Object.keys(amenitiesMap).map((amenity) => {
            const amenityObj = amenitiesMap[amenity];
            if (amenityObj.category === "Accessibility") {
              return (
                <Grid item xs={6} key={amenity}>
                  <Box display="flex" alignItems="center">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleAmenitiesChange}
                            value={amenity}
                            // name={amenity}
                          />
                        }
                        label={
                          <Item>
                            {amenityObj.icon}
                            {amenity}
                          </Item>
                        }
                      />
                    </FormGroup>
                  </Box>
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
      <Box
        display="flex"
        width="70%"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Button
          sx={{ width: "20%", mt: 2 }}
          variant="contained"
          onClick={nextClickHandler}
          type="button"
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ListPropertiesNameAmenities;
