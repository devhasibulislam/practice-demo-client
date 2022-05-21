import React from 'react';

const Loading = () => {
    return (
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <progress className="progress w-56"></progress>
            <p className='text-center '>Loading...</p>
        </div>
    );
};

export default Loading;