import Navbar from "../components/NavBar";
import MM from "../assets/man.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import uploadFile from "../utils/meadiaUpload";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from '../api/axios'
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

    api
      .get("/user", {
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
      const res = await api.post(
        "/user/update",
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
