import React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
// import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Replace with your form submission logic
    router.back(); // Navigate only if form validations are successful
  };

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
          <Typography variant="h4">Sign in to MicroFox</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link href="/signup">
              <Button variant="text" color="primary">
                Create an account
              </Button>
            </Link>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                {...register('email', { required: true })}
                label="Email address"
                error={!!errors.email}
                helperText={errors.email && 'Email address is required'}
              />

              <TextField
                {...register('password', { required: true })}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password && 'Password is required'}
              />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>
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

// export default function LoginView() {
//   const theme = useTheme();

//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);

//   // const handleClick = () => {
//   //   router.push('/dashboard');
//   // };

//   const renderForm = (
//     <>
//       <Stack spacing={3}>
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
//           Login
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
//         Login
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
//           <Typography variant="h4">Sign in to MicroFox</Typography>

//           <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
//             Don’t have an account?
//             {/* <Link href="/signup-page"> */}
//             <Link href="/signup">
//               <Button variant="text" color="primary" onClick={() => router.back()}>
//                 Create an account
//               </Button>
//             </Link>
//             {/* <Button variant="text" color="primary">
//               Create an account
//             </Button> */}
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
