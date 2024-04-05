import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import axiosInstance from 'src/helpers/axios';

import Iconify from 'src/components/iconify';

import usePostStore from './store';
import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

export default function PostView() {
  const { posts, setPosts, loading, setLoading } = usePostStore();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsRes = await axiosInstance.get('/posts');
        setPosts(postsRes.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Posts not found:', error);
        } else {
          console.error('Error fetching posts:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [setLoading, setPosts]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Post</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
