import {  
  useEffect, 
  useState, 
  MouseEvent,
  ChangeEvent
} from 'react';
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Collapse from "@mui/material/Collapse";
import TableBody from '@mui/material/TableBody';
import TableHead from "@mui/material/TableHead";
import TableCell from '@mui/material/TableCell';
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

type addressType = {
  street: string,
  suite: string,
  city: string,
  zipcode: number
}

type companyType = {
  name: string,
  catchPhrase: string,
  bs: string
}

type userType = {
  id: number,
  name: string, 
  username: string, 
  email: string,
  address: addressType
  phone: string, 
  website: string,
  company: companyType
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  id: number,
  name: string,
  username: string,
  email: string,
  address: addressType,
  phone: string, 
  website: string,
  company: companyType
  ) {
    return {
      id,
      name,
      username,
      email,
      address,
      phone, 
      website,
      company
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [openAddress, setOpenAddress] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>

        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right" style={{ width: 225 }}>{row.name}</TableCell>
        <TableCell align="right" style={{ width: 225 }}>{row.username}</TableCell>
        <TableCell align="right" style={{ width: 225 }}>{row.email}</TableCell>
        <TableCell align="right" style={{ width: 75 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenAddress(!openAddress)}
          >
            {openAddress ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" style={{ width: 225 }}>{row.phone}</TableCell>
        <TableCell align="right" style={{ width: 225 }}>{row.website}</TableCell>
        <TableCell align="right" style={{ width: 75 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCompany(!openCompany)}
          >
            {openCompany ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openAddress} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Address
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Street</TableCell>
                    <TableCell align="right">Suite</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Zipcode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.address.street}
                    </TableCell>
                    <TableCell align="right">{row.address.suite}</TableCell>
                    <TableCell align="right">{row.address.city}</TableCell>
                    <TableCell align="right">{row.address.zipcode}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>


      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openCompany} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Company
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Catch Phrase</TableCell>
                    <TableCell align="right">BS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.company.name}
                    </TableCell>
                    <TableCell align="right">{row.company.catchPhrase}</TableCell>
                    <TableCell align="right">{row.company.bs}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </>
  );
}

export default function DataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [rows, setRows] = useState<userType[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setRows(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    // @ts-ignore
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  type orderType = "asc" | "desc";

  const [orderDirection, setOrderDirection] = useState<orderType>("asc");

  const sortArray = (arr: userType[], orderBy: orderType) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a: userType, b: userType) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
      case "desc":
        return arr.sort((a: userType, b: userType) =>
          a.id < b.id ? 1 : b.id < a.id ? -1 : 0
        );
    }
  };

  const handleSortRequest = () => {
    setRows(sortArray(rows, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
          <TableCell align="left" onClick={handleSortRequest}>
              <TableSortLabel active={true} direction={orderDirection}>
                Id
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Website</TableCell>
            <TableCell align="right">Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: userType) => (
            <Row key={row.id} row={row} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[3, 6, 9, { label: 'All', value: -1 }]}
              colSpan={8}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}