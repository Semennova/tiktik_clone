import { BASE_URL } from './../utils/index';
import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'



const videoCardStore = (set: any) => ({
    
    deletevideo: async (postId: string) => {
        await axios.delete(`${BASE_URL}/api/post/${postId}`)
   }

})

const useVideocardStore = create(
    persist(videoCardStore, {
        name: 'videocard'
    })
)

export default useVideocardStore