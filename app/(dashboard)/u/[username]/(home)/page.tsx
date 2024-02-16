import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const currentLoggingUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== currentLoggingUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} isFollowing={true} />
    </div>
  );
};

export default CreatorPage;
