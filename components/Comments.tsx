import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";

interface Iprops {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: Boolean;
  comments: IComment[];
  handleDeleteComment: (e:React.MouseEvent<HTMLDivElement>, id:string)=> void
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

function Comments({
  comment,
  setComment,
  addComment,
  isPostingComment,
  comments,
  handleDeleteComment
}: Iprops) {
  const { userProfile, allUsers }: any = useAuthStore();
 
  
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[474px]">
        {comments?.length ? (
          comments.map((comment, idx) => (
            <React.Fragment key={idx}>
              {allUsers.map(
                
                (user: IUser) =>
                  user._id ===
                    (comment.postedBy._id || comment.postedBy._ref) && (
                    <div key={idx} className="p-2 items-center">
                      <Link href={`/profile/${user._id}`}>
                      <div className='flex justify-between items-center'>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replace(" ", "")}{" "}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                       {userProfile._id === comment.postedBy._id && <div onClick={(e)=>handleDeleteComment(e, comment._key)} className='cursor-pointer'>
                     
                            <AiOutlineCloseCircle />
                          </div>} 
                        </div>
                      </Link>
                      <div className="">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </React.Fragment>
          ))
        ) : (
          <NoResults text="No comments yet!" />
        )}
        {userProfile && (
          <div className="absolute bottom-0 left-0 pb-2 px-2 md:px-10">
            <form onSubmit={addComment} className="flex gap-4">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comment..."
                className="bg-primary px-6 py-3 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[400px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              />
              <button className="text-md text-gray-400" onClick={addComment}>
                {isPostingComment ? "Commenting..." : "Comment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
