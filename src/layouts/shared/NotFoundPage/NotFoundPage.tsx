import { useNavigate } from "react-router-dom";

const NotFoundPage = ({ children }: { children?: JSX.Element }) => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <h1>Page Was Not Found!</h1>
      {children ? children : <button onClick={redirectToHome}>Return</button>}
    </div>
  );
};

export default NotFoundPage;
