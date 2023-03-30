import React from 'react'
import { useParams } from 'react-router-dom';

export const Pagination = ({ data , setData }) => {

    const { page } = useParams();

    data = data.slice(page, 9);

    setData(data);

    return (
        <div>Pagination</div>
    )
}
