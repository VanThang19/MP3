import React, { memo } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const LoadingSong = () => {
    return (
        <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}
// memo : hạn chế rerender không cần thiết
export default memo(LoadingSong)