// import { Link } from "react-router-dom";
// import { FiMessageSquare } from "react-icons/fi";
// import { FaSignOutAlt } from "react-icons/fa";
// import { authStore } from "../store/authStore";

// const Navbar = () => {
//   const { logout, loggedUser } = authStore();

//   const profileImage =
//     loggedUser?.profilepic && loggedUser.profilepic.trim() !== ""
//       ? loggedUser.profilepic
//       : "/default-avatar.png"; // put this in /public folder

//   return (
//     <nav className="bg-gradient-to-r from-blue-950 to-purple-950 px-5 py-1 flex items-center justify-between shadow-lg lg:px-6">
//       <div className="flex items-center gap-3">
//         <Link
//           to="/"
//           className="text-white text-2xl hover:text-blue-200 transition flex shadow-md"
//           title="Messages"
//         >
//           <span className="p-2 font-bold">
//             <FiMessageSquare className="text-4xl text-purple-600 animate-pulse bg-blue-900 p-2 rounded-lg" />
//           </span>
//           <span className="text-2xl py-2 font-bold text-purple-500 tracking-wide drop-shadow-lg select-none">
//             NexChat
//           </span>
//         </Link>
//       </div>

//       {loggedUser && (
//         <div className="flex items-center gap-8">
//           <Link
//             to="/profile"
//             className="flex flex-row items-center text-white hover:text-blue-200 transition text-xl"
//             title="Profile"
//           >
//             <img
//               src={profileImage}
//               alt="Profile"
//               className="w-8 h-8 rounded-full object-cover border border-purple-600"
//             />
//             <span className="text-xs ml-2">Profile</span>
//           </Link>

//           <button
//             className="flex flex-row items-center text-white hover:text-red-300 transition text-xl"
//             title="Logout"
//             onClick={logout}
//           >
//             <FaSignOutAlt />
//             <span className="text-xs ml-2">Logout</span>
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { Link } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { authStore } from "../store/authStore";

const Navbar = () => {
  const { logout, loggedUser } = authStore();

  const profileImage =
    loggedUser?.profilepic && loggedUser.profilepic.trim() !== ""
      ? loggedUser.profilepic
      : "/default-avatar.png";

  return (
    <nav className="bg-gradient-to-r from-blue-950 to-purple-950 px-5 py-2 flex items-center justify-between shadow-lg lg:px-6">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-white hover:text-blue-200 transition"
      >
        <FiMessageSquare className="text-3xl text-purple-500 bg-blue-900 p-1 rounded-lg" />
        <span className="text-2xl font-bold text-purple-500 select-none">
          NexChat
        </span>
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* 🔐 USER NOT LOGGED IN */}
        {!loggedUser && (
          <>
            <Link
              to="/login"
              className="text-white hover:text-blue-200 transition text-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 px-4 py-1.5 rounded-md text-white hover:bg-purple-700 transition text-sm"
            >
              Signup
            </Link>
          </>
        )}

        {/* ✅ USER LOGGED IN */}
        {loggedUser && (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-white hover:text-blue-200 transition"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-purple-600"
              />
              <span className="text-sm">Profile</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-1 text-white hover:text-red-300 transition"
            >
              <FaSignOutAlt />
              <span className="text-sm">Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

