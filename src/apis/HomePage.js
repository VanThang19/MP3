import axios from "../Axios"

export const getHomePage = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/api/home',
            method: 'get'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
