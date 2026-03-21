import "./Programs.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
// import program_icon_1 from "../../assets/program-icon-1.png"
// import program_icon_2 from "../../assets/program-icon-2.png"
// import program_icon_3 from "../../assets/program-icon-3.png"

const Programs = () => {
    const [programImages, setProgramImages] = useState([]);

    useEffect(() => {
        const fetchProgramImages = async () => {
            try {
                const { data } = await api.get("/gallery");
                const images = (data || [])
                    .filter((item) => item.mediaType === "image")
                    .slice(0, 3)
                    .map((item) => item.imageUrl);
                setProgramImages(images);
            } catch (error) {
                console.error("Error loading program images:", error);
                setProgramImages([]);
            }
        };

        fetchProgramImages();
    }, []);

    const img1 = programImages[0] || "https://via.placeholder.com/600x400?text=Program+1";
    const img2 = programImages[1] || "https://via.placeholder.com/600x400?text=Program+2";
    const img3 = programImages[2] || "https://via.placeholder.com/600x400?text=Program+3";

  return (
    <div className="programs" id = "program">
        <div className="program">
                        <img src={img1} alt="" className="campus11" />
            <div className="caption">
                {/* <img src={program_icon_1} alt="" /> */}
                <p>Yoga and Mindfulness Programs</p>
            </div>
            </div>
        <div className="program">
                        <img src={img2} alt="" />
            <div className="caption">
                {/* <img src={program_icon_2} alt="" /> */}
                <p>Environmental Programs</p>
            </div>
            </div>      
        <div className="program">
                        <img src={img3} alt="" className="campus6" />
            <div className="caption">
                {/* <img src={program_icon_3} alt="" /> */}
                <p>Cultural Programs</p>
            </div>
            </div>      
    </div>
  )
}

export default Programs
