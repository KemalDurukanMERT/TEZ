import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [formCredentials, setFormCredentials] = useState()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate("/cars", {state: {start_date: formCredentials?.start_date, end_date: formCredentials?.end_date }})
  }

  const handleChange = (e) => {
    setFormCredentials((prevForm) => {
      return {...prevForm, [e.target.name]: e.target.value}
    })
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundImage:
            "url(https://msms.eu/wp-content/uploads/2020/04/Background-website-01.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          zIndex: "-3",
        }}
      ></div>
      <div className="carousel position-relative">
        <div className="slider position-absolute d-flex justify-content-center align-items-center">
          <div className="slider-inner">
            <h1>Search Your Best Cars Here.</h1>
          </div>
        </div>
        <Carousel controls={false} indicators={false} interval={7000}>
          <Carousel.Item className="carousel-item">
            <div className="blur"></div>
            <img
              className="carousel-img"
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8fDA%3D"
              text="First slide"
            />
            {/* <Carousel.Caption>
              <h3 className="slide-text">First slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item className="carousel-item">
            <div className="blur"></div>
            <img
              className="carousel-img"
              src="https://img.freepik.com/free-photo/blue-black-muscle-car-with-license-plate-that-says-trans-front_1340-23399.jpg"
              text="Second slide"
            />
            {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item className="carousel-item">
            <div className="blur"></div>
            <img
              className="carousel-img"
              src="https://img.freepik.com/free-photo/yellow-car-with-number-70-side_1340-23401.jpg"
              text="Third slide"
            />
            {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="search-area">
        <div className="search-container shadow">
          <div className="search-left">
            <div className="blur2"></div>
          </div>
          <div className="search-right w-100 h-100">
            <form className="h-100" onSubmit={handleSubmit}>
              <div className="w-100  h-100 row row-gap-3 align-items-center py-3 m-0">
                <div className="d-flex flex-column justify-content-center gap-3 align-items-end  align-sm-center flex-sm-row flex-wrap">
                  <div className="col d-flex flex-column justify-content-center align-items-center">
                    <label htmlFor="startdate" className="h3">
                      Start Date
                    </label>
                    <div
                      className="border border-black"
                      style={{
                        // width: "200px",
                        // minWidth: "120px",
                      }}
                    >
                      <input
                        type="date"
                        id="startdate"
                        className="px-sm-4 py-2 w-100 h-100"
                        style={{}}
                        onChange={handleChange}
                        name="start_date"
                      />
                    </div>
                  </div>
                  <div className="col d-flex flex-column justify-content-center align-items-center">
                    <label htmlFor="enddate" className="h3">
                      End Date
                    </label>
                    <div
                      className="border border-black"
                      style={{
                        // width: "200px",
                        // minWidth: "120px",
                      }}
                    >
                      <input
                        type="date"
                        id="enddate"
                        className="px-sm-4 py-2 w-100 h-100"
                        style={{}}
                        onChange={handleChange}
                        name="end_date"
                      />
                    </div>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center py-1">
                    <button type="submit" className="btn btn-danger">FIND CAR</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="explanation">
        <h3 className="text-danger fw-bold">About Us</h3>
        <h1 className="fw-bold display-3">Welcome to Auto Galery</h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
