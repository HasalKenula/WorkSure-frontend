import CountUp from "react-countup";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../api/axios'
import MM from "../assets/man.jpg";
import {
  FaCheckCircle,
  FaBan,
  FaClock,
  FaEye,
  FaSpinner,
  FaTasks,
  FaListAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import WorkerPieCharts from "../components/WorkerProgressChart";
import { FaUser, FaTools, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import AdminNavbar from "../components/AdminNavBar";

export default function WorkerProgress() {
  const { workerId } = useParams();
  const { isAuthenticated, jwtToken } = useAuth();

  const [workers, setWorkers] = useState({});
  const [hire, setHire] = useState([]);
  const printRef = useRef(null);

  const config = {
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    api
      .get(`/worker/id/${workerId}`, config)
      .then(res => setWorkers(res.data))
      .catch(() => toast.error("Failed to load worker"));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!workers?.id) return;

    api
      .get(`/hire/${workers.id}`, config)
      .then(res => setHire(res.data))
      .catch(console.error);
  }, [workers?.id]);


  const active = hire.filter(h => !h.isBooked).length;
  const blocked = hire.filter(h => h.isBooked).length;
  const pending = hire.filter(h => h.isPending).length;
  const ongoing = hire.filter(h => h.isOngoing).length;
  const completed = hire.filter(h => h.isComplete).length;
  const seen = hire.filter(h => !h.isPending).length;
  const total = active + blocked;


  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    try {
      // Add class to hide borders/shadows for PDF
      printRef.current.classList.add("print-mode");

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: 1400,
      });

      // Remove the class after capture
      printRef.current.classList.remove("print-mode");

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("worker-progress.pdf");
    } catch (err) {
      console.error(err);
      toast.error("PDF generation failed");
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />


      <style>{`
        .pdf-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

       
        .print-mode .border {
            border: 1px solid #d1d5db !important;
        }

        .print-mode .shadow-lg {
          box-shadow: none !important;
        }

      `}</style>

      <div
        ref={printRef}
        style={{
          background: "#ffffff",
          paddingBottom: "40px",
        }}
      >

        {/* Personal Information */}
        <div className="max-w-6xl mx-auto pt-8  mt-8">
          <div style={{ background: "#f8fafc", borderRadius: "24px", padding: "32px" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", display: "flex", gap: "0.5rem" }}>
              Worker Progress
            </h1>

            <div className="flex justify-around items-center ">
              {/* Worker Image */}
              <div className="flex justify-around items-center flex-col" style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
                <div className="flex justify-center items-center relative">
                  <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                    <img
                      src={workers.user?.imageUrl || MM}
                      alt="worker"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>

              {/* Worker Details */}
              <div className="flex justify-around items-center flex-col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                {[
                  { label: "Full Name", value: workers.fullName, icon: <FaUser style={{ color: "#4b5563", marginRight: "0.5rem" }} /> },
                  { label: "Address", value: workers.address, icon: <MdLocationOn size={28} style={{ color: "#4b5563", marginRight: "0.5rem" }} /> },
                  { label: "Working Areas", value: workers.preferredServiceLocation, icon: <FaTools style={{ color: "#4b5563", marginRight: "0.5rem" }} /> },
                ].map((item, i) => (
                  <div key={i} style={{ background: "#ffffff", borderRadius: "16px", padding: "20px", border: "1px solid #d1d5db", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    {item.icon}
                    <div>
                      <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280" }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginTop: "0.25rem" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-around items-center flex-col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                {[
                  { label: "Email", value: workers.email, icon: <FaEnvelope style={{ color: "#4b5563", marginRight: "0.5rem" }} /> },
                  { label: "Contact Number", value: workers.phoneNumber, icon: <FaPhone style={{ color: "#4b5563", marginRight: "0.5rem" }} /> },
                  { label: "NIC", value: workers.nic, icon: <FaIdCard style={{ color: "#4b5563", marginRight: "0.5rem" }} /> },
                ].map((item, i) => (
                  <div key={i} style={{ background: "#ffffff", borderRadius: "16px", padding: "20px", border: "1px solid #d1d5db", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    {item.icon}
                    <div>
                      <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280" }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", marginTop: "0.25rem" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="max-w-7xl mx-auto mt-12 px-6">


          {/* FIXED GRID */}
          <div className="pdf-grid">
            {[
              { title: "Approved Job Requests", value: active, icon: <FaCheckCircle style={{ color: "#16a34a" }} /> },
              { title: "Blocked Jobs Requests", value: blocked, icon: <FaBan style={{ color: "#dc2626" }} /> },
              { title: "Pending Jobs Requests", value: pending, icon: <FaClock style={{ color: "#ca8a04" }} /> },
              { title: "Seen Jobs Requests", value: seen, icon: <FaEye style={{ color: "#2563eb" }} /> },
              { title: "Ongoing Jobs", value: ongoing, icon: <FaSpinner style={{ color: "#7c3aed" }} /> },
              { title: "Completed Jobs", value: completed, icon: <FaTasks style={{ color: "#059669" }} /> },
              { title: "Total Job Requests", value: total, icon: <FaListAlt style={{ color: "#4338ca" }} /> },
              { title: "Total Salary", value: "0", icon: <FaMoneyBillWave style={{ color: "#0f766e" }} /> },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border  border-gray-300 
                           flex flex-col items-center text-center
                           p-6 gap-4"
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "9999px",
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <div className="text-4xl font-bold">
                  <CountUp end={item.value} duration={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PIE CHART */}
        <div className="max-w-7xl mx-auto mt-16 px-6">
          <WorkerPieCharts hire={hire} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-4 px-6">
        <button
          onClick={handleDownloadPDF}
          className="px-5 py-2 bg-primary text-white rounded-lg"
        >
          Download PDF
        </button>
      </div>

    </div>
  );
}







