import React, { useEffect, useState } from "react";
import style from "./JobDescription.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editJob, getJobDetail } from "../../apis/job";
import { FaMoneyBill } from "react-icons/fa";
import { IoCalendarClear } from "react-icons/io5";

const JobDescription = () => {
  const param = useParams();
  const [job,setJob] = useState({});
  const [isEditable,setEditable] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getJobDetails();
  }, []);
  const getJobDetails = async () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const res = await getJobDetail(param.id,userId);
    setJob(res.job);
    setEditable(res.isEditable);
  };
  return (
    <div className={style.container}>
      <div className={style.header}>
          {job.jobPosition+ " " + job.locationType +" job/internship at "+ job.companyName }
      </div>
      <div className={style.jobContainer}>
        <div className={style.header1}>
           <span>1W ago</span>
           <span className={style.dot}>.</span>
           <span>{job.jobType}</span>
           <img src={job.logoUrl} alt="logo" className={style.logo}/>
           <span>{job.companyName}</span>
        </div>
        <div className={style.header2}>
            <h1 className={style.title}>{job.jobPosition}</h1>
            {isEditable&&<div className={style.edit} onClick={()=>navigate(`/create-job/`,{state:{isEdit:true,job}})}>Edit Job</div>}
        </div>
        <p className={style.location}>{job.location}</p>
        <div className={style.perks}>
            <div>
                <p className={style.lightText}><FaMoneyBill className={style.icon}/> Stipend</p>
                <p className={style.darkText}>Rs {job.salary}/month</p>
            </div>
            <div>
                <p className={style.lightText}><IoCalendarClear className={style.icon}/> Duration</p>
                <p className={style.darkText}>{job.duration}</p>
            </div>
        </div>
        <div className={style.info}>
            <h1 className={style.infoTitle}>About Company</h1>
            <p><pre className={style.infoDesc}>{job.companyDescription}</pre></p>
        </div>
        <div className={style.info}>
            <h1 className={style.infoTitle}>About the  job/internship</h1>
            <p ><pre className={style.infoDesc}>{job.jobDescription}</pre></p>
        </div>
        <div className={style.info}>
            <h1 className={style.infoTitle}>Skill(s) required</h1>
            <div className={style.skills}>
              {job?.skills?.map((skill) => (
                <div className={style.skill}>{skill}</div>
              ))}
            </div>
        </div>
        <div className={style.info}>
            <h1 className={style.infoTitle}>Additional Information</h1>
            <p ><pre className={style.infoDesc}>{job.information}</pre></p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
