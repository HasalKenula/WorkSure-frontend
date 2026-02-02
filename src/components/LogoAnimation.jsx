import { IoIosHammer, IoIosConstruct } from "react-icons/io";
import { GiLargePaintBrush, GiAutoRepair, GiFireExtinguisher, GiVacuumCleaner } from "react-icons/gi";
import { MdCarpenter, MdElectricBolt, MdOutlinePlumbing, MdMiscellaneousServices } from "react-icons/md";
import { FaBuilding, FaWind } from "react-icons/fa";

export default function LogoAnimation() {
  return (
    <div className="flex flex-col w-full h-[300px] overflow-hidden relative my-8">
      
      {/* Icons Row */}
      <div className="ticker-icons flex absolute top-40 left-0 whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-6">
            <IoIosHammer color="#000000" size={60} />
            <GiLargePaintBrush color="#000000" size={60} />
            <MdCarpenter color="#000000" size={60} />
            <GiAutoRepair color="#000000" size={60} />
            <MdElectricBolt color="#000000" size={60} />
            <MdOutlinePlumbing color="#000000" size={60} />
            <GiVacuumCleaner color="#000000" size={60} />
            <GiFireExtinguisher color="#000000" size={60} />
            <IoIosConstruct color="#000000" size={60} />
            <MdMiscellaneousServices color="#000000" size={60} />
            <FaBuilding color="#000000" size={60} />
            <FaWind color="#000000" size={60} />
            
          </div>
        ))}
      </div>

      {/* Text Row */}
      <div className="ticker-text flex absolute bottom-0 left-0 whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 text-5xl font-bold text-black">
            <h1>Electrician</h1>
            <h1>Plumbers</h1>
            <h1>Capenters</h1>
            <h1>Painters</h1>
            <h1>Masons</h1>
            <h1>Welders</h1>
            <h1>HVAC</h1>
            <h1>Landscapers</h1>
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .ticker-icons, .ticker-text {
              display: flex;
              gap: 2rem;
              animation: scroll 30s linear infinite;
            }

            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `,
        }}
      />
    </div>
  );
}
