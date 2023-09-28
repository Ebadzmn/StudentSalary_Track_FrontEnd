import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {getToken,getRole} from "../helper/AuthHelper.jsx";
import BasicExample from "../components/Sideber.jsx";

const CreateStudentForm = () => {
    const navigate = useNavigate();
    const[StudentName,setStudentName] = useState("");
    const [StudentPhone,setStudentPhone] = useState("");
    const [Class,setClass] = useState("");
    const [StudentBatch,setStudentBatch] = useState("");
    const token = getToken();
    const role = getRole();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!StudentName || !StudentPhone || !Class || !StudentBatch){
            toast.error("Please fill all the fields");
        }

        try{
           const StudentData = {
                StudentName,
                StudentPhone,
                Class,
                StudentBatch
           }

           const {data} = await axios.post("https://studentsalarytrack-application.onrender.com/api/v1/createStudent",StudentData,{
                headers:{
                    authorization:token,
                    role:role

                }
           });
              if(data.status === "success"){
                  toast.success("Student created successfully");
                    navigate("/studentList");
              }
        }
        catch(error){
            toast.error("You are not authorized to create student");
        }
    }

    return (
        <div>
            <BasicExample/>

            <div className="container mt-4">
                <h1 className="text-center mb-4">
                    <i className="fas fa-user-circle mr-2"></i> Create Student
                </h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <div className="form-group">
                            <label htmlFor="StudentName">Student Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="StudentName"
                                aria-describedby="emailHelp"
                                value={StudentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="Enter student's name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="StudentPhone">Student Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="StudentPhone"
                                value={StudentPhone}
                                onChange={(e) => setStudentPhone(e.target.value)}
                                placeholder="Enter student's phone"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Class">Class</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Class"
                                value={Class}
                                onChange={(e) => setClass(e.target.value)}
                                placeholder="Enter student's class"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="StudentBatch">Student Batch</label>
                            <input
                                type="text"
                                className="form-control"
                                id="StudentBatch"
                                value={StudentBatch}
                                onChange={(e) => setStudentBatch(e.target.value)}
                                placeholder="Enter student's batch"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>
            </div>

        </div>

    );
};

export default CreateStudentForm;