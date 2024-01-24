import { useNavigate } from "react-router-dom";
import GeneralBtn from "../../components/generalBtn/GeneralBtn";
import NavBar from "../../components/navBar/NavBar";
import "./AdminMain.scss";

const AdminMain = () => {
  const navigate = useNavigate();
  return (
    <div className="adminMain">
      <NavBar />
      <h1>Admin Main 👀</h1>
      <div>
      <GeneralBtn
        buttonText="Parties"
        onClick={() => navigate("/admin/parties")}
      />
      <GeneralBtn buttonText="Users" onClick={() => navigate("/admin/users")} />
      </div>
    </div>
  );
};

export default AdminMain;
