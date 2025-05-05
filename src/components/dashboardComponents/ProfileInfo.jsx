import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineBriefcase,
} from "react-icons/hi";

export default function ProfileInfo() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const username = user.email.split("@")[0];
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-white flex items-center gap-2">
        <HiOutlineUser className="inline-block text-blue-900 dark:text-blue-400" />{" "}
        Profile Info
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-8 border border-gray-200 dark:border-gray-700 transition-all">
        <img
          src={`https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff&size=128`}
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-blue-500 dark:border-blue-400 object-cover shadow-lg hover:scale-105 transition-transform duration-200"
        />
        <div className="flex-1 w-full">
          <div className="mb-3 flex flex-wrap gap-2 items-center">
            <span className="block font-bold text-2xl text-black dark:text-white">
              {username}
            </span>
            <span className="inline-flex items-center bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-semibold ml-2">
              <HiOutlineBriefcase className="mr-1" />
              {`Software Engineer`}
            </span>
            <span className="inline-flex items-center bg-purple-100 text-purple-900 dark:bg-purple-900/50 dark:text-purple-200 px-2 py-0.5 rounded text-xs font-semibold ml-2">
              <HiOutlineLocationMarker className="mr-1" /> {`Cairo , Egypt`}
            </span>
          </div>
          <div className="mb-1 flex items-center text-gray-800 dark:text-gray-300 text-sm">
            <HiOutlineMail className="mr-1" />
            {user.email}
          </div>
          <p className="text-gray-800 dark:text-gray-300 mt-3 text-base leading-relaxed"></p>
        </div>
      </div>
    </section>
  );
}
