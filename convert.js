import { Link } from "react-router-dom";

const HomePage = () => {
  const myConstant = "Hello, World!";
  return (
    <Link to={{ pathname: "/newpage", state: { myConstant } }}>
      Go to new page
    </Link>
  );
};

// NewPage.js
import { useLocation } from "react-router-dom";

const NewPage = () => {
  const location = useLocation();
  const { myConstant } = location.state || {};
  
  return <div>{myConstant}</div>;
};



{/* <button onClick={() => onEdit(schedule.schedule_id, schedule)} style={{ marginRight: '8px' }}>
                           <FontAwesomeIcon icon={faEdit} />
                        </button> */}