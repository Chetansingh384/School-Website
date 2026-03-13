import "./About.css";
import about_img from "../../assets/about.jpeg";
import play_icon from "../../assets/play-icon.png";

const About = ({setPlayState}) => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="" className="about-img" />
        <img src={play_icon} alt="" className="play-icon" onClick={()=> setPlayState(true)} />
      </div>
      <div className="about-right">
        <h3>ABOUT OUR SCHOOL</h3>
        <h2>Nurturing Tomorrow's Leaders Today</h2>
        <p align="justify">
        Kalidas Children High School is a premier educational school dedicated to fostering academic excellence, holistic development, and a love for learning in every student. Established with the vision of nurturing young minds and shaping future leaders, the school offers a stimulating and supportive environment that encourages curiosity, creativity, and critical thinking. With a team of highly qualified and dedicated educators, Kalidas Children High School ensures that each child receives personalized attention and guidance to reach their full potential.
        </p>
        <p align="justify">
        The school prides itself on its state-of-the-art facilities, including well-equipped classrooms, modern laboratories, a vast library, and outdoor sports areas that support both academic and extracurricular activities. Emphasizing not only academic achievement but also character building, the school integrates moral values, leadership skills, and social responsibility into its curriculum. Kalidas Children High School believes in nurturing well-rounded individuals who are prepared to face the challenges of the future with confidence and integrity.
        </p>
        <p align="justify">
        Committed to the all-round development of its students, the school promotes a variety of co-curricular activities such as sports, arts, music, and community service. Kalidas Children High School is dedicated to creating a vibrant learning community where students are inspired to excel and contribute positively to society.
        </p>
      </div>
    </div>
  );
};

export default About;
