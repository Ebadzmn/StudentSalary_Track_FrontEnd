
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import CreateStudentForm from "./pages/CreateStudentForm";
import StudentListPage from "./pages/StudentListPage";
import CreateAddSalary from "./pages/CreateAddSalery";
import BatchList from "./pages/BatchList";
import SelaryList from "./pages/SelaryList";
import BatchGetStudent from "./pages/BatchGetStudent";
import './assets/Style.css'



//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

//bootstrap js
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/" element={<h1>Home</h1>}/>*/}
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/createStudent" element={<CreateStudentForm/>}/>
                    <Route path="/studentList" element={<StudentListPage/>}/>
                    <Route path="/createSalary/:StudentID" element={<CreateAddSalary/>}/>
                    <Route path="/batchList" element={<BatchList/>}/>
                    <Route path="/salaryList/:StudentID" element={<SelaryList/>}/>
                    <Route path="/batchGetStudent/:BatchID" element={<BatchGetStudent/>}/>

                </Routes>
            </BrowserRouter>
            <Toaster/>
        </div>


    );
};

export default App;
