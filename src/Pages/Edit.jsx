import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Edit = ({ id }) => {
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    books: {
      title: "",
      author: "",
      isbnnumber: "",
      publication_date: "",
    },
    author: {
      name: "",
      dob: "",
      biography: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`https://664de975ede9a2b556557010.mockapi.io/api/records/${id}`)
      .then((res) =>setEditData (res.data))
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    formik.setValues(editData);
  }, [editData]);

  const validationSchema = Yup.object({
    books: Yup.object({
      title: Yup.string().required("please enter the title"),
      author: Yup.string().required("please enter the author name"),
      isbnnumber: Yup.string().required("ISBN Number is required"),
      publication_date: Yup.string().required("field is empty"),
    }),
    author: Yup.object({
      name: Yup.string().required("please enter the author name"),
      dob: Yup.string().required("field is empty"),
      biography: Yup.string().required("please fill the field"),
    }),
  });

  const handleSubmit = async (values) => {
    await axios
      .put(
        `https://664de975ede9a2b556557010.mockapi.io/api/records/${id}`,
        values
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    navigate("/card");
  };

  let formik = useFormik({
    initialValues: {
      books: {
        title: "",
        author: "",
        isbnnumber: "",
        publication_date: "",
      },
      author: {
        name: "",
        dob: "",
        biography: "",
      },
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="comtainer  d-flex justify-content-center align-content-center">
      <div className="card  m-4 p-5">
        <h1 className="text-center ">EDIT YOUR RECORD</h1>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <legend className="text-center fs-2">BOOK RECORDS</legend>
          <div className="row text-center">
            <div className="col">
              <label htmlFor="name" className="fs-4">
                Title
              </label>
              <br />
              <input
                type="text"
                name="books.title"
                id="name"
                values={formik.values.books.title}
                onChange={formik.handleChange}
                required
              />
              {formik.errors.books?.title ? (
                <div className="text-danger">{formik.errors.books.title}</div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="row text-center ">
            <div className="col">
              <label htmlFor="author" className="fs-4">
                Author
              </label>
              <br />

              <input
                type="text"
                name="books.author"
                id="author"
                values={formik.values.books.author}
                onChange={formik.handleChange}
              />
              {formik.errors.books?.author ? (
                <div className="text-danger">{formik.errors.books.author}</div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="row text-center ">
            <div className="col">
              <label htmlFor="number" className="fs-4">
                ISBN Number
              </label>
              <br />
              <input
                type="text"
                name="books.isbnnumber"
                id="number"
                values={formik.values.books.isbnnumber}
                onChange={formik.handleChange}
              />
              {formik.errors.books?.isbnnumber ? (
                <div className="text-danger">
                  {formik.errors.books.isbnnumber}
                </div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="row text-center ">
            <div className="col">
              <label htmlFor="date" className="fs-4">
                Publication date
              </label>
              <br />
              <input
                type="date"
                name="books.publication_date"
                id="date"
                values={formik.values.books.publication_date}
                onChange={formik.handleChange}
              />
              {formik.errors.books?.publication_date ? (
                <div className="text-danger">
                  {formik.errors.books.publication_date}
                </div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <legend className="text-center fs-2">AUTHOR RECORDS</legend>
            </div>
          </div>
          <br />
          <div className="row text-center">
            <div className="col">
              <label htmlFor="name" className="fs-4">
                Name
              </label>
              <br />
              <input
                type="text"
                name="author.name"
                id="name"
                values={formik.values.author.name}
                onChange={formik.handleChange}
              />
              {formik.errors.author?.name ? (
                <div className="text-danger">{formik.errors.author.name}</div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="row text-center ">
            <div className="col">
              <label htmlFor="dob" className="fs-4">
                Date of Birth
              </label>
              <br />
              <input
                type="date"
                name="author.dob"
                id="dob"
                values={formik.values.author.dob}
                onChange={formik.handleChange}
              />
              {formik.errors.author?.dob ? (
                <div className="text-danger">{formik.errors.author.dob}</div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="row text-center ">
            <div className="col">
              <label htmlFor="biography" className="fs-4">
                Biography
              </label>
              <br />
              <input
                type="text"
                name="author.biography"
                id="biography"
                values={formik.values.author.biography}
                onChange={formik.handleChange}
              />
              {formik.errors.author?.biography ? (
                <div className="text-danger">
                  {formik.errors.author.biography}
                </div>
              ) : null}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col d-flex  justify-content-center  align-content-center ">
              <button className="btn btn-success" type="submit">
                Update
              </button>
            </div>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Edit;
