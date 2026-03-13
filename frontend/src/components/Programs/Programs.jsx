import "./Programs.css";
import campus11 from "../../assets/campus11.jpeg"
import campus7 from "../../assets/campus7.jpeg"
import campus6 from "../../assets/campus6.jpeg"
// import program_icon_1 from "../../assets/program-icon-1.png"
// import program_icon_2 from "../../assets/program-icon-2.png"
// import program_icon_3 from "../../assets/program-icon-3.png"



const Programs = () => {
  return (
    <div className="programs" id = "program">
        <div className="program">
            <img src={campus11} alt="" className="campus11" />
            <div className="caption">
                {/* <img src={program_icon_1} alt="" /> */}
                <p>Yoga and Mindfulness Programs</p>
            </div>
            </div>
        <div className="program">
            <img src={campus7} alt="" />
            <div className="caption">
                {/* <img src={program_icon_2} alt="" /> */}
                <p>Environmental Programs</p>
            </div>
            </div>      
        <div className="program">
            <img src={campus6} alt="" className="campus6" />
            <div className="caption">
                {/* <img src={program_icon_3} alt="" /> */}
                <p>Cultural Programs</p>
            </div>
            </div>      
    </div>
  )
}

export default Programs
