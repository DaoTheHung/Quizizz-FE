import axios from 'axios';
import { io } from 'socket.io-client'
const socket = io('http://localhost:3080')
const CallApi = (set, get) => ({
    socket: socket,
    datas: [],
    createQuestion: [],
    dataQuiz: [],
    quizDetail: [],
    dataPlayer: [],
    fetchData: async () => {
        const res = await axios.get('http://localhost:3080/api/question')
        set({ datas:  await res.data })
        return res
    },
    fetchDataQuiz: async () => {
        const res = await axios.get('http://localhost:3080/api/quizizz')
        set({ dataQuiz:  await res.data })
        return res
    },
    fetchPlayerZoom: async () => {
        const res = await axios.get('http://localhost:3080/api/zoom')
        set({ dataPlayer:  await res.data })
        return res
    },
   



})
export default CallApi
