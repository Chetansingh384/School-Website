import { useState } from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png"
import mail_icon from "../../assets/mail-icon.png"
import phone_icon from "../../assets/phone-icon.png"
import location_icon from "../../assets/location-icon.png"
import white_arrow from "../../assets/white-arrow.png"



const Contact = () => {

    const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "b5554ec4-6cf8-4690-a019-409192e82ba6");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    }).then((res) => res.json());

    if (res.success) {
      setResult("Thank you for Contacting us!");
      event.target.reset();
    } else {
      console.log("Error", res);
      setResult(res.message);
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3> We’d Love to Hear from You! <img src={msg_icon} alt="" /></h3>
        <p align="justify">
At Kalidas Children High School, your feedback and inquiries are important to us. Whether you have questions about our programs, need assistance, or want to share your thoughts, our team is here to help. Please fill out the form below, and we will get back to you as soon as possible!
        </p>
        <ul>
          <li><img src={mail_icon} alt="" />kalidaschildrenshighschool@gmail.com</li>
          <li><img src={phone_icon} alt="" />+91 9977166947</li>
          <li> <img src={location_icon} alt="" />
          Khedi Road ,Alot  Dist. Ratlam <br /> Madhya Pradesh, India
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Your name</label>
                <input type="text" name="name" placeholder="Enter your name" required/>
            <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="Enter your mobile number" required/>
            <label>Email</label>
                <input type="email" name="email" placeholder="Enter your email" required/>
            
            <label> Write your message here</label>
            <textarea name="message" rows="6" placeholder="Enter your message" required></textarea>
            <button type="submit" className="btn dark-btn">Submit Now <img src = {white_arrow} alt = "" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};


export default Contact;

