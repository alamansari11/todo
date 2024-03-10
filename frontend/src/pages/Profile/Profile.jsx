import { useContext } from "react";
import { context } from "../../main";
import Loader from "../../components/Loader";
import "./Profile.css";

function Profile() {
  const { loading, user } = useContext(context);
  return loading ? (
    <Loader />
  ) : (
    <div className="parent_card">
      <div className="card">
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
    </div>
  );
}

export default Profile;
