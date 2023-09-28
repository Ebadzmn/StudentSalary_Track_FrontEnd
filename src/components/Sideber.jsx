import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

function BasicExample() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
        toast.success("Logout Successfully");
    }
    return (
        <Navbar expand="lg" className="bg-success p-2 text-dark bg-opacity-10 shadow p-3 mb-5 rounded mb-3">
            <Container>
                <Navbar.Brand href="/studentList" className=''><p className='shadow-lg bg-opacity-10 p-3 mb-5 rounded'>
                    Student Salary Management System
                </p></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div className="px-5">
                            <button className="btn btn-success mr-2 m-2" onClick={() => navigate("/createStudent")}>Add Student</button>
                            {/*<button className="btn btn-success mr-2 m-2 ">Add Student</button>*/}
                            <button className="btn btn-success mr-2" onClick={() => navigate("/batchList")}>Batch List</button>
                            <button className="btn btn-danger mr-2 m-2" onClick={handleLogout} >LogOut</button>


                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;



// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
//
// function BasicExample() {
//     const [show, setShow] = useState(false);
//
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//
//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Launch
//             </Button>
//
//             <Offcanvas show={show} onHide={handleClose}>
//                 <Offcanvas.Header closeButton>
//                     <Offcanvas.Title>Offcanvas</Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     <div className='p-4'>
//                         <button className="btn btn-success mr-2 m-3">Add Student</button>
//                         <br/>
//                         <button className="btn btn-primary m-3">Filter Students</button>
//                     </div>
//                 </Offcanvas.Body>
//             </Offcanvas>
//         </>
//     );
// }
//
// export default BasicExample;
