import { useAuth } from "../context/AuthContext";
export default function HomePage() {
    const { logout } = useAuth()
    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <h1 className="text-red-500 text-4xl font-bold text-center">
                  <button className="bg-gray-800 text-white px-5 py-2 me-3" onClick={logout}>Logout</button>
                Home Page add 
            </h1>
        </div>
    )
}