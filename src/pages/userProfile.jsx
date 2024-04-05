import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axiosInstance from 'src/helpers/axios';

import useUserStore from './store';

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
  const { user, setUser, isLoading, setIsLoading } = useUserStore();
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
  }, [params.userId, setIsLoading, setUser]);

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
