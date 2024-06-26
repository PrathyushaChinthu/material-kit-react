import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function SignupView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Replace with your form submission logic
    router.back();
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          {...register('firstName', { required: true })}
          label="First name"
          error={!!errors.firstName}
          helperText={errors.firstName && 'First name is required'}
        />
        <TextField
          {...register('lastName', { required: true })}
          label="Last name"
          error={!!errors.lastName}
          helperText={errors.lastName && 'Last name is required'}
        />
        <TextField
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          label="Email address"
          error={!!errors.email}
          helperText={errors.email && 'Valid email address is required'}
        />
        <TextField
          {...register('password', { required: true, minLength: 6 })}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          helperText={errors.password && 'Password must be at least 6 characters long'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      <Button variant="contained" color="primary" type="submit">
        Signup
      </Button>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Welcome to MicroFox</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link href="/login">
              <Button variant="text" color="primary" onClick={() => router.back()}>
                Log in
              </Button>
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

// import { useState } from 'react';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// // import LoadingButton from '@mui/lab/LoadingButton';
// import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

// import { bgGradient } from 'src/theme/css';

// import Logo from 'src/components/logo';
// import Iconify from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export default function SignupView() {
//   const theme = useTheme();

//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);

//   // const handleClick = () => {
//   //   router.push('/dashboard');
//   // };

//   const renderForm = (
//     <>
//       <Stack spacing={3}>
//         <TextField name="firstName" label="First name" />
//         <TextField name="lastName" label="Last name" />
//         <TextField name="email" label="Email address" />

//         <TextField
//           name="password"
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link>
//       </Stack>
//       <Link href="/">
//         <Button variant="contained" color="primary" onClick={() => router.back()}>
//           Signup
//         </Button>
//       </Link>
//       {/* <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         variant="contained"
//         color="inherit"
//         onClick={handleClick}
//       >
//         Create an account
//       </LoadingButton> */}
//     </>
//   );

//   return (
//     <Box
//       sx={{
//         ...bgGradient({
//           color: alpha(theme.palette.background.default, 0.9),
//           imgUrl: '/assets/background/overlay_4.jpg',
//         }),
//         height: 1,
//       }}
//     >
//       <Logo
//         sx={{
//           position: 'fixed',
//           top: { xs: 16, md: 24 },
//           left: { xs: 16, md: 24 },
//         }}
//       />

//       <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
//         <Card
//           sx={{
//             p: 5,
//             width: 1,
//             maxWidth: 420,
//           }}
//         >
//           <Typography variant="h4">Welcome to MicroFox</Typography>

//           <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
//             Already have an account?
//             {/* <Link href="/signup-page"> */}
//             <Link href="/login">
//               <Button variant="text" color="primary" onClick={() => router.back()}>
//                 Log in
//               </Button>
//             </Link>
//             {/* </Link> */}
//             {/* <Link variant="subtitle2" sx={{ ml: 0.5 }}>
//               Get started
//             </Link> */}
//           </Typography>

//           <Stack direction="row" spacing={2}>
//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:google-fill" color="#DF3E30" />
//             </Button>

//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:facebook-fill" color="#1877F2" />
//             </Button>

//             <Button
//               fullWidth
//               size="large"
//               color="inherit"
//               variant="outlined"
//               sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
//             >
//               <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
//             </Button>
//           </Stack>

//           <Divider sx={{ my: 3 }}>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               OR
//             </Typography>
//           </Divider>

//           {renderForm}
//         </Card>
//       </Stack>
//     </Box>
//   );
// }
