import { useState } from 'react'
import {
  Box,
  Table,
  Collapse,
  TableBody,
  TableHead,
  IconButton,
  Typography,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { addressType, companyType } from './Table.types'
import { StyledTableCell, StyledTableRow } from './styledTable'

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
    company,
  }
}

export default function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [openAddress, setOpenAddress] = useState(false)
  const [openCompany, setOpenCompany] = useState(false)

  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell component="th" scope="row">
          {row.id}
        </StyledTableCell>
        <StyledTableCell align="right" style={{ width: 225 }}>
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right" style={{ width: 225 }}>
          {row.username}
        </StyledTableCell>
        <StyledTableCell align="right" style={{ width: 225 }}>
          {row.email}
        </StyledTableCell>
        <StyledTableCell align="right" style={{ width: 75 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenAddress(!openAddress)}
          >
            {openAddress ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="right" style={{ width: 225 }}>
          {row.phone}
        </StyledTableCell>
        <StyledTableCell align="right" style={{ width: 225 }}>
          {row.website}
        </StyledTableCell>
        <StyledTableCell align="right" style={{ width: 75 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCompany(!openCompany)}
          >
            {openCompany ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={openAddress} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Address
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Street</StyledTableCell>
                    <StyledTableCell align="right">Suite</StyledTableCell>
                    <StyledTableCell align="right">City</StyledTableCell>
                    <StyledTableCell align="right">Zipcode</StyledTableCell>
                    <StyledTableCell align="right">Geolocation</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.address.street}
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 200 }}>
                      {row.address.suite}
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 200 }}>
                      {row.address.city}
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 200 }}>
                      {row.address.zipcode}
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ width: 250 }}>
                      <strong>Lat: </strong>
                      {row.address.geo.lat}
                      <b>, Long: </b>
                      {row.address.geo.lng}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>

      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={3}
        >
          <Collapse in={openCompany} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Company
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">
                      Catch Phrase
                    </StyledTableCell>
                    <StyledTableCell align="right">BS</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.company.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.company.catchPhrase}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.company.bs}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}
