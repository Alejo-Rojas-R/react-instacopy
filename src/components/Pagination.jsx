import React from 'react'
import { useParams } from 'react-router-dom';

export const Pagination = ({ elements }) => {

    const { page } = useParams();
    elements = elements.slice(page, 10);

    return (
        <div>Pagination</div>
    )
}
