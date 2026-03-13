import "./Principal.css"; // Create a CSS file for styles
import principal2 from "../../assets/principal2.png"; // Update the path to your principal image

const Principal = () => {
  return (
    <div className="principal-section">
      <img src={principal2} alt="Principal" className="principal-image" />
      <div className="principal-info">
        <h3>Vishnu Singh Chouhan</h3>
        <p align="justify">
        Wishing you all a wonderful and productive year ahead, filled with opportunities for personal growth.

I hope you enjoyed your time off with family and friends and are returning to school feeling refreshed and ready to learn.

At Kalidas Children High School, our goal is to instill strong values, a caring attitude towards others, and a solid foundation of knowledge. We aspire to prepare each of you to become responsible individuals who can lead and make a positive impact in our community and beyond.

In today’s world, safety is more important than ever. Here at our school, we prioritize your security and dedicated staff to ensure a safe learning environment. While some of these protocols may feel strict, they are all designed to keep you safe, and I appreciate your understanding and cooperation.</p>

<br></br><p align="justify">If you have any suggestions for improving safety or any other aspects of our school, please don’t hesitate to reach out to me at my email: kalidaschildrenshighschool@gmail.com

<br></br><br></br>Take care of yourselves and look out for one another.

<br></br><br></br>Wishing you all the best this school year!</p>
      </div>
    </div>
  );
};

export default Principal;
