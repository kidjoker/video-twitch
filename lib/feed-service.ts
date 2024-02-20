import { db } from "./db";
import { getSelf } from "./auth-service";
import { Stream } from "@prisma/client";

export const getStreams = async () => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams: Stream[] = [];
  if (userId) {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
      },
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
