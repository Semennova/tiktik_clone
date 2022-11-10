import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import axios from 'axios'
import { BASE_URL } from '../utils'
import InformModal from './InformModal'
import { useRouter } from 'next/router'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { userProfile }: any = useAuthStore()

  // console.log('userProfile', userProfile);

  const router = useRouter()
  // console.log('router', router)
  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  const deleteVideo = async (e: any, id: string) => {
    e.preventDefault()
    if (id === post._id) {
      // setIsDeleted(false)
      await axios.delete(`${BASE_URL}/api/post/${post._id}`)
      router.push('/')
    }
  }

  const toggleConfirmationModal = () => {
    window.scrollTo(0, 0)
    setIsDeleted(!isDeleted)
    console.log('clicked')
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.userId}`}>
              <Image
                width={62}
                height={62}
                className='rounded-full'
                src={post.postedBy.image}
                alt='profile picture'
                layout='responsive'
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.userId}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName} {` `}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div>
      {isDeleted && (
        <InformModal
          headerText={`According to our algorithms your video "${post.caption}" was not going to succeed anyway. Glad you made that decision.`}
          handleClick={a => deleteVideo(a, post._id)}
          handleToggle={toggleConfirmationModal}
        />
      )}
        <div className='lg:ml-20 flex gap-4 relative'>
          <div
            className='rounded-3xl'
            onMouseEnter={() => setIsHover(prev => !prev)}
            onMouseLeave={() => setIsHover(prev => !prev)}
          >
            <Link href={`/detail/${post._id}`}>
              <video
                ref={videoRef}
                src={post.video.asset.url}
                loop
                className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
              ></video>
            </Link>
            {isHover && (
              <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-5 lg:justify-between w-[100px]md:w-[50px] p-3'>
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className='text-black text-2xl lg:text:4xl' />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className='text-black text-2xl lg:text:4xl' />
                  </button>
                )}

                {isVideoMuted ? (
                  <button>
                    <HiVolumeOff onClick={() => setIsVideoMuted(false)} className='text-black text-2xl lg:text:4xl' />
                  </button>
                ) : (
                  <button>
                    <HiVolumeUp onClick={() => setIsVideoMuted(true)} className='text-black text-2xl lg:text:4xl' />
                  </button>
                )}

                {userProfile._id === post.postedBy._id && (
                  <button>
                    <MdDelete onClick={toggleConfirmationModal} className='text-black text-2xl lg:text:4xl' />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
