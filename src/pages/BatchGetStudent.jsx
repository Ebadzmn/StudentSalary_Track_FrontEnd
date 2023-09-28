import React, { useEffect, useState } from 'react';
import BasicExample from '../components/Sideber';
import axios from "axios";
import { getToken, getRole } from "../helper/AuthHelper.jsx";
import { useNavigate,useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";

const BatchGetStudent = () => {
    const navigate = useNavigate();
    const { BatchID } = useParams();
    const token = getToken();
    const role = getRole();
    const [batchList, setBatchList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBatchList = async () => {
        try {
            const { data } = await axios.get(`https://studentsalarytrack-application.onrender.com/api/v1/GetStudentByBatch/${BatchID}`, {
                headers: {
                    authorization: token,
                    role: role
                }
            });

            setBatchList(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBatchList();
        if (!token) {
            navigate("/");
        }
    } , [navigate, token]);

    if (loading) {
        return <div>
            <BasicExample />
            <Loader />
        </div>
    }
    return (
        <div>
            <BasicExample />

            <h1 className="text-center mb-4">
                <i className="fas fa-user-circle mr-2"></i> Student List
            </h1>


            <table className="table table-bordered table-striped shadow p-3 mb-5 bg-body rounded">
                <thead>
                <tr>
                    <th className='bg-info-subtle border-1 Stname'>StudentName</th>
                    <th className='bg-info-subtle border-1 Stname'>StudentPhone</th>
                    <th className='bg-info-subtle border-1 Stname'>StudentAddress</th>
                    <th className='bg-info-subtle border-1 Stname'>Class</th>
                    <th className='bg-info-subtle border-1 Stname'>StudentBatch</th>
                    <th className='bg-info-subtle border-1 Stname'>Action</th>


                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {batchList.map((student, index) => (
                    <tr key={index}>
                        <td >{student.StudentName}</td>
                        <td>{student.StudentPhone}</td>
                        <td>{student.StudentAddress}</td>
                        <td>{student.Class}</td>
                        <td>{student.StudentBatch}</td>
                        <td>
                            <button  className='btn btn-primary m-1' onClick={() => navigate(`/createSalary/${student._id}`)}>Add Salary</button>
                            <button className='btn btn-success' onClick={() => navigate(`/salaryList/${student._id}`)}>Salary List</button>
                        </td>

                        {/* Add more table data columns as needed */}
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default BatchGetStudent;