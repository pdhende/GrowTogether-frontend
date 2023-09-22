import axios from "axios";
import swal from "sweetalert";

export function NewChild({ setShowCreateModal }) {
  const handleCreateChild = (params) => {
    console.log("handleCreateChild");
    axios.post("http://localhost:3000/children.json", params).then((response) => {
      swal({
        title: "Done!",
        text: "Your child has been added",
        icon: "success",
        type: "success",
        confirmButtonText: "OK!",
        allowOutsideClick: true,
      });
      const newChild = response.data;
      console.log("created Child profile", newChild);
      setShowCreateModal(false);
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
