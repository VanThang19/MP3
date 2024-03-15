import React from 'react'
import { memo } from 'react'
import { Audio } from 'react-loader-spinner'

const AudioLoading = () => {
    return (
        <Audio
            height="30"
            width="30"
            color="White"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}
// memo : hạn chế rerender không cần thiết
export default memo(AudioLoading)