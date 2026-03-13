import "./Faculty.css"; // Assuming you create a new CSS file for styling
import next_icon from "../../assets/next-icon.png";
import back_icon from "../../assets/back-icon.png";
import faculty1 from "../../assets/faculty1.jpeg"; // Replace with actual images
import faculty2 from "../../assets/faculty2.jpeg"; // Add more faculty images
import faculty3 from "../../assets/faculty3.jpeg";
import faculty4 from "../../assets/faculty4.jpeg";
import { useRef } from "react";

const Faculty = () => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <div className="faculty">
      <img src={next_icon} alt="" className="next-btn" onClick={slideForward} />
      <img src={back_icon} alt="" className="back-btn" onClick={slideBackward} />
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={faculty1} alt="Faculty 1" />
                <div>
                  <h3>Dr. John Doe</h3>
                  <span>Mathematics Department</span>
                </div>
              </div>
              <p>
                Dr. John Doe has over 10 years of experience in teaching Mathematics. He is known for his engaging teaching style and dedication to student success.
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={faculty2} alt="Faculty 2" />
                <div>
                  <h3>Prof. Jane Smith</h3>
                  <span>Science Department</span>
                </div>
              </div>
              <p>
                Prof. Jane Smith specializes in Physics and has published several research papers in reputed journals. She is passionate about inspiring young minds.
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={faculty3} alt="Faculty 3" />
                <div>
                  <h3>Mr. Alan Brown</h3>
                  <span>History Department</span>
                </div>
              </div>
              <p>
                Mr. Alan Brown is a dedicated History teacher with a knack for making history come alive through storytelling and real-world connections.
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={faculty4} alt="Faculty 4" />
                <div>
                  <h3>Ms. Emily White</h3>
                  <span>Language Arts Department</span>
                </div>
              </div>
              <p>
                Ms. Emily White has a passion for literature and writing, encouraging her students to express themselves creatively and critically.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Faculty;
