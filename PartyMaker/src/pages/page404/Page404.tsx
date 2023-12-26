
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <h1 className="error">Page404</h1>
      <h3 className="error">Go back <Link className="error" to="/">Home</Link></h3>
    </div>
  );
};

export default Page404;
