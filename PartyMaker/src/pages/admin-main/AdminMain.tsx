import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import NavBar from "../../components/navBar/NavBar";
import "./AdminMain.scss";
import GeneralBtn from "../../components/generalBtn/GeneralBtn";

const AdminMain = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="adminMain">
      <NavBar />
      <h1>Admin Main</h1>
      <GeneralBtn
        buttonText="Parties"
        onClick={() => navigate("/admin/parties")}
      />
      <GeneralBtn buttonText="Users" onClick={() => navigate("/admin/users")} />
    </div>
  );
};

export default AdminMain;
