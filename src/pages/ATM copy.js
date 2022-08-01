import { filter, set } from 'lodash';
// import { sentenceCase } from 'change-case';
import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

import TiketDataService from '../helper/services';
// mock
// import USERLIST from '../_mock/user';

const TABLE_HEAD = [
  { id: 'pemasang', label: 'Pemasang', alignRight: false },
  { id: 'tiketSelesai', label: 'Tiket Selesai', alignRight: false },
  { id: 'sesuaiTarget', label: 'Sesuai Target', alignRight: false },
  { id: 'keluarTarget', label: 'Keluar Target', alignRight: false },
  { id: 'rateTarget', label: 'Rate Target', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ATM() {
  const [listPerformaPemasang, setListPerformaPemasang] = useState([]);
  const [kanca, setKanca] = useState([])

  const [currentListPerformaPemasang, setCurrentListPerformaPemasang] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchPemasang, setSearchPemasang] = useState('');

  useEffect(() => {
    performaPemasang();
    performaKanca()
  }, []);

  const onChangeSearchPemasang = (e) => {
    const searchPemasang = e.target.value;
    setSearchPemasang(searchPemasang);
  };

  const performaPemasang = () => {
    TiketDataService.performaPemasang()
      .then((response) => {
        setListPerformaPemasang(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const performaKanca = () => {
    TiketDataService.performaKanca()
    .then((response) => {
      setKanca(response.data)
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const findByPemasang = () => {
    TiketDataService.findByPemasang(searchPemasang)
      .then((response) => {
        setListPerformaPemasang(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listPerformaPemasang.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (kanca, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (kanca) => {
    setRowsPerPage(parseInt(kanca.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="ATM">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tiket EDC
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          {/* <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by pemasang"
                  value={searchPemasang}
                  onChange={onChangeSearchPemasang}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={findByPemasang}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listPerformaPemasang.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {kanca.map((tiket) => (
                    <TableRow key={tiket.nama}>
                      <TableCell align="left">
                        <Typography variant="h6" noWrap>
                          {tiket.nama}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">{tiket.total}</TableCell>

                      <TableCell align="left">{tiket.targetIn}</TableCell>

                      <TableCell align="left">{tiket.targetOut}</TableCell>

                      <TableCell align="left">
                        <Typography variant="h6" noWrap>
                          {tiket.rateTarget} %
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                </TableBody>

                {/* {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={kanca.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
