import React, { useState, useEffect } from 'react';
import BasicExample from '../components/Sideber'; // Corrected the import path
import axios from 'axios';
import { getToken, getRole } from '../helper/AuthHelper.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from "../components/Loader.jsx";

const SelaryList = () => {
    const navigate = useNavigate();
    const { StudentID } = useParams();
    const token = getToken();
    const role = getRole();
    const [List, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStudentById = async () => {
        try {
            const response = await axios.get(`https://studentsalarytrack-application.onrender.com/api/v1/GetSalaryByStudentId/${StudentID}`, {
                headers: {
                    authorization: token,
                    role: role,
                },
            });
            const data = response.data.data;
            setList(data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Load student data when the component mounts
        getStudentById();
    }, []); // Empty dependency array to run this effect only once


    if (loading) {
        return <Loader />;
    }
    return (
        <div>
            <BasicExample />

            <h1 className="text-center mb-4 mt-3">
                <i className="fas fa-user-circle mr-2"></i> Student List
            </h1>

            <table className="table table-striped shadow p-3 mb-5 bg-body rounded pt-3">
                <thead>
                <tr>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>StudentName</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>StudentPhone</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>StudentAddress</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>Class</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>StudentBatch</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>Date</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>Month</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>Year</th>
                    <th scope="col" className='bg-info-subtle border-1 Stname'>Amount</th>

                    {/* Add more table headers if needed */}
                </tr>
                </thead>
                <tbody>
                {List.map((item, index) => (
                    <tr key={index}>
                        <td>{item.StudentName}</td>
                        <td>{item.StudentPhone}</td>
                        <td>{item.StudentAddress}</td>
                        <td>{item.Class}</td>
                        <td>{item.StudentBatch}</td>
                        <td>{item.Date}</td>
                        <td>{item.Month}</td>
                        <td>{item.Year}</td>
                        <td>{item.Amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SelaryList;
