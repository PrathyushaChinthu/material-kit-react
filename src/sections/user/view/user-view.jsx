import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import axiosInstance from 'src/helpers/axios';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersRes = await axiosInstance.get('/users');
        setUsers(usersRes.data);
        setLoading(false);
        // eslint-disable-next-line no-shadow
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'id', label: 'Id' },
                  { id: 'username', label: 'User Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      username={row.username}
                      status={row.status}
                      email={row.email}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// // import { sample } from 'lodash';
// import { useState, useEffect } from 'react';
// // import { faker } from '@faker-js/faker/locale/af_ZA';

// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import axiosInstance from 'src/helpers/axios';

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

// import TableNoData from '../table-no-data';
// import UserTableRow from '../user-table-row';
// import UserTableHead from '../user-table-head';
// import TableEmptyRows from '../table-empty-rows';
// import UserTableToolbar from '../user-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from '../utils';

// // ----------------------------------------------------------------------

// export default function UserPage() {
//   const [page, setPage] = useState(0);

//   const [order, setOrder] = useState('asc');

//   const [selected, setSelected] = useState([]);

//   const [orderBy, setOrderBy] = useState('name');

//   const [filterName, setFilterName] = useState('');

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [users, setUsers] = useState([]);

//   // const fakeUsers = Array.from({ length: 100 }, (_, index) => ({
//   //   id: users.id,
//   //   name: users.name,
//   //   username: users.username,
//   //   email: users.email,
//   //   avatarUrl: /assets/images/avatars/avatar_${index + 1}.jpg,
//   //   isVerified: faker.datatype.boolean(),
//   //   status: sample(['active', 'banned']),
//   // }));

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersRes = await axiosInstance.get('/users');
//         setUsers(usersRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSort = (event, id) => {
//     const isAsc = orderBy === id && order === 'asc';
//     if (id !== '') {
//       setOrder(isAsc ? 'desc' : 'asc');
//       setOrderBy(id);
//     }
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = users.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const dataFiltered = applyFilter({
//     inputData: users,
//     comparator: getComparator(order, orderBy),
//     filterName,
//   });

//   const notFound = !dataFiltered.length && !!filterName;

//   return (
//     <Container>
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//         <Typography variant="h4">Users</Typography>

//         <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
//           New User
//         </Button>
//       </Stack>

//       <Card>
//         <UserTableToolbar
//           numSelected={selected.length}
//           filterName={filterName}
//           onFilterName={handleFilterByName}
//         />

//         <Scrollbar>
//           <TableContainer sx={{ overflow: 'unset' }}>
//             <Table sx={{ minWidth: 800 }}>
//               <UserTableHead
//                 order={order}
//                 orderBy={orderBy}
//                 rowCount={users.length}
//                 numSelected={selected.length}
//                 onRequestSort={handleSort}
//                 onSelectAllClick={handleSelectAllClick}
//                 headLabel={[
//                   { id: 'name', label: 'Name' },
//                   { id: 'id', label: 'Id' },
//                   { id: 'username', label: 'User Name' },
//                   { id: 'email', label: 'Email' },
//                   { id: 'isVerified', label: 'Verified', align: 'center' },
//                   { id: 'status', label: 'Status' },
//                   { id: '' },
//                 ]}
//               />
//               <TableBody>
//                 {dataFiltered
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => (
//                     <UserTableRow
//                       key={row.id}
//                       id={row.id}
//                       name={row.name}
//                       username={row.username}
//                       status={row.status}
//                       email={row.email}
//                       avatarUrl={row.avatarUrl}
//                       isVerified={row.isVerified}
//                       selected={selected.indexOf(row.name) !== -1}
//                       handleClick={(event) => handleClick(event, row.name)}
//                     />
//                   ))}

//                 <TableEmptyRows
//                   height={77}
//                   emptyRows={emptyRows(page, rowsPerPage, users.length)}
//                 />

//                 {notFound && <TableNoData query={filterName} />}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <TablePagination
//           page={page}
//           component="div"
//           count={users.length}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           rowsPerPageOptions={[5, 10, 25]}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>
//     </Container>
//   );
// }
