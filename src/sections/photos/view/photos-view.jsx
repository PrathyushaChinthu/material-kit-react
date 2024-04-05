import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import axios from 'axios';
import axiosInstance from 'src/helpers/axios';

import usePhotosStore from './store';
import PhotoCard from '../photo-card';
import PhotoSort from '../photo-sort';
import PhotoFilters from '../photo-filters';
import PhotoCartWidget from '../photo-cart-widget';

export default function PhotosView() {
  const {
    openFilter,
    setOpenFilter,
    photos,
    setPhotos,
    page,
    setPage,
    loading,
    setLoading,
    fetchingMore,
    setFetchingMore,
  } = usePhotosStore();
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const photosRes = await axiosInstance.get('/photos?_start=0&_limit=100');
        console.log('Fetched photos:', photosRes.data);
        setPhotos(photosRes.data);
        // setPhotos((prevPhotos) => [...prevPhotos, ...photosRes.data]);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [page, setLoading, setPhotos]);

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
  }, [fetchingMore, setFetchingMore, setPage]);

  // useEffect(() => {
  //   if (fetchingMore) {
  //     const fetchMorePhotos = async () => {
  //       try {
  //         const start = (page - 1) * 10;
  //         const photosRes = await axiosInstance.get(`/photos?_start=${start}&_limit=10`);
  //         setPhotos(photosRes.data);
  //         // setPhotos((prevPhotos) => [...prevPhotos, ...photosRes.data]);
  //       } catch (error) {
  //         console.error('Error fetching more photos:', error);
  //       } finally {
  //         setFetchingMore(false);
  //       }
  //     };
  //     fetchMorePhotos();
  //   }
  // }, [fetchingMore, page, setFetchingMore, setPhotos]);

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
          <Grid key={photo.id} item xs={12} sm={6} md={3}>
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

// import axiosInstance from 'src/helpers/axios';

// import PhotoCard from '../photo-card';
// import PhotoSort from '../photo-sort';
// import PhotoFilters from '../photo-filters';
// import PhotoCartWidget from '../photo-cart-widget';

// export default function PhotosView() {
//   const [openFilter, setOpenFilter] = useState(false);
//   const [photos, setPhotos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [fetchingMore, setFetchingMore] = useState(false);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       setLoading(true);
//       try {
//         const photosRes = await axiosInstance.get('/photos', {
//           params: { _limit: 10, _page: page },
//         });
//         setPhotos((prevPhotos) => [...prevPhotos, ...photosRes.data]);
//       } catch (error) {
//         console.error('Error fetching photos:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPhotos();
//   }, [page]);

//   const handleOpenFilter = () => {
//     setOpenFilter(true);
//   };

//   const handleCloseFilter = () => {
//     setOpenFilter(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         !fetchingMore &&
//         window.innerHeight + document.documentElement.scrollTop >=
//           document.documentElement.offsetHeight * 0.9
//       ) {
//         setFetchingMore(true);
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [fetchingMore]);

//   useEffect(() => {
//     if (fetchingMore) {
//       const fetchMorePhotos = async () => {
//         try {
//           const photosRes = await axiosInstance.get('/photos', {
//             params: { _limit: 10, _page: page },
//           });
//           setPhotos((prevPhotos) => [...prevPhotos, ...photosRes.data]);
//         } catch (error) {
//           console.error('Error fetching more photos:', error);
//         } finally {
//           setFetchingMore(false);
//         }
//       };
//       fetchMorePhotos();
//     }
//   }, [fetchingMore, page]);

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
//         {photos.map((photo) => (
//           <Grid key={photo.id} xs={12} sm={6} md={3}>
//             <PhotoCard photo={photo} />
//           </Grid>
//         ))}
//       </Grid>

//       {loading && <Typography>Loading...</Typography>}

//       <PhotoCartWidget />
//     </Container>
//   );
// }
