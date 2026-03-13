import React from "react";
import "./Course.css";
import CourseDetails from "../../assets/CourseDetails.png"; // Adjust the path based on your folder structure

const Course = () => {
  return (
    <div className="Course" id="course">
      {/* <h2>Course Details</h2> */}
      <div className="course-image-container">
        <img src={CourseDetails} alt="Course Details" className="course-image" />
      </div>
    </div>
  );
};

export default Course;
