import React, { useState, useEffect } from 'react';
import BasicExample from '../components/Sideber'; // Corrected the import path
import axios from 'axios';
import { getToken, getRole } from '../helper/AuthHelper.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateAddSalary = () => {
    const navigate = useNavigate();
    const { StudentID } = useParams();
    const token = getToken();
    const role = getRole();
    const [formData, setFormData] = useState({
        StudentID: '',
        Date: '',
        Month: '',
        Year: '',
        Amount: '',
    });

    useEffect(() => {
        // Load student data when the component mounts
        getStudentById();
    }, []); // Empty dependency array to run this effect only once

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getStudentById = async () => {
        try {
            const response = await axios.get(`https://studentsalarytrack-application.onrender.com/api/v1/GetStudentById/${StudentID}`, {
                headers: {
                    authorization: token,
                    role: role,
                },
            });
            const data = response.data.data;
            setFormData({
                ...formData,
                StudentID: data._id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://studentsalarytrack-application.onrender.com/api/v1/saveSalary', formData, {
                headers: {
                    authorization: token,
                    role: role,
                },
            });
            if (data.status === 'success') {
                toast.success('Add Salary created successfully');
                navigate('/StudentList');
            }
        } catch (error) {
            toast.error('You are not authorized to create Add Salary');
        }
    };

    return (
        <div>
            <BasicExample />
            <div className="container mt-4">
                <h1 className="text-center mb-4">
                    <i className="fas fa-user-circle mr-2"></i> Create Add Salary
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className="form-group">
                            <label htmlFor="StudentId">Student Id</label>
                            <input
                                type="text"
                                className="form-control"
                                id="StudentId"
                                aria-describedby="emailHelp"
                                value={formData.StudentID}
                                onChange={handleChange}
                                name="StudentId"
                                placeholder="Enter student's Id"
                                disabled={true}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group">
                            <label htmlFor="Date">Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Date"
                                value={formData.Date}
                                onChange={handleChange}
                                name="Date"
                                placeholder="Enter Date"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group">
                            <label htmlFor="Month">Month</label>
                            <select
                                className="form-control"
                                id="Month"
                                value={formData.Month}
                                onChange={handleChange}
                                name="Month"
                                required
                            >
                                <option value="">Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-group">
                            <label htmlFor="Year">Year</label>
                            <input
                                type="year"
                                className="form-control"
                                id="Year"
                                value={formData.Year}
                                onChange={handleChange}
                                name="Year"
                                placeholder="Enter Year"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group">
                            <label htmlFor="Amount">Amount</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Amount"
                                value={formData.Amount}
                                onChange={handleChange}
                                name="Amount"
                                placeholder="Enter Amount"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAddSalary; // Corrected component name and export
