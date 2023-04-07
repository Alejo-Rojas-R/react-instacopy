import React, { useEffect, useMemo, useState } from 'react'
import { ListPosts } from '../layout/ListPosts';
import '../../assets/css/Home.css';
import Spinner from '../../assets/images/Spinner.gif';

export const Home = ({ user }) => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    const photos = await fetch('https://jsonplaceholder.typicode.com/photos');
    let photosResult = await photos.json();
    photosResult = photosResult.slice(0, 9);

    const users = await fetch('https://reqres.in/api/users?per_page=12');
    let usersResult = await users.json();

    const result = photosResult.map(photo => {
      const user = usersResult.data.filter(user => user.id === photo.albumId, photo)[0];

      return { photo, user }
    });

    setLoading(false);
    setData(result);
  }

  return (
    <div className='list'>
      {loading ?
        <img className='spinner' src={Spinner} alt='spinner' />
        :
        <ListPosts data={data} user={user} showDetails={true} />
      }
    </div>
  );
}