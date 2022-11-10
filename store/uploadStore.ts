import { BASE_URL } from './../utils/index';
import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { topics } from '../utils/constants';



const uploadStore = (set: any) => ({
    caption: '',
    category: topics[0].name,

    setCaption: (captionText: string) => set({caption: captionText}),
    setCategory: (categoryText: string) => set({category: categoryText})

})

const useUploadStore = create(
    persist(uploadStore, {
        name: 'upload'
    })
)

export default useUploadStore