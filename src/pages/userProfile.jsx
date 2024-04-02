import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from 'src/helpers/axios';

const UserProfile = () => {
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axiosInstance.get(`/users/${params.userId}`);
      console.log(userData.data);
    };
    fetchUser();
  }, [params.userId]);

  return <div>UserProfile</div>;
};

export default UserProfile;
