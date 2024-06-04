import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  // useeffect for fetching the data
  useEffect(() => {
    fetchData();
  }, []);
  ////fetching the data -get by id method
  const fetchData = async () => {
    await axios
      .get(`https://664de975ede9a2b556557010.mockapi.io/api/records/${id}`)
      .then((res) =>
        setEditData({
          books: {
            title: res.data.books.title,
            author: res.data.books.author,
            isbnnumber: res.data.books.isbnnumber,
            publication_date: res.data.books.publication_date,
          },
          author: {
            name: res.data.author.name,
            dob: res.data.author.dob,
            biography: res.data.author.biography,
          },
        })
      )
      .catch((err) => console.log(err));
  };

  // useeffect for fetching the data
  useEffect(() => {
    formik.setValues(editData);
  }, [editData]);
  //validation schema
  const validationSchema = Yup.object({
    books: Yup.object({
      title: Yup.string().required("please enter the title"),
      author: Yup.string().required("please enter the author name"),
      isbnnumber: Yup.string()
        .required("ISBN Number is required")
        .matches(/^\d{8}$/, "ISBN NUMBER MUST BE 8 DIGITS"),
      publication_date: Yup.string().required("field is empty"),
    }),
    author: Yup.object({
      name: Yup.string().required("please enter the author name"),
      dob: Yup.string().required("field is empty"),
      biography: Yup.string().required("please fill the field"),
    }),
  });

  //handlesubmit
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
                onChange={formik.handleChange}
                value={formik.values.books.title}
                required
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
                onChange={formik.handleChange}
                value={formik.values.books.author}
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
                onChange={formik.handleChange}
                value={formik.values.books.isbnnumber}
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
                onChange={formik.handleChange}
                value={formik.values.books.publication_date}
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
                onChange={formik.handleChange}
                value={formik.values.author.name}
              />
              {formik.errors.author?.name ? (
                <div className="text-danger">{formik.errors.author.name}</div>
              ) : null}
            </div>
          </div>
          <br />
          {/* date of birth */}
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
                onChange={formik.handleChange}
                value={formik.values.author.dob}
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
                onChange={formik.handleChange}
                value={formik.values.author.biography}
              />
              {formik.errors.author?.biography ? (
                <div className="text-danger">
                  {formik.errors.author.biography}
                </div>
              ) : null}
            </div>
          </div>
          <br />
          {/* title */}
          <div className="row">
            <div className="col d-flex  justify-content-center  align-content-center ">
              <button className="btn btn-success" type="submit">
                Update
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

export default Edit;
