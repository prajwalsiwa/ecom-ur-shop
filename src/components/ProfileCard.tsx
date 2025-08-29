/* eslint-disable @next/next/no-img-element */
// components/ProfileCard.tsx
import React from "react";
import { useSession } from "next-auth/react";

const ProfileCard = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full h-fit   mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="flex items-center space-x-4">
        <img
          src={user.image || `https://i.pravatar.cc/150?u=${user.email}`}
          alt={user.name || "User avatar"}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
