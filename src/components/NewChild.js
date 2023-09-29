import axios from "axios";
import swal from "sweetalert";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import parse from "date-fns/parse";

export function NewChild({ setShowCreateModal }) {
  const handleCreateChild = (params) => {
    console.log("handleCreateChild");
    axios
      .post("http://localhost:3000/children.json", params)
      .then((response) => {
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
    const dateVal = parseISO(params.get("dob"));
    params.set("dob", format(dateVal, "MM/dd/yyyy"));
    handleCreateChild(params);
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <br /> */}
        <div>
          <div className="card-body">
            <h5 className="card-title text-center"> Add New Child's Profile</h5>
            <p className="card-text">
              <div>
                Name:
                <br />
                <input type="text" name="name" />
              </div>
              <br />
              <div>
                Photo URL:
                <br />
                <input type="text" name="profile_image" />
              </div>
              <br />
              {/* We will need to change this logic once we are connected to Cloudinary */}
              <div>
                Birth Date:
                <br />
                <input type="date" name="dob" />
              </div>
              <br />
              <button
                className="custom-btn custom-all-btn btn-rounded"
                type="submit"
              >
                Add Child
              </button>
            </p>
          </div>
        </div>
      </form>{" "}
    </div>
  );
}
