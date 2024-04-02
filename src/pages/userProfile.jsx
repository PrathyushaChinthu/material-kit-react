// try 2
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import axiosInstance from 'src/helpers/axios';
// import Link from 'next/link';

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
  link: {
    color: 'black',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await axiosInstance.get(`/user/${params.userId}`);
        setUser(userData.data);
        console.log(userData.data);
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
      userid
      {/*
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Link href={'/users'}>
            <button style={styles.button}>Back</button>
          </Link>
          <div style={styles.user}>
            <div>Id: {user?.id}</div>
            <div>Title: {user?.title}</div>
            <div>Body: {user?.body}</div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserProfile;

//try 1
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
