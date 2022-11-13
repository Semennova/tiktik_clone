import React, { useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userLiked: Video[];
    userVideos: Video[];
  };
}

export default function Profile({ data }: IProps) {
  console.log(data);
  const { user, userLiked, userVideos } = data;
  const [showUserVideos, setShowUserVideos] = React.useState(true);
  const [videoList, setVideoList] = React.useState<Video[]>([])
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(()=> {
if(showUserVideos) {
    setVideoList(userVideos)
} else {
    setVideoList(userLiked)
}
  }, [showUserVideos, userVideos, userLiked])

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            {user.userName.replace(" ", "")}{" "}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="md:text-xl capitalize text-gray-400 text-xs">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p onClick={()=>setShowUserVideos(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}>Videos</p>
          <p onClick={()=>setShowUserVideos(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}>Liked Videos</p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
{videoList.length > 0 ? (
    videoList.map((post: Video, idx: number) => (
        <VideoCard key={post._id} post={post}/>
    ))
) : (
    <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}/>
)

}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {

  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};
