import axios from "../Axios"

export const apiGetSong = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params: { id: payload }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// bug : ko tìm thấy bài hát
export const apiGetDetailSong = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params: { id: payload }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetDetailPlaylist = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/getdetailplaylist',
            method: 'get',
            params: { id: pid }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


