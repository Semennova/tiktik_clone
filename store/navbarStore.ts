import create from 'zustand'
import { persist } from 'zustand/middleware'



const navbarStore = (set: any) => ({
    searchValue: '',

    setSearchValue: (string: string) => set({searchValue: string}),

})

const useNavbarStore = create(
    persist(navbarStore, {
        name: 'navbar'
    })
)

export default useNavbarStore