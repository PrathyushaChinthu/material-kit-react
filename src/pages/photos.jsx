import { Helmet } from 'react-helmet-async';

import { PhotosView } from 'src/sections/photos/view';

// ----------------------------------------------------------------------

export default function PhotosPage() {
  return (
    <>
      <Helmet>
        <title> Photos | Minimal UI </title>
      </Helmet>

      <PhotosView />
    </>
  );
}
