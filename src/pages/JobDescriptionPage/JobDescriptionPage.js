import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import JobDescription from "../../component/JobDescription/JobDescription";

const JobDescriptionPage = () => {
  
  return (
    <div style={{background:"rgba(255, 238, 238, 1)"}}>
      <Navbar />
      <JobDescription />
    </div>
  );
};

export default JobDescriptionPage;
