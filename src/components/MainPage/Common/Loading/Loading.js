import React from 'react';

export default function Loading({ loading }) {
    if(loading)
        return <p>Loading...</p>
    return null;
}