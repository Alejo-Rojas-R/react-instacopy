import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination } from './Pagination';

export const Profile = (() => {

  const { user } = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const getUser = (async () => {
    const userResult = await fetch(`https://reqres.in/api/users/${user}`);
    const userData = await userResult.json();

    setCurrentUser(userData.data);

    getPosts();
  })

  const getPosts = (async () => {
    const photosResult = await fetch('https://jsonplaceholder.typicode.com/photos');
    const photosData = await photosResult.json();

    const photos = photosData.filter(photo => {
      return photo.albumId === currentUser.id;
    }, currentUser.id).slice(0, 9);

    setUserPhotos(photos);
    setLoading(false);
  })

  return (
    <div className='profile'>
      {loading ?
        <img className='spinner' src={require('../assets/images/loading.gif')} alt='spinner' />
        :
        <>
          <div className='profile-header'>
            <img className='avatar' src={currentUser.avatar} />
            <div className='profile-info'>
              <div className='profile-info__name'>{currentUser.first_name} {currentUser.last_name}</div>
              <div className='profile-info__email'>{currentUser.email}</div>
            </div>
          </div>
          <div className='profile-posts'>
            {userPhotos.map(photo => {
              return (
                <div key={photo.id} className='post'>
                  <img src={photo.url} />
                </div>
              )
            })}
          </div>
        </>
      }
    </div>
  )
}
)