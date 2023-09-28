import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

import {getToken,getRole} from "../helper/AuthHelper.jsx";

const StudentList = () => {
    const navigate = useNavigate();
    const token = getToken();
    const role = getRole();
    const [studentList,setStudentList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [name,setName] = useState("");
    const [SalaryList,setSalaryList] = useState([]);
    const [TotalsAmount,setTotalAmount] = useState([0]);

    const getStudentList = async () => {
        try{
            const {data} = await axios.get("https://studentsalarytrack-application.onrender.com/api/v1/GetStudent",{
                headers:{
                    authorization:token,
                    role:role
                }
            });

            setStudentList(data.data);
        }
        catch(error){
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const getSalaryCount = async () => {
        try{
            const {data} = await axios.get("https://studentsalarytrack-application.onrender.com/api/v1/CountSalary",{
                headers:{
                    authorization:token,
                    role:role
                }
            });

            setSalaryList(data.data);
        }
        catch(error){
            console.log(error);
        }
    }

    const handleSearch = (e) => {
        setName(e.target.value);
    }

    const SearchStudents = async () => {
        const response = await axios.get(`https://studentsalarytrack-application.onrender.com/api/v1/SearchStudent/${name}`,
            {
                headers:{
                    authorization:token,
                    role:role
                }
            });
        setStudentList(response.data.data);
    }

    const TotalAmount = async () => {
        const response = await axios.get(`https://studentsalarytrack-application.onrender.com/api/v1/TotalSalaryAmount`,
            {
                headers:{
                    authorization:token,
                    role:role
                }
            });
        setTotalAmount(response.data.data);
    }


    useEffect(() => {
        getStudentList()
        TotalAmount()
        getSalaryCount()
        if(!token){
            navigate("/");
        }
    }  , [
        token,
        role
    ])

if (loading) {
    return <div>
        <Loader/>
    </div>;
}




    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm p-3 mb-5 bg-body rounded">
                            <div className="card-body">
                                <h5 className="card-title">Total Salary Save</h5>
                                {SalaryList.map((salary) => (
                                    <h3 className="card-text" key={salary.id}>{salary.count}</h3>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm p-3 mb-5 bg-body rounded">
                            <div className="card-body">
                                <h5 className="card-title">Total Amount</h5>
                                {TotalsAmount.map((salary) => (
                                    <h3 className="card-text" key={salary.id}>{salary.TotalAmount}</h3>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="text-center mb-4">
                        <i className="fas fa-user-circle mr-2"></i> Student List
                    </h1>
                    <div className="form-group ">
                        <input type="text" className="form-control " placeholder="Search Student" value={name} onChange={handleSearch}/>
                        <button className="btn btn-primary m-2" onClick={SearchStudents}>Search</button>
                    </div>
                </div>
                <table className="table table-striped shadow p-3 mb-5 bg-body rounded">
                    <thead>
                    <tr>
                        <th scope="col" className='bg-info-subtle border-1 Stname'>Student Name</th>
                        <th scope="col" className='bg-info-subtle border-1 Stname'>Student Phone</th>
                        <th scope="col" className='bg-info-subtle border-1 Stname'>Student Address</th>
                        <th scope="col" className='bg-info-subtle border-1 Stname'>Class</th>
                        <th scope="col" className='bg-info-subtle border-1 Stname'>Student Batch</th>
                        <th scope='col' className='bg-info-subtle border-1 Stname'> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentList.map((student, key) => {
                        return (
                            <tr key={student._id}>
                                <td>{student.StudentName}</td>
                                <td>{student.StudentPhone}</td>
                                <td>{student.StudentAddress}</td>
                                <td>{student.Class}</td>
                                <td>{student.StudentBatch}</td>
                                <td>
                                    <button  className='btn btn-primary m-1' onClick={() => navigate(`/createSalary/${student._id}`)}>Add Salary</button>
                                    <button className='btn btn-success' onClick={() => navigate(`/salaryList/${student._id}`)}>Salary List</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;