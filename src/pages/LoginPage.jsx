import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {setRole,setToken} from "../helper/AuthHelper.jsx";
import toast from "react-hot-toast";


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("EbadUser@gmail.com");
    const [password, setPassword] = useState("EbadUser");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            toast.error("Please fill all the fields");
        }

        try{
            const {data} = await axios.post("https://studentsalarytrack-application.onrender.com/api/v1/signIn",{
                email,
                password
            });
            if(data?.error){
                toast.error("Something went wrong");
            }
            else{
                setToken(data.token);
                setRole(data.user.role);
                if( data.user.role === "user" ) {
                    toast.success("Welcome " + data.user.name + " You are a User");
                }
                else{
                    toast.success("Welcome Admin");
                }
                navigate("/studentList");
            }
        }
        catch(error){
            toast.error("Invalid Credentials");
        }

    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-10 pt-5 mx-auto">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h1 className="text-center mb-4">
                                    <i className="fas fa-user-circle mr-2"></i> Login {/* Add an icon before the title */}
                                </h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default LoginPage;