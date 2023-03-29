import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export const List = () => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        
        const photos = await fetch('https://jsonplaceholder.typicode.com/photos');
        let photosResult = await photos.json();
        photosResult = photosResult.slice(0, 10);

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
                <img className='spinner' src={require('../assets/images/loading.gif')} alt='spinner' />
                :
                data.map(post => {
                    return (
                        <div key={post.photo.id} className='list-item'>
                            <div className='list-item__top'>
                                <img className='list-item__image' src={post.photo.url} alt='' />
                            </div>
                            <div className='list-item__bottom'>
                                <div className='list-item__user'>
                                    <img className='avatar list-item__avatar' src={post.user.avatar} />
                                    &nbsp;
                                    <strong><NavLink to={`profile/${post.user.id}`}>{post.user.first_name} {post.user.last_name}</NavLink></strong>
                                </div>
                                <div className='list-item__actions'>
                                    <div className='list-item__action-like'>
                                        <FontAwesomeIcon icon={faHeart} color={'black'} />
                                    </div>
                                    &nbsp;
                                    <div className='list-item__action-comment'>
                                        <FontAwesomeIcon icon={faComment} />
                                    </div>
                                </div>
                                <div className='list-item__caption'>
                                    {post.photo.title}
                                </div>
                                <div className='list-item__comments'>

                                </div>
                            </div>
                        </div>)
                })}
        </div>
    )
}
