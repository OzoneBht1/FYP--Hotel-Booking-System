import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import {
  Avatar,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { IBookingCreate, IPaginated } from "./types/types";

interface ICustomersTableProps {
  count?: number;
  items: IPaginated<IBookingCreate>;
  onPageChange: (page: number) => void;
  page?: number;
  rowsPerPage?: number;
  loading?: boolean;
  // selected?: any[];
  //
}

export const BookingTable = (props: ICustomersTableProps) => {
  const { count = 0, items, page = 0, rowsPerPage = 0 } = props;

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.onPageChange(newPage);
  };
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment Id</TableCell>
              <TableCell>Hotel</TableCell>

              <TableCell>Payee</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.results?.map((booking) => {
              // const createdAt = customer.createdAt;

              return (
                <TableRow hover key={booking.id}>
                  <TableCell>{booking.paymentIntentId}</TableCell>
                  <TableCell>{booking.hotel_name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.check_in}</TableCell>
                  <TableCell>{booking.check_out}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        page={page}
        backIconButtonProps={
          props.loading
            ? {
                disabled: props.loading,
              }
            : undefined
        }
        nextIconButtonProps={
          props.loading
            ? {
                disabled: props.loading,
              }
            : undefined
        }
        rowsPerPage={rowsPerPage}
      />
    </Card>
  );
};

export default BookingTable;
