import { ProfileSkeleton } from "../ProfileSkeleton";

export const ListOfProfilesSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <ProfileSkeleton key={index} />
      ))}
    </div>
  );
};
