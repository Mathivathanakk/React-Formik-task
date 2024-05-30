import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    await axios
      .get("https://664de975ede9a2b556557010.mockapi.io/api/records")
      .then((res) => setDetail(res.data))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="container">
        <div>
          <div className="text-center " style={{color:"rgb(50, 34, 65)"}}>
            <h1>Book Records</h1>
          </div>
          <br />
          <div className="tablescroll">
          <table className="table table-responsive table-bordered ">
            <thead>
              <tr>
                <th scope="col" className="text-center fs-4" >
                  Title
                </th>
                <th scope="col" className="text-center fs-4" >
                  Author
                </th>
                <th scope="col" className="text-center fs-4" >
                  ISBN Number
                </th>
                <th scope="col" className="text-center fs-4" >
                  Publication Date
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td style={{color:"rgb(104, 25, 78)"}}>{ele.books.title}</td>
                    <td style={{color:"rgb(104, 25, 78)"}}> {ele.books.author}</td>
                    <td style={{color:"rgb(104, 25, 78)"}}>{ele.books.isbnnumber}</td>
                    <td style={{color:"rgb(104, 25, 78)"}}>{ele.books.publication_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
        <div>
          <div className="text-center "  style={{color:"rgb(50, 34, 65)"}}>
            <h1>Author Records</h1>
          </div>
          <div className="tablescroll">
          <table className="table table-responsive table-bordered ">
            <thead>
              <tr>
                <th scope="col" className="text-center fs-4">
                  Name
                </th>
                <th scope="col" className="text-center fs-4">
                  DOB
                </th>
                <th scope="col" className="text-center fs-4">
                  Biography
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td style={{color:"rgb(104, 25, 78)"}}>{ele.author.name}</td>
                    <td style={{color:"rgb(104, 25, 78)"}}> {ele.author.dob}</td>
                    <td style={{color:"rgb(104, 25, 78)"}}>{ele.author.biography}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
