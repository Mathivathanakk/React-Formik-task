import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ setId }) => {
  const [detail, setDetail] = useState([]);
  const navigate = useNavigate();
  const [deleteData, setDeleteData] = useState([]);
  // useeffect for fetching the data
  useEffect(() => {
    fetchdata();
  }, [deleteData]); //deletedata for rerendering

  //fetching the data by get method using api
  const fetchdata = async () => {
    await axios
      .get("https://664de975ede9a2b556557010.mockapi.io/api/records")
      .then((res) => setDetail(res.data))
      .catch((error) => console.log(error));
  };

  //deleting the data from api using delete method
  const handleDelete = async (id) => {
    await axios
      .delete(`https://664de975ede9a2b556557010.mockapi.io/api/records/${id}`)
      .then((res) => setDeleteData(res.data))
      .then((error) => console.log(error));
  };
  // editting by id
  const handleEdit = (id) => {
    setId(id);
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4  m-1">
          {detail.map((element, index) => {
            return (
              <div className="col">
                {/* card start */}
                <div className="card " key={index}>
                  <div className="row">
                    <div className="col">
                      <div className="card-header">
                        <h2 className="text-center">Book Records</h2>
                      </div>
                    </div>
                  </div>
                  {/* card body book record start */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Title</h4>
                      </div>
                      <div className="col-md-6">
                        <h4 className="text-primary">:{element.books.title}</h4>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <h4>Author</h4>
                      </div>
                      <div className="col-md-6">
                        <h4 className="text-primary">
                          :{element.books.author}
                        </h4>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <h4>ISBN Number</h4>
                      </div>
                      <div className="col-md-6">
                        <h4 className="text-primary">
                          :{element.books.isbnnumber}
                        </h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Publication</h4>
                      </div>
                      <div className="col-md-6">
                        <h4 className="text-primary">
                          :{element.books.publication_date}
                        </h4>
                      </div>
                    </div>
                  </div>
                  {/* card body book record end*/}
                  <hr />
                  <div className="row">
                    <div className="col">
                      <div className="card-header">
                        <h2 className="text-center">Author Record</h2>
                      </div>
                    </div>
                  </div>
                  {/* card body author record start */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Name</h4>
                      </div>
                      <div className="col-md-6">
                        <h4 className="text-primary">:{element.author.name}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h4>DOB</h4>
                      </div>
                      <div className="col-md-6">
                        <h4 className="text-primary">:{element.author.dob}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Biography</h4>
                      </div>
                      <div className="col-md-6">
                        <h4 className="text-primary">
                          :{element.author.biography}
                        </h4>
                      </div>
                    </div>
                  </div>
                  {/* card body author record end*/}
                  {/* card footer start */}
                  <div className="card-footer">
                    <div className="d-flex justify-content-center  align-content-center ">
                      {/* edit button */}
                      <button
                        className="btn btn-success m-1"
                        onClick={() => {
                          handleEdit(element.id);
                        }}
                      >
                        EDIT
                      </button>
                      {/* delete button */}
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => {
                          handleDelete(element.id);
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                  {/* card footer end */}
                </div>
                {/* card end */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Card;
