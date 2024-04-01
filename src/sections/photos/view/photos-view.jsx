import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import axiosInstance from 'src/helpers/axios';

import PhotoCard from '../photo-card';
import PhotoSort from '../photo-sort';
import PhotoFilters from '../photo-filters';
import PhotoCartWidget from '../photo-cart-widget';

export default function PhotosView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const photosRes = await axiosInstance.get('/photos', {
          params: { _limit: 10, _page: page },
        });
        setPhotos((prevPhotos) => [...prevPhotos, ...photosRes.data]);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [page]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        !fetchingMore &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight * 0.9
      ) {
        setFetchingMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchingMore]);

  useEffect(() => {
    if (fetchingMore) {
      const fetchMorePhotos = async () => {
        try {
          const photosRes = await axiosInstance.get('/photos', {
            params: { _limit: 10, _page: page },
          });
          setPhotos((prevPhotos) => [...prevPhotos, ...photosRes.data]);
        } catch (error) {
          console.error('Error fetching more photos:', error);
        } finally {
          setFetchingMore(false);
        }
      };
      fetchMorePhotos();
    }
  }, [fetchingMore, page]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Photos
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <PhotoFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <PhotoSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {photos.map((photo) => (
          <Grid key={photo.id} xs={12} sm={6} md={3}>
            <PhotoCard photo={photo} />
          </Grid>
        ))}
      </Grid>

      {loading && <Typography>Loading...</Typography>}

      <PhotoCartWidget />
    </Container>
  );
}

// import { useState, useEffect } from 'react';

// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import CircularProgress from '@mui/material/CircularProgress';

// import axiosInstance from 'src/helpers/axios';

// import PhotoCard from '../photo-card';
// import PhotoSort from '../photo-sort';
// import PhotoFilters from '../photo-filters';
// import PhotoCartWidget from '../photo-cart-widget';

// export default function PhotosView() {
//   const [openFilter, setOpenFilter] = useState(false);
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       setLoading(true);
//       try {
//         const photosRes = await axiosInstance.get('/photos');
//         setPhotos(photosRes.data);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.error('Photos not found:', error);
//         } else {
//           console.error('Error fetching photos:', error);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPhotos();
//   }, []);

//   const handleOpenFilter = () => {
//     setOpenFilter(true);
//   };

//   const handleCloseFilter = () => {
//     setOpenFilter(false);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mb: 5 }}>
//         Photos
//       </Typography>

//       <Stack
//         direction="row"
//         alignItems="center"
//         flexWrap="wrap-reverse"
//         justifyContent="flex-end"
//         sx={{ mb: 5 }}
//       >
//         <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
//           <PhotoFilters
//             openFilter={openFilter}
//             onOpenFilter={handleOpenFilter}
//             onCloseFilter={handleCloseFilter}
//           />

//           <PhotoSort />
//         </Stack>
//       </Stack>

//       {loading ? (
//         <Stack justifyContent="center" alignItems="center">
//           <CircularProgress />
//         </Stack>
//       ) : (
//         <Grid container spacing={3}>
//           {photos.map((photo) => (
//             <Grid key={photo.id} xs={12} sm={6} md={3}>
//               <PhotoCard photo={photo.title} />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <PhotoCartWidget />
//     </Container>
//   );
// }

// import { sample } from 'lodash';
// import { faker } from '@faker-js/faker';
// import { useState, useEffect } from 'react';

// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

// import axiosInstance from 'src/helpers/axios';
// // import { fetchPhotos } from 'src/_mock/photos';

// import PhotoCard from '../photo-card';
// import PhotoSort from '../photo-sort';
// import PhotoFilters from '../photo-filters';
// import PhotoCartWidget from '../photo-cart-widget';

// // ----------------------------------------------------------------------

// const PRODUCT_COLOR = [
//   '#00AB55',
//   '#000000',
//   '#FFFFFF',
//   '#FFC0CB',
//   '#FF4842',
//   '#1890FF',
//   '#94D82D',
//   '#FFC107',
// ];

// export default function PhotosView() {
//   const [openFilter, setOpenFilter] = useState(false);
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     const fetchPhotourls = async () => {
//       try {
//         // const photosRes = await fetchPhotos();
//         const photosRes = await axiosInstance.get('/photos');
//         setPhotos(photosRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchPhotourls();
//   }, []);

//   const products = photos.map((photo) => {
//     const setIndex = photo.id;

//     return {
//       id: faker.datatype.uuid(),
//       cover: photo.url,
//       name: photo.title,
//       price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
//       priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
//       colors:
//         (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
//         (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
//         (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
//         (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
//         (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
//         (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
//         PRODUCT_COLOR,
//       status: sample(['sale', 'new', '', '']),
//     };
//   });

//   const handleOpenFilter = () => {
//     setOpenFilter(true);
//   };

//   const handleCloseFilter = () => {
//     setOpenFilter(false);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" sx={{ mb: 5 }}>
//         Photos
//       </Typography>

//       <Stack
//         direction="row"
//         alignItems="center"
//         flexWrap="wrap-reverse"
//         justifyContent="flex-end"
//         sx={{ mb: 5 }}
//       >
//         <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
//           <PhotoFilters
//             openFilter={openFilter}
//             onOpenFilter={handleOpenFilter}
//             onCloseFilter={handleCloseFilter}
//           />

//           <PhotoSort />
//         </Stack>
//       </Stack>
//       <Grid container spacing={3}>
//         {products.map((product) => (
//           <Grid key={product.id} xs={12} sm={6} md={3}>
//             <PhotoCard product={product} />
//           </Grid>
//         ))}
//       </Grid>
//       {/* <Grid container spacing={3}>
//         {photos.map((photo) => (
//           <Grid key={photo.id} xs={12} sm={6} md={3}>
//             <PhotoCard photo={photo} />
//           </Grid>
//         ))}
//       </Grid> */}

//       <PhotoCartWidget />
//     </Container>
//   );
// }
