import ProfileSidebar from "./components/ProfileSidebar";

export default async function ProfilePage() {

  return (
    <div className="min-h-screen bg-[#FFF8FB] px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <ProfileSidebar  />
      </div>
    </div>
  );
}