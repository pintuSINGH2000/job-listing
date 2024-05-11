import React, { useEffect, useState } from "react";
import { getAllJobPost } from "../../apis/job";
import style from "./Homepage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlinePeople } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { DEFAULT_SKILLS } from "../../utils/constant";

const Homepage = () => {
  const [allJob, setAllJob] = useState([]);
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [clear,setClear] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchJob = async () => {
    const res = await getAllJobPost({title:title, skills:skills});
    setAllJob(res);
    setClear(false);
  };

  useEffect(() => {
    if(clear){
       fetchJob();
    }
  }, [clear]);

  const addSkill = (e) => {
    const { value } = e.target;
    const skill = skills.find((item) => item === value);
    if (skill) {
      return;
    } else {
      setSkills([...skills, value]);
    }
  };
  const removeSkill = (skill) => {
    const filterSkill = skills.filter((element) => element !== skill);
    setSkills(filterSkill);
  };
  return (
    <div className={style.container}>
      <div className={style.searchBox}>
        <div className={style.search}>
          <CiSearch
            style={{
              padding: "0px 10px",
              color: "rgba(156, 156, 156, 1)",
              fontSize: "30px",
            }}
          />
          <input
            className={style.inputSearch}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            name="search"
            placeholder="Type any job title"
          />
        </div>
        <div className={style.filter}>
          <div className={style.filterLeft}>
            <select
              className={style.selectInput}
              name="skills"
              onChange={addSkill}
            >
              {skills?.length == 0 && (
                <option value="" disabled selected>
                  Skills
                </option>
              )}
              {DEFAULT_SKILLS.map((skill) => (
                <option value={skill}>{skill}</option>
              ))}
            </select>
            <div className={style.searchSkills}>
              {skills?.map((element) => (
                <span className={style.searchSkill}>
                  {element}
                  <span
                    className={style.remove}
                    onClick={() => removeSkill(element)}
                  >
                    ╳
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className={style.filterRight}>
         
            { token && <button className={style.view} onClick={()=>navigate("/create-job")}>Add Job</button>}
            <button className={style.view} onClick={fetchJob}>
              Apply Filter
            </button>
            <span className={style.clear} onClick={()=>{setSkills([]);setTitle("");setClear(true);}}>
              Clear
            </span>
          </div>
        </div>
      </div>

      {allJob?.map((job) => (
        <div className={style.card}>
          <div className={style.left}>
            <img src={job.logoUrl} alt="logo" className={style.logo} />
            <div>
              <h1 className={style.title}>{job.jobPosition}</h1>
              <div className={style.info}>
                <span className={style.greyText}>
                  <MdOutlinePeople
                    style={{
                      fontSize: "20px",
                      color: "grey",
                      marginTop: "2px",
                      verticalAlign: "bottom",
                    }}
                  />
                  11-50
                </span>
                <span className={style.greyText}>₹ {job.salary}</span>
                <span className={style.greyText}>{job.location}</span>
              </div>
              <div className={style.info}>
                <span className={style.redText}>{job.locationType}</span>
                <span className={style.redText}>{job.jobType}</span>
              </div>
            </div>
            <div></div>
          </div>
          <div className={style.right}>
            <div className={style.skills}>
              {job?.skills?.slice(0, 4).map((skill) => (
                <div className={style.skill}>{skill}</div>
              ))}
            </div>
            <div className={style.btns}>
            {job.isEditable&&<div className={style.view} onClick={()=>navigate(`/create-job/`,{state:{isEdit:true,job}})}>Edit Job</div>}
            <Link className={style.view} to={`/job-description/${job._id}`}>
              View Details
            </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
