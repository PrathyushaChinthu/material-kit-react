import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axiosInstance from 'src/helpers/axios';

const styles = {
  user: {
    background: '#378CE7',
    color: 'black',
    width: '100%', // Adjusted width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '2rem', // Adjusted padding
    marginBottom: '2rem', // Adjusted margin bottom
  },
  button: {
    padding: '1rem',
    margin: '1rem',
    borderRadius: '15px',
    boxShadow: '#f95959',
    color: 'black',
    backgroundColor: '#f95959',
  },
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await axiosInstance.get(`/users/${params.userId}`);
        setUser(userData.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [params.userId]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button type="button" style={styles.button} onClick={() => navigate(-1)}>
            Back
          </button>
          <div style={styles.user}>
            <div>Id: {user?.id}</div>
            <div>Name: {user?.name}</div>
            <div>User Name: {user?.username}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
// // import { useRouter } from 'next/router';
// import { Link, useParams } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';

// // eslint-disable-next-line import/no-cycle
// import router from 'src/routes/sections';

// import axiosInstance from 'src/helpers/axios';
// import { useNavigate } from 'react-router-dom';

//   const navigate = useNavigate();
// const styles = {
//   user: {
//     background: '#378CE7',
//     color: 'black',
//     width: '100%', // Adjusted width
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'start',
//     padding: '2rem', // Adjusted padding
//     marginBottom: '2rem', // Adjusted margin bottom
//   },
//   button: {
//     padding: '1rem',
//     margin: '1rem',
//     borderRadius: '15px',
//     boxShadow: '#f95959',
//     color: 'black',
//     backgroundColor: '#f95959',
//   },
// };
// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   // const router = useRouter();
//   const params = useParams();
//   console.log(params);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setIsLoading(true);
//       try {
//         const userData = await axiosInstance.get(`/users/${params.userId}`);
//         setUser(userData.data);
//         console.log(userData.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     };
//     fetchUser();
//   }, [params.userId]);

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//       }}
//     >
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <Link href="/users">
//             <button type="button" style={styles.button} onClick={() => router.back()}>
//               Back
//             </button>
//           </Link>
//           <div style={styles.user}>
//             <div>Id: {user?.id}</div>
//             <div>Name: {user?.name}</div>
//             <div>User Name: {user?.username}</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import axiosInstance from 'src/helpers/axios';

// const UserProfile = () => {
//   const params = useParams();
//   console.log(params);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData = await axiosInstance.get(`/user/${params.userId}`);
//       console.log(userData.data);
//     };
//     fetchUser();
//   }, [params.userId]);

//   return <div>UserProfile</div>;
// };

// export default UserProfile;
