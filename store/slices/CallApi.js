import axios from 'axios';
const CallApi = (set, get) => ({
    datas: [],
    createQuestion: [],
    fetchData: async () => {
        const res = await axios.get('http://localhost:3080/api/question')
        set({ datas:  await res.data })
        return res
    },

    // fetchCreateQuestion: async () => {
    //     const res = await axios.post('http://localhost:3080/api/question/add',
    //         newQuestion,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         },
    //     )

    //     set({
    //         createQuestion: await res.data,
    //     })
    // }



})
export default CallApi
