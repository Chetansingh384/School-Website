import "./Hero.css";
import dark_arrow from "../../assets/dark-arrow.png"
import {TypeAnimation} from 'react-type-animation'

const Hero = () => {
  return (
    <div className="hero container">
      
      <div className="hero-text">
        <h1>
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'The journey of a thousand miles begins with a single step.',
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        'Failure is simply the opportunity to begin again, this time more intelligently.',
        2000,
       'It does not matter how slowly you go as long as you do not stop.',
        2000
      ]}
      wrapper="span"
      speed={60}
      
      repeat={Infinity}
    />
          
</h1>
        <p className="pHero">
        शिक्षा ही धन है 
        </p>
        {/* <button className="btn">Explore more <img src={dark_arrow} alt="" /></button> */}
      </div>
    </div>
  );
};

export default Hero;
