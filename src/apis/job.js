import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const addJob = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.post(`${backendUrl}job/create-job`, formData);
    toast.success(res?.data?.message);
    return res?.data?.job;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const editJob = async (jobId,formData) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.put(`${backendUrl}job/update-job/${jobId}`, formData);
    toast.success(res?.data?.message);
    return res?.data?.job;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const getAllJobPost = async (filter) => {
    try {
        const userId = JSON.parse(localStorage.getItem("userId")) || "";
        const reqUrl = `${backendUrl}job/all-jobs/${userId}?title=${filter.title?filter.title:""}&skills=${filter.skills?filter.skills:[]}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.errorMessage);
    }
};

export const getJobDetail = async (jobid,userid) => {
  try {
      const reqUrl = `${backendUrl}job/job-details/${jobid}/${userid}`;
      const response = await axios.get(reqUrl);
      return response.data;
  } catch (error) {
      toast.error(error?.response?.data?.errorMessage);
  }
};
