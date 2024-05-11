import React from "react";
import Coverimg from "../../component/Coverimg/Coverimg";
import jobimg from "../../assest/job.png";
import JobPost from "../../component/JobPost/JobPost";

const JobPostPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <JobPost />
      <Coverimg cover={jobimg} header="Recruiter add job details here" />
    </div>
  );
};

export default JobPostPage;
