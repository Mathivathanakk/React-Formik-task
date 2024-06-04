import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Create = () => {
  const [createData, setCreateData] = useState({
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

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    books: Yup.object({
      title: Yup.string().required("please enter the title"),
      author: Yup.string().required("please enter the author name"),
      isbnnumber: Yup.string()
        .matches(/^\d{8}$/, "ISBN NUMBER MUST BE 8 DIGITS")
        .required("ISBN Number is required"),
      publication_date: Yup.string().required("field is empty"),
    }),
    author: Yup.object({
      name: Yup.string().required("please enter the author name"),
      dob: Yup.string().required("Date of birth is required"),
      biography: Yup.string().required("please fill the field"),
    }),
  });

  const formik = useFormik({
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
    onSubmit: async (values) => {
      await axios
        .post("https://664de975ede9a2b556557010.mockapi.io/api/records", values)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
      navigate("/card");
    },
  });

  return (
    <div className="comtainer  d-flex justify-content-center align-content-center">
      <div className="card  m-4 p-3">
        <h1 className="text-center ">CREATE YOUR OWN RECORD</h1>
        <br />
        {/* form start */}
        <form onSubmit={formik.handleSubmit}>
          <legend className="text-center fs-2">BOOK RECORDS</legend>
          {/* title */}
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
                value={formik.values.books.title}
                onChange={formik.handleChange}
              />
              {formik.errors.books?.title ? (
                <div className="text-danger">{formik.errors.books.title}</div>
              ) : null}
            </div>
          </div>
          <br />
          {/* author */}
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
                value={formik.values.books.author}
                onChange={formik.handleChange}
              />
              {formik.errors.books?.author ? (
                <div className="text-danger">{formik.errors.books.author}</div>
              ) : null}
            </div>
          </div>
          <br />
          {/* isbn number */}
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
                value={formik.values.books.isbnnumber}
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
          {/* publication_date */}
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
                value={formik.values.books.publication_date}
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
          {/* author name */}
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
                value={formik.values.author.name}
                onChange={formik.handleChange}
              />
              {formik.errors.author?.name ? (
                <div className="text-danger">{formik.errors.author.name}</div>
              ) : null}
            </div>
          </div>
          <br />
          {/* dob */}
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
                value={formik.values.author.dob}
                onChange={formik.handleChange}
              />
              {formik.errors.author?.dob ? (
                <div className="text-danger">{formik.errors.author.dob}</div>
              ) : null}
            </div>
          </div>
          <br />
          {/* biography */}
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
                value={formik.values.author.biography}
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
          {/* create button */}
          <div className="row">
            <div className="col d-flex  justify-content-center  align-content-center ">
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </div>
          <br />
        </form>
        {/* form end */}
      </div>
    </div>
  );
};

export default Create;
