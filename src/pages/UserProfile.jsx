
// import Navbar from "../components/NavBar";
// import MM from "../assets/man.jpg";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import uploadFile from "../utils/meadiaUpload"; // Supabase upload
// import toast from "react-hot-toast";

// export default function UserProfile() {
//   const { jwtToken, isAuthenticated } = useAuth();

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     address: "",
//     imageUrl: "",
//   });

//   const [image, setImage] = useState(null);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//  // const [loading, setLoading] = useState(true);


//   // Fetch user profile

//   useEffect(() => {
//     if (!jwtToken) return;

//     axios
//       .get("http://localhost:8081/user", {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       })
//       .then((res) => {
//         setUser(res.data);
//         //setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [jwtToken]);


//   // Update user profile

//   const handleUpdate = async () => {
//     if (newPassword && newPassword !== confirmPassword) {
//       toast.error("New password and confirm password do not match!");
//       return;
//     }
//     let imageUrl = user.imageUrl;

//     // Upload image to Supabase if selected
//     if (image) {
//       try {
//         imageUrl = await uploadFile(image);
//       } catch (err) {
//         toast.error("Image upload failed!");
//         return;
//       }
//     }

//     const body = {
//       name: user.name,
//       email: user.email,
//       contact: user.contact,
//       address: user.address,
//       imageUrl: imageUrl,
//       currentPassword: currentPassword,
//       newPassword: newPassword,
//     };

//     try {
//       const res = await axios.post("http://localhost:8081/user/update", body, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       setUser(res.data);
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setImage(null);
//       toast.success("Profile Updated Successfully!");
//     } catch (err) {
//       toast.error(err.response?.data || "Update failed");

//     }
//   };

//   // if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="mt-20 w-full flex justify-center items-center font-outfit px-4 pt-12">
//         <div className="shadow-xl w-[80%] rounded-2xl p-6 ">

//           <h1 
//             // className="text-4xl font-bold mb-4 text-primary "
//             className="text-3xl md:text-4xl font-bold text-amber-900 mb-3 "
//           >
//             My Profile
//           </h1>

//           <div className="flex flex-col lg:flex-row gap-10 ">

//             {/* IMAGE */}
//             <div className="flex flex-col items-center">
//               <img
//                 src={image ? URL.createObjectURL(image) : user.imageUrl || MM}
//                 className="w-50 h-50 rounded-full object-cover border-4 border-primary"
//                 alt="Profile"
//               />
//               {/* <input
//                 type="file"
//                 accept="image/*"
//                 className="mt-3"
//                 onChange={(e) => setImage(e.target.files[0])}
//               /> */}

//               {/* Hidden file input */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="fileUpload"
//                 className="hidden"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />

//               {/* Custom Choose Image Button */}
//               <label
//                 htmlFor="fileUpload"
//                 className="mt-4 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-white hover:-border hover:text-black hover:border-primary transition"
//               >
//                 {image ? "Change Image" : "Choose Image"}
//               </label>

//               {/* Show selected file name */}
//               {image && <span className="mt-4 text-gray-700">{image.name}</span>}
//             </div>

//             {/* FORM */}
//             <div className="flex-1 grid grid-cols-1 gap-4  w-full">

//               <div className="flex w-full items-center justify-center">
//                 <div className="w-full flex-2  text-left">
//                   <h1 className="w-full text-lg font-semibold">User Name</h1>
//                 </div>
//                 <div className="w-full flex-8 ">
//                   <input
//                     type="text"
//                     value={user.name}
//                     onChange={(e) => setUser({ ...user, name: e.target.value })}
//                     placeholder="Full Name"
//                     className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
//                   />
//                 </div>
//               </div>


//               <div className="flex w-full items-center justify-center">
//                 <div className="w-full flex-2  text-left">
//                   <h1 className="w-full text-lg font-semibold">Email</h1>
//                 </div>
//                 <div className="w-full flex-8">
//                   <input
//                     type="email"
//                     value={user.email}
//                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                     placeholder="Email"
//                     className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
//                   />
//                 </div>
//               </div>


//               <div className="flex w-full items-center justify-center">
//                 <div className="w-full flex-2 text-left">
//                   <h1 className="w-full text-lg font-semibold">Contact Number</h1>
//                 </div>
//                 <div className="w-full flex-8">
//                   <input
//                     type="text"
//                     value={user.contact}
//                     onChange={(e) => setUser({ ...user, contact: e.target.value })}
//                     placeholder="Contact Number"
//                     className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
//                   />
//                 </div>
//               </div>



