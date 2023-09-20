import axios from "axios";

export function NewChild() {
  const handleCreateChild = (params) => {
    console.log("handleCreateChild");
    axios.post("http://localhost:3000/children.json", params).then((response) => {
      const newChild = response.data;
      console.log("created Child profile", newChild);
      window.location.href = "/milestoneTracker";
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    handleCreateChild(params);
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <div className="card-body">
            <h5 className="card-title text-center"> Add New Child's Profile</h5>
            <p className="card-text">
              <div>
                Name:
                <br />
                <input type="text" name="name" />
              </div>
              <div>
                Photo URL:
                <br />
                <input type="text" name="profile_image" />
              </div>
              {/* We will need to change this logic once we are connected to Cloudinary */}
              <div>
                Birth Date:
                <br />
                <input type="text" name="dob" />
              </div>

              <button className="custom-btn" type="submit">
                Add Child
              </button>
            </p>
          </div>
        </div>
      </form>{" "}
    </div>
  );
}
