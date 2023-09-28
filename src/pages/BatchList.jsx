import React, { useEffect, useState } from 'react';
import BasicExample from '../components/Sideber';
import axios from "axios";
import { getToken, getRole } from "../helper/AuthHelper.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

const BatchList = () => {
    const navigate = useNavigate();
    const token = getToken();
    const role = getRole();
    const [batchList, setBatchList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBatchList = async () => {
        try {
            const { data } = await axios.get("https://studentsalarytrack-application.onrender.com/api/v1/BatchCount", {
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
    }, [navigate, token]);

    if (loading) {
        return <div>
            <BasicExample />
            <Loader />
        </div>
    }

    return (
        <div>
            <BasicExample />
            <div className="container mt-4">
                <div className="row">
                    {batchList.map((batch) => (
                        <div className="col-md-6 mb-4" key={batch.id}>
                            <div className="card shadow p-3 mb-5 bg-body rounded">
                                <div className="card-body">
                                    <h5 className="card-title">{batch._id}</h5>
                                    <p className="card-text">Student : {batch.count}</p>
                                    <a href={`/batchGetStudent/${batch._id}`} className="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BatchList;

