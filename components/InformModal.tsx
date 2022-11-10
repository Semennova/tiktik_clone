import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface IProps {
  headerText: string
  handleClick: any
  handleToggle: any
}

export default function InformModal({ handleClick, headerText, handleToggle }: IProps) {
  return (
    <div className='absolute top-[45%] right-[25%] w-[500px] bg-white px-10 py-5 rounded-full border-gray-300 border-2 z-10'>
      <button type='button' onClick={handleToggle} className='absolute top-3 right-10'>
        <AiOutlineCloseCircle />
      </button>
      <span className='font-bold  xl:text-md'>{headerText}</span>
      <button
        onClick={handleClick}
        className='px-3 py-0 block border-gray-200 border-2 rounded-full mt-3 hover:bg-gray-100'
      >
        Ok
      </button>
    </div>
  )
}
