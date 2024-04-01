import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

export default function PostCard({ post, index }) {
  const { id, userId, title, view, body, comment, share, createdAt } = post;
  const [showFullData, setShowFullData] = useState(false);

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const handleTitleClick = () => {
    setShowFullData(!showFullData);
  };

  const renderAvatar = (
    <Avatar
      alt={post.id}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        top: (theme) => theme.spacing(3),
        ...(latestPostLarge && {
          top: (theme) => theme.spacing(2),
          left: (theme) => theme.spacing(2),
          width: 40,
          height: 40,
        }),
      }}
    />
  );

  const renderTitle = (
    <Box
      sx={{
        padding: 2,
        backgroundColor: 'primary.main',
        borderRadius: 1,
        height: showFullData ? 'auto' : 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        position: 'relative',
      }}
      onClick={handleTitleClick}
    >
      {showFullData ? (
        <>
          <Typography variant="subtitle2" color="text.primary">
            id: {id}
          </Typography>
          <Typography variant="subtitle2" color="text.primary">
            userId: {userId}
          </Typography>
          <Typography variant="subtitle2" color="text.primary">
            title: {title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            body: {body}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            createdAt: {fDate(createdAt)}
          </Typography>
        </>
      ) : (
        <Typography variant="subtitle2" color="text.primary">
          {title}
        </Typography>
      )}
    </Box>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: comment, icon: 'eva:message-circle-fill' },
        { number: view, icon: 'eva:eye-fill' },
        { number: share, icon: 'eva:share-fill' },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            ...((latestPostLarge || latestPost) && {
              opacity: 0.48,
              color: 'common.white',
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ backgroundColor: 'pink', borderRadius: 2 }}>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          {renderShape}
          {renderAvatar}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
          {renderTitle}
          {renderDate}
          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import { alpha } from '@mui/material/styles';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

// import { fDate } from 'src/utils/format-time';
// import { fShortenNumber } from 'src/utils/format-number';

// import Iconify from 'src/components/iconify';
// import SvgColor from 'src/components/svg-color';

// // ----------------------------------------------------------------------

// export default function PostCard({ post, index }) {
//   const { id, userId, title, view, body, comment, share, createdAt } = post;

//   const latestPostLarge = index === 0;

//   const latestPost = index === 1 || index === 2;

//   const renderAvatar = (
//     <Avatar
//       alt={post.id}
//       // src={author.avatarUrl}
//       sx={{
//         zIndex: 9,
//         width: 32,
//         height: 32,
//         position: 'absolute',
//         left: (theme) => theme.spacing(3),
//         top: (theme) => theme.spacing(3),
//         ...(latestPostLarge && {
//           top: (theme) => theme.spacing(2),
//           left: (theme) => theme.spacing(2),
//           width: 40,
//           height: 40,
//         }),
//       }}
//     />
//   );

//   const renderTitle = (
//     <Box
//       sx={{
//         padding: 2,
//         backgroundColor: 'primary.main',
//         borderRadius: 1,
//         height: 120, // Increase the height here
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//       }}
//     >
//       <Typography variant="subtitle2" color="text.primary">
//         id: {id}
//       </Typography>
//       <Typography variant="subtitle2" color="text.primary">
//         userId: {userId}
//       </Typography>
//       <Typography variant="subtitle2" color="text.primary">
//         title: {title}
//       </Typography>
//       <Typography variant="subtitle2" color="text.primary">
//         body: {body}
//       </Typography>
//     </Box>
//   );

//   const renderInfo = (
//     <Stack
//       direction="row"
//       flexWrap="wrap"
//       spacing={1.5}
//       justifyContent="flex-end"
//       sx={{
//         mt: 3,
//         color: 'text.disabled',
//       }}
//     >
//       {[
//         { number: comment, icon: 'eva:message-circle-fill' },
//         { number: view, icon: 'eva:eye-fill' },
//         { number: share, icon: 'eva:share-fill' },
//       ].map((info, _index) => (
//         <Stack
//           key={_index}
//           direction="row"
//           sx={{
//             ...((latestPostLarge || latestPost) && {
//               opacity: 0.48,
//               color: 'common.white',
//             }),
//           }}
//         >
//           <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
//           <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
//         </Stack>
//       ))}
//     </Stack>
//   );

//   const renderDate = (
//     <Typography
//       variant="caption"
//       component="div"
//       sx={{
//         mb: 2,
//         color: 'text.disabled',
//         ...((latestPostLarge || latestPost) && {
//           opacity: 0.48,
//           color: 'common.white',
//         }),
//       }}
//     >
//       {fDate(createdAt)}
//     </Typography>
//   );

//   const renderShape = (
//     <SvgColor
//       color="paper"
//       src="/assets/icons/shape-avatar.svg"
//       sx={{
//         width: 80,
//         height: 36,
//         zIndex: 9,
//         bottom: -15,
//         position: 'absolute',
//         color: 'background.paper',
//         ...((latestPostLarge || latestPost) && { display: 'none' }),
//       }}
//     />
//   );

//   return (
//     <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
//       <Card sx={{ backgroundColor: 'pink', borderRadius: 2 }}>
//         <Box
//           sx={{
//             position: 'relative',
//             pt: 'calc(100% * 3 / 4)',
//             ...((latestPostLarge || latestPost) && {
//               pt: 'calc(100% * 4 / 3)',
//               '&:after': {
//                 top: 0,
//                 content: "''",
//                 width: '100%',
//                 height: '100%',
//                 position: 'absolute',
//                 bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
//               },
//             }),
//             ...(latestPostLarge && {
//               pt: {
//                 xs: 'calc(100% * 4 / 3)',
//                 sm: 'calc(100% * 3 / 4.66)',
//               },
//             }),
//           }}
//         >
//           {renderShape}

//           {renderAvatar}
//         </Box>

//         <Box
//           sx={{
//             p: (theme) => theme.spacing(4, 3, 3, 3),
//             ...((latestPostLarge || latestPost) && {
//               width: 1,
//               bottom: 0,
//               position: 'absolute',
//             }),
//           }}
//         >
//           {renderTitle}

//           {renderDate}

//           {renderInfo}
//         </Box>
//       </Card>
//     </Grid>
//   );
// }

// PostCard.propTypes = {
//   post: PropTypes.object.isRequired,
//   index: PropTypes.number,
// };
