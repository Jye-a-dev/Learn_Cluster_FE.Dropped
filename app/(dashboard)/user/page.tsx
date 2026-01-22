"use client";
import UserHeader from "@/components/pages/UserPage/UserHeader";
import UserHero from "@/components/pages/UserPage/UserHero";
export default function UserPage() {

  return (
    <div className="space-y-6">
      <UserHeader/>
      <UserHero/>
    </div>
  );
}