//               <div className="flex w-full items-center justify-center ">
//                 <div className="w-full flex-2  text-left">
//                   <h1 className="w-full text-lg font-semibold">Address</h1>
//                 </div>
//                 <div className="w-full flex-8">

//                   <input
//                     type="text"
//                     value={user.address}
//                     onChange={(e) => setUser({ ...user, address: e.target.value })}
//                     placeholder="Address"
//                     className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
//                   />
//                 </div>
//               </div>

//               <h1 className="text-2xl font-bold mb-4 text-primary ">Change Password</h1>

//               <input
//                 type="password"
//                 placeholder="Current Password (optional)"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
//               />

//               <input
//                 type="password"
//                 placeholder="New Password (optional)"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
//               />

//               <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
//               />

//             </div>
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               onClick={handleUpdate}
//               className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-white hover:text-slate-800 transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import uploadFile from "../utils/meadiaUpload";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function UserProfile() {
  const { jwtToken } = useAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    imageUrl: "",
  });

  const [originalUser, setOriginalUser] = useState(null);
  const [image, setImage] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    if (!jwtToken) return;

    axios
      .get("http://localhost:8081/user", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((res) => {
        setUser(res.data);
        setOriginalUser(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jwtToken]);

  /* ---------------- CONTACT VALIDATION ---------------- */
  const handleContactChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setUser({ ...user, contact: value });
  };

  /* ---------------- FORM VALIDATION ---------------- */
  const isFormValid = () => {
    if (!user.name.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!user.address.trim()) {
      toast.error("Address is required");
      return false;
    }

    if (!user.contact || user.contact.length !== 10) {
      toast.error("Contact number must be exactly 10 digits");
      return false;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  /* ---------------- UPDATE PROFILE ---------------- */
  const handleUpdate = async () => {
    if (!isFormValid()) return;

    let imageUrl = user.imageUrl;

    if (image) {
      try {
        imageUrl = await uploadFile(image);
      } catch {
        toast.error("Image upload failed");
        return;
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:8081/user/update",
        {
          ...user,
          imageUrl,
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      setUser(res.data);
      setOriginalUser(res.data);
      setImage(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data || "Update failed");
    }
  };

  /* ---------------- DISCARD ---------------- */
  const handleDiscard = () => {
    if (!originalUser) return;

    setUser(originalUser);
    setImage(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    toast("Changes discarded", { icon: "↩️" });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="mt-24 flex justify-center">
          <div className="animate-pulse w-1/2 h-64 bg-gray-300 rounded-xl"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mt-24 flex justify-center font-outfit px-4">
        <div className="w-full max-w-6xl">

          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 mb-8">
            <img
              src={image ? URL.createObjectURL(image) : user.imageUrl || MM}
              className="w-28 h-28 rounded-full object-cover border-4 border-primary"
              alt="Profile"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>

              <label
                htmlFor="fileUpload"
                //className="inline-block mt-3 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-accent transition"
                className="inline-block mt-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-102 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap"
              >
                Change Profile Photo
              </label>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">

            {/* LEFT */}
            <aside className="col-span-4 bg-white rounded-2xl shadow p-6 space-y-4">
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Contact" value={user.contact} />
              <InfoRow label="Address" value={user.address} />
            </aside>

            {/* RIGHT */}
            <main className="col-span-8 bg-white rounded-2xl shadow p-6 space-y-6">

              <Section title="Personal Information">
                <RequiredInput
                  label="Full Name"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />

                {/* CONTACT */}
                <div>
                  <label className="block font-medium mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={user.contact}
                    onChange={handleContactChange}
                    placeholder="10 digit mobile number"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-primary"
                  />
                  {/* <p className="text-xs text-gray-500 mt-1">
                    {user.contact.length}/10 digits
                  </p> */}
                </div>

                <RequiredInput
                  label="Address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </Section>

              <Section title="Security">
                <PasswordInput
                  label="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <PasswordInput
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <PasswordInput
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Section>

              <div className="flex justify-end gap-4">
                <button
                  onClick={handleDiscard}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Discard Changes
                </button>

                <button
                  onClick={handleUpdate}
                  //className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-102 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap"
                >
                  Save Changes
                </button>
              </div>

            </main>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function RequiredInput({ label, ...props }) {
  return (
    <div>
      <label className="block font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        {...props}
        className="w-full border border-gray-300 p-2 rounded focus:outline-primary"
      />
    </div>
  );
}

function PasswordInput({ label, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={show ? "text" : "password"}
        {...props}
        className="w-full border border-gray-300 p-2 rounded pr-10 focus:outline-primary"
      />
      <span
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 cursor-pointer text-gray-600"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );
}
