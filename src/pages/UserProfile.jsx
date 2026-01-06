
import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import uploadFile from "../utils/meadiaUpload"; // Supabase upload
import toast from "react-hot-toast";

export default function UserProfile() {
  const { jwtToken, isAuthenticated } = useAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    imageUrl: "",
  });

  const [image, setImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 // const [loading, setLoading] = useState(true);


  // Fetch user profile

  useEffect(() => {
    if (!jwtToken) return;

    axios
      .get("http://localhost:8081/user", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((res) => {
        setUser(res.data);
        //setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jwtToken]);


  // Update user profile

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }
    let imageUrl = user.imageUrl;

    // Upload image to Supabase if selected
    if (image) {
      try {
        imageUrl = await uploadFile(image);
      } catch (err) {
        toast.error("Image upload failed!");
        return;
      }
    }

    const body = {
      name: user.name,
      email: user.email,
      contact: user.contact,
      address: user.address,
      imageUrl: imageUrl,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    try {
      const res = await axios.post("http://localhost:8081/user/update", body, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setUser(res.data);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setImage(null);
      toast.success("Profile Updated Successfully!");
    } catch (err) {
      toast.error(err.response?.data || "Update failed");

    }
  };

  // if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="mt-20 w-full flex justify-center items-center font-outfit px-4 pt-12">
        <div className="shadow-xl w-[80%] rounded-2xl p-6 ">

          <h1 
            // className="text-4xl font-bold mb-4 text-primary "
            className="text-3xl md:text-4xl font-bold text-amber-900 mb-3 "
          >
            My Profile
          </h1>

          <div className="flex flex-col lg:flex-row gap-10 ">

            {/* IMAGE */}
            <div className="flex flex-col items-center">
              <img
                src={image ? URL.createObjectURL(image) : user.imageUrl || MM}
                className="w-50 h-50 rounded-full object-cover border-4 border-primary"
                alt="Profile"
              />
              {/* <input
                type="file"
                accept="image/*"
                className="mt-3"
                onChange={(e) => setImage(e.target.files[0])}
              /> */}

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {/* Custom Choose Image Button */}
              <label
                htmlFor="fileUpload"
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-white hover:-border hover:text-black hover:border-primary transition"
              >
                {image ? "Change Image" : "Choose Image"}
              </label>

              {/* Show selected file name */}
              {image && <span className="mt-4 text-gray-700">{image.name}</span>}
            </div>

            {/* FORM */}
            <div className="flex-1 grid grid-cols-1 gap-4  w-full">

              <div className="flex w-full items-center justify-center">
                <div className="w-full flex-2  text-left">
                  <h1 className="w-full text-lg font-semibold">User Name</h1>
                </div>
                <div className="w-full flex-8 ">
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
                  />
                </div>
              </div>


              <div className="flex w-full items-center justify-center">
                <div className="w-full flex-2  text-left">
                  <h1 className="w-full text-lg font-semibold">Email</h1>
                </div>
                <div className="w-full flex-8">
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
                  />
                </div>
              </div>


              <div className="flex w-full items-center justify-center">
                <div className="w-full flex-2 text-left">
                  <h1 className="w-full text-lg font-semibold">Contact Number</h1>
                </div>
                <div className="w-full flex-8">
                  <input
                    type="text"
                    value={user.contact}
                    onChange={(e) => setUser({ ...user, contact: e.target.value })}
                    placeholder="Contact Number"
                    className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
                  />
                </div>
              </div>



              <div className="flex w-full items-center justify-center ">
                <div className="w-full flex-2  text-left">
                  <h1 className="w-full text-lg font-semibold">Address</h1>
                </div>
                <div className="w-full flex-8">

                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    placeholder="Address"
                    className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-4 text-primary ">Change Password</h1>

              <input
                type="password"
                placeholder="Current Password (optional)"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
              />

              <input
                type="password"
                placeholder="New Password (optional)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[80%] border border-gray-300 p-2 rounded  focus:outline-1 focus:outline-primary"
              />

            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleUpdate}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-white hover:text-slate-800 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
