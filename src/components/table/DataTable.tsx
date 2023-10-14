import React, { MouseEvent, useEffect, useState } from 'react'
import axios from 'axios'
import {
  TableSortLabel,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  Paper,
} from '@mui/material'
import { userType } from './Table.types'
import { StyledTableCell, StyledTableRow } from './styledTable'
import Row from './Row'
import TablePaginationActions from './TablePaginationActions'

export default function DataTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(3)
  const [rows, setRows] = useState<userType[]>([])

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setRows(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  type orderType = 'asc' | 'desc'

  const [orderDirection, setOrderDirection] = React.useState<orderType>('asc')

  const sortArray = (arr: userType[], orderBy: orderType) => {
    switch (orderBy) {
      case 'asc':
      default:
        return arr.sort((a: userType, b: userType) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        )
      case 'desc':
        return arr.sort((a: userType, b: userType) =>
          a.id < b.id ? 1 : b.id < a.id ? -1 : 0
        )
    }
  }

  const handleSortRequest = () => {
    setRows(sortArray(rows, orderDirection))
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
  }

  const sortAlphaArray = (arr: userType[], orderBy: orderType) => {
    const sortedData = [...arr].sort((a: userType, b: userType) => {
      if (orderBy === 'asc') {
        return a.username.localeCompare(b.username)
      } else {
        return b.username.localeCompare(a.username)
      }
    })
    return sortedData
  }

  const handleAlphaSort = () => {
    setRows(sortAlphaArray(rows, orderDirection))
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="left" onClick={handleSortRequest}>
              <TableSortLabel active={true} direction={orderDirection}>
                Id
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right" onClick={handleAlphaSort}>
              <TableSortLabel active={true} direction={orderDirection}>
                Username
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Website</StyledTableCell>
            <StyledTableCell align="right">Company</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: userType) => (
            <Row key={row.id} row={row} />
          ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
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
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
