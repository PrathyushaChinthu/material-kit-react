import { useState } from 'react';
import PropTypes from 'prop-types';
// import { navigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  name,
  avatarUrl,
  username,
  email,
  isVerified,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        // onClick={() => navigate(`/users/${id}`)}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{id}</TableCell>

        <TableCell>{username}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  id: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  email: PropTypes.any,
  username: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};

// import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';

// import {
//   Stack,
//   Popover,
//   TableRow,
//   MenuItem,
//   TableBody,
//   TableCell,
//   IconButton,
//   TablePagination,
// } from '@mui/material';

// import Iconify from 'src/components/iconify';

// export default function UserTableRow({ userid, name, username, phone }) {
//   const [open, setOpen] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('https://jsonplaceholder.typicode.com/users');
//       const data = await res.json();
//       setUsers(data);
//     };
//     fetchData();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleOpenMenu = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setOpen(null);
//   };

//   return (
//     <>
//       {(rowsPerPage > 0
//         ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//         : users
//       ).map((user) => (
//         <TableRow key={user.id}>
//           <TableCell component="th" scope="row">
//             {user.id}
//           </TableCell>
//           <TableCell align="justify">{user.name}</TableCell>
//           <TableCell align="justify">{user.username}</TableCell>
//           <TableCell align="justify">{user.phone}</TableCell>
//           <TableCell align="right">
//             <IconButton onClick={handleOpenMenu}>
//               <Iconify icon="eva:more-vertical-fill" />
//             </IconButton>
//           </TableCell>
//         </TableRow>
//       ))}
//       <TableBody>
//         <TableRow hover tabIndex={-1} role="checkbox">
//           <TableCell padding="checkbox" />
//           <TableCell component="th" scope="row" padding="none">
//             <Stack direction="row" alignItems="center" spacing={2}>
//               {/* Avatar and Name display */}
//             </Stack>
//           </TableCell>
//           {/* Cell for displaying other user data */}
//           <TableCell />
//           <TableCell />
//           <TableCell />
//           <TableCell align="right">
//             <IconButton onClick={handleOpenMenu}>
//               <Iconify icon="eva:more-vertical-fill" />
//             </IconButton>
//           </TableCell>
//         </TableRow>
//       </TableBody>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={users.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <Popover
//         open={!!open}
//         anchorEl={open}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: { width: 140 },
//         }}
//       >
//         <MenuItem onClick={handleCloseMenu}>
//           <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
//           Edit
//         </MenuItem>
//         <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
//           <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
//           Delete
//         </MenuItem>
//       </Popover>
//     </>
//   );
// }

// UserTableRow.propTypes = {
//   userid: PropTypes.number,
//   name: PropTypes.string,
//   username: PropTypes.string,
//   phone: PropTypes.string,
// };
