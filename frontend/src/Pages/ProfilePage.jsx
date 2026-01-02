// import { FaCamera } from "react-icons/fa";
// import { authStore } from "../store/authStore";

// const ProfilePage = () => {
//   const { loggedUser, updateProfile } = authStore();

//   const handleProfileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       await updateProfile({ profilepic: reader.result });
//     };
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-gradient-to-r from-gray-500 to-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
//         <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-400 opacity-20 rounded-full z-0 animate-pulse"></div>
//         <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400 opacity-20 rounded-full z-0 animate-pulse"></div>
//         <div className="relative z-10 flex flex-col items-center">
//           <div className="relative mb-6">
//             <img
//               src={loggedUser.profilepic}
//               alt="Profile"
//               className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg object-cover"
//             />
            
//             <label
//               htmlFor="profile-upload"
//               className="absolute bottom-2 right-2 bg-gray-400 p-2 rounded-full shadow hover:bg-blue-100 transition cursor-pointer"
//               title="Change Profile Picture"
//             >
//               <FaCamera className="text-blue-500 text-lg" />
//               <input
//                 id="profile-upload"
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleProfileUpload}
//               />
//             </label>
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-1">
//             {loggedUser.username}
//           </h2>
//           <p className="text-gray-200 mb-6">{loggedUser.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProfilePage;


import { FaCamera } from "react-icons/fa";
import { authStore } from "../store/authStore";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

const ProfilePage = () => {
  const { loggedUser, updateProfile } = authStore();

  if (!loggedUser) return null;

  const handleProfileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      await updateProfile({ profilepic: reader.result });
    };
  };

  const profileImage =
    loggedUser.profilepic && loggedUser.profilepic.trim() !== ""
      ? loggedUser.profilepic
      : DEFAULT_AVATAR;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
        {/* Decorative bubbles */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-400 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400 opacity-20 rounded-full animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg object-cover"
            />

            <label
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-gray-300 p-2 rounded-full shadow hover:bg-blue-100 transition cursor-pointer"
              title="Change Profile Picture"
            >
              <FaCamera className="text-blue-600 text-lg" />
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfileUpload}
              />
            </label>
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-bold text-white mb-1">
            {loggedUser.username}
          </h2>
          <p className="text-gray-200">{loggedUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
