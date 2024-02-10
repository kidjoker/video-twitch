import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser, isBlockedByself } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({
    params
} : UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if(!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlockMe = await isBlockedByUser(user.id)
  const isBlockedByMe = await isBlockedByself(user.id)

  if(isBlockMe) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>User: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>Is following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} isBlockedByMe={isBlockedByMe}/>
    </div>
  );
};

export default UserPage;
