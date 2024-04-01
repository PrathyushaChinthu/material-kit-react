import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';

export default function ShopPhotoCard({ photo }) {
  const { id, title, url, name, status, price, priceSale } = photo;

  const renderStatus = (
    <Label
      variant="filled"
      color={(status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={name}
      src={url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {priceSale && fCurrency(priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(price)}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={1} sx={{ p: '1rem 1.5rem' }}>
        <Typography color="inherit" variant="subtitle2" noWrap>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <Typography
            color="textSecondary"
            variant="caption"
            align="right"
            sx={{ fontSize: '1.2rem' }}
          >
            {id}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopPhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
  }),
};

// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// import { fCurrency } from 'src/utils/format-number';

// import Label from 'src/components/label';
// // import { ColorPreview } from 'src/components/color-utils';

// // ----------------------------------------------------------------------

// export default function ShopPhotoCard({ photo }) {
//   const renderStatus = (
//     <Label
//       variant="filled"
//       color={(photo.status === 'sale' && 'error') || 'info'}
//       sx={{
//         zIndex: 9,
//         top: 16,
//         right: 16,
//         position: 'absolute',
//         textTransform: 'uppercase',
//       }}
//     >
//       {photo.status}
//     </Label>
//   );

//   const renderImg = (
//     <Box
//       component="img"
//       alt={photo.name}
//       src={photo.cover}
//       sx={{
//         top: 0,
//         width: 1,
//         height: 1,
//         objectFit: 'cover',
//         position: 'absolute',
//       }}
//     />
//   );

//   const renderPrice = (
//     <Typography variant="subtitle1">
//       <Typography
//         component="span"
//         variant="body1"
//         sx={{
//           color: 'text.disabled',
//           textDecoration: 'line-through',
//         }}
//       >
//         {photo.priceSale && fCurrency(photo.priceSale)}
//       </Typography>
//       &nbsp;
//       {fCurrency(photo.price)}
//     </Typography>
//   );

//   return (
//     <Card>
//       <Box sx={{ pt: '100%', position: 'relative' }}>
//         {photo.status && renderStatus}

//         {renderImg}
//       </Box>

//       <Stack spacing={2} sx={{ p: 3 }}>
//         <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
//           {photo.name}
//         </Link>

//         <Stack direction="row" alignItems="center" justifyContent="space-between">
//           {/* <ColorPreview colors={photo.colors} /> */}
//           {renderPrice}
//         </Stack>
//       </Stack>
//     </Card>
//   );
// }

// ShopPhotoCard.propTypes = {
//   photo: PropTypes.object,
// };
