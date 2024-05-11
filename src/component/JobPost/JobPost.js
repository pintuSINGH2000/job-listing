import React, { useEffect, useState } from "react";
import style from "./JobPost.module.css";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addJob, editJob } from "../../apis/job";

const JobPost = () => {
  const { state } = useLocation();
  const [stateData] = useState(state?.job);
  const [isEditable] = useState(state?.isEdit);
  const [updating,setUpdating] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "" || stateData?.companyName,
    logoUrl: "" || stateData?.logoUrl,
    jobPosition: "" || stateData?.jobPosition,
    salary: "" || stateData?.salary,
    jobType: "" || stateData?.jobType,
    locationType: "" || stateData?.locationType,
    location: "" || stateData?.location,
    jobDescription: "" || stateData?.jobDescription,
    companyDescription: "" || stateData?.companyDescription,
    information: "" || stateData?.information,
    skills: stateData?.skills || [],
    duration: "" || stateData?.duration,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = (e) => {
    const { value } = e.target;
    const skills = formData.skills.find((item) => item === value);
    if (skills) {
      return;
    } else {
      const updatedSkills = [...formData.skills, value];
      setFormData({ ...formData, skills: updatedSkills });
    }
  };
  const removeSkill = (skill) => {
    const skills = formData.skills;
    const filterSkill = skills.filter((element) => element !== skill);
    setFormData({ ...formData, skills: filterSkill });
  };

  const handleSubmit =async (e) => {
    if(updating) return;
    e.preventDefault();
    if (
      !formData.companyName ||
      !formData.logoUrl ||
      !formData.duration ||
      !formData.companyDescription ||
      !formData.information ||
      !formData.jobDescription ||
      !formData.jobPosition ||
      !formData.jobType ||
      !formData.location ||
      !formData.locationType ||
      !formData.salary ||
      formData.skills.length===0
    ) {
      toast.error("Fill the required field");
      return;
    }
    setUpdating(true);
    let res;
    if(isEditable){
      res = await editJob(stateData._id,formData);
    }else{
      res = await addJob(formData);
    }
    setUpdating(false);
    if(res?.isUnauthorized){
      localStorage.clear();
      navigate("/login");
      return;
    }
    if(res){
      navigate(`/job-description/${res}`);
    }
  };

  return (
    <div className={style.container}>
      <h1>Add job description</h1>
      <div className={style.form}>
        <div className={style.formGroup}>
          <label className={style.label}>Company Name </label>
          <input
            className={style.input}
            type="text"
            name="companyName"
            placeholder="Enter your company name here"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Add logo URL </label>
          <input
            className={style.input}
            type="text"
            name="logoUrl"
            placeholder="Enter the link"
            value={formData.logoUrl}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Job position</label>
          <input
            className={style.input}
            type="text"
            name="jobPosition"
            placeholder="Enter job position"
            value={formData.jobPosition}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Monthly salary </label>
          <input
            className={style.input}
            type="text"
            name="salary"
            placeholder="Enter Amount in rupees"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Job Type </label>
          <select
            className={style.select}
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Remote/office </label>
          <select
            className={style.select}
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
          >
            <option value="">Select Location Type</option>
            <option value="Remote">Remote</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Duration </label>
          <input
            className={style.input}
            type="text"
            name="duration"
            placeholder="Enter duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Location </label>
          <input
            className={style.input}
            type="text"
            name="location"
            placeholder="Enter Location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Job Description </label>
          <textarea
            className={style.input}
            type="text"
            name="jobDescription"
            rows="3"
            placeholder="Type the job description"
            value={formData.jobDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>About Company </label>
          <textarea
            className={style.input}
            type="text"
            name="companyDescription"
            rows="3"
            placeholder="Type about your company"
            value={formData.companyDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Skills Required </label>
          <select
            className={style.input}
            style={{ width: "62.5%" }}
            name="skills"
            onChange={addSkill}
          >
            <option value="" disabled selected>
              Enter the must have skills
            </option>
            {DEFAULT_SKILLS.map((skill) => (
              <option value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <div className={style.skills}>
          {formData.skills?.map((element) => (
            <span className={style.skill}>
              {element}
              <span
                className={style.remove}
                onClick={() => removeSkill(element)}
              >
                X
              </span>
            </span>
          ))}
        </div>
        <div className={style.formGroup}>
          <label className={style.label}>Information </label>
          <input
            className={style.input}
            type="text"
            name="information"
            placeholder="Enter the additional information"
            value={formData.information}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className={style.add} onClick={handleSubmit}>
        {isEditable ? "Update Job" : "Add Job"}
      </button>
      <button className={style.cancel}>Cancel</button>
    </div>
  );
};

export default JobPost;
