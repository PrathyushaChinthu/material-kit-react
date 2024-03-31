import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import axiosInstance from 'src/helpers/axios';

import PhotoCard from '../photo-card';
import PhotoSort from '../photo-sort';
import PhotoFilters from '../photo-filters';
import PhotoCartWidget from '../photo-cart-widget';

export default function PhotosView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const photosRes = await axiosInstance.get('/photos');
        setPhotos(photosRes.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Photos not found:', error);
        } else {
          console.error('Error fetching photos:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

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

      {loading ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {photos.map((photo) => (
            <Grid key={photo.id} xs={12} sm={6} md={3}>
              <PhotoCard photo={photo.title} />
            </Grid>
          ))}
        </Grid>
      )}

      <PhotoCartWidget />
    </Container>
  );
}
