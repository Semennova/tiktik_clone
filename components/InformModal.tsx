import React from 'react'

interface IProps {
  headerText: string
  handleClick: any
  handleToggle: any
  bodyText: string
  topButtonText: string
  bottomButtonText: string
}



export default function InformModal({ handleClick, headerText, handleToggle, bodyText, topButtonText, bottomButtonText }: IProps) {
  return (
    <>
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] bg-white px-5 pt-5 pb-0 rounded-3xl border-gray-300 border-2 z-10 text-center'>
      <div className='font-bold xl:text-md mb-3'>{headerText}</div>
      <div className='text-gray-400 text-sm mb-3'>{bodyText}</div>
      <span className="absolute left-0 right-0 w-[247px] bg-gray-300 h-[1px]"></span>
      <div onClick={handleClick} className='py-2 font-bold text-[#F51997] cursor-pointer'>{topButtonText}</div>
      <span className="absolute left-0 right-0 w-[247px] bg-gray-300 h-[1px]"></span>
      <div onClick={handleToggle} className='py-2 font-semibold cursor-pointer'>{bottomButtonText}</div>
    </div>
    </>
   
  )
}
