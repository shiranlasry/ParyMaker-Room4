
import { Link } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";

const Page404 = () => {
  return (
    <div>
      <h1 className="error">Page404</h1>
      <h3 className="error">Go back <Link className="error" to="/">Home</Link></h3>
      <Footer />
    </div>
  );
};

export default Page404;
