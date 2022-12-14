import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

interface IProps {
  postDetails: Video
}


function Detail({ postDetails }: IProps) {
  // console.log('postDetails', postDetails)

  const [post, setPost] = React.useState(postDetails)
  const [playing, setPlaying] = React.useState(false)
  const [isVideoMuted, setIsVideoMuted] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [isPostingComment, setIsPostingComment] = React.useState(false)
  const router = useRouter()
  const { userProfile }: any = useAuthStore()
  // const [deletedMessage, setDeletedMessage] = React.useState(false)

  // console.log('userProfile', userProfile)

  const videoRef = React.useRef<HTMLVideoElement>(null)

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }
  // console.log('postDetails', postDetails.postedBy._id);
  // console.log('userProfile', userProfile._id);

  React.useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  const handleDeleteComment = async (e:React.MouseEvent<HTMLDivElement>, commentId: string) => {
    e.preventDefault()
    if (postDetails.comments && postDetails.comments.length) {
      for (const comment of postDetails.comments) {
        if (comment._key === commentId) {
          console.log(comment._key)

          // await axios.delete(`${BASE_URL}/api/post/${post._id}`, {
          //   data: {
          //     commentId
          //   }
          // })
        }
      }
    }

    //      await axios.delete(`${BASE_URL}/api/post/${post._id}`, {
    //   data: {
    //     commentId,
    // }
    // })
  }

  const addComment = async (e: any) => {
    e.preventDefault()
    if (userProfile && comment) {
      setIsPostingComment(true)
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({ ...post, comments: data.comments })
      setComment('')
      setIsPostingComment(false)
    }
  }

  // const deleteVideo = async (e: any) => {
  //   e.preventDefault()
  //   setDeletedMessage(true)
  //   await axios.delete(`${BASE_URL}/api/post/${postDetails._id}`)
  // }

  const closeVideoDetails = () => {
    // setDeletedMessage(false)
    router.back()
  }

  if (!post) return null

  return (
    <div className='flex w-full absolute left-0 top-0 bottom-0 right-20 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={closeVideoDetails}>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>

        {/* {userProfile._id ===  postDetails.postedBy._id && (
          <div className='absolute top-16 left-2 lg:left-6 flex gap-6 z-50'>
            <p className='cursor-pointer' onClick={deleteVideo}>
            {deletedMessage ? <div className='text-white'>Deleted undo?</div> : <MdDelete className='text-[#f87171] text-[35px]' />}  
            </p>
          </div>
        )} */}

        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              className='h-full cursor-pointer'
              src={post.video.asset.url}
            ></video>
          </div>
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button>
              <HiVolumeOff onClick={() => setIsVideoMuted(false)} className='text-white text-2xl lg:text:4xl' />
            </button>
          ) : (
            <button>
              <HiVolumeUp onClick={() => setIsVideoMuted(true)} className='text-white text-2xl lg:text:4xl' />
            </button>
          )}
        </div>
      </div>
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
              <Link href='/'>
                <>
                  <Image
                    width={62}
                    height={62}
                    className='rounded-full'
                    src={post.postedBy.image}
                    alt='profile picture'
                    layout='responsive'
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href='/'>
                <div className='mt-3 flex flex-col gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName} {` `}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className='px-10 text-lg text-gray-600'>{post.caption}</p>
          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
            handleDeleteComment={handleDeleteComment}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data }
  }
}

export default Detail
