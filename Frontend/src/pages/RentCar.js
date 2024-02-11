import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaCar, FaEye, FaKey, FaLock } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";
import { SiYamahamotorcorporation } from "react-icons/si";
import { MdOutlineMonitor } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RentCar = () => {
  const url = "http://127.0.0.1:8000";
  const { state: car } = useLocation();
  const navigate = useNavigate();

  const [formCredentials, setFormCredentials] = useState();
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    setFormCredentials((prevForm) => {
      return { ...prevForm, [e.target.name]: e.target.value };
    });

    if (e.target.name == "start_date") {
      handleReserve(e.target.value, formCredentials?.end_date);
    } else if (e.target.name == "end_date") {
      handleReserve(formCredentials?.start_date, e.target.value);
    }
  };

  const handleReserve = (start_date, end_date) => {
    let startDate = new Date(start_date);
    let endDate = new Date(end_date);
    let day = (endDate - startDate) / (24 * 60 * 60 * 1000);
    day && setPrice(day * Number(car.rent_per_day));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${url}/api/reservation/`, {
        car: car.id,
        start_date: formCredentials.start_date,
        end_date: formCredentials.end_date
      }, {
        headers: {
          "Authorization": `Token ${localStorage.getItem('rentUser')}`,
          "Content-Type": "application/json"
        }
      })

      if (response.status == 201){
        toast.success('Reserved Successfully')
        setTimeout(()=>navigate("/rented-car"), 2000)
        
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occured")
    }
  }

  return (
    <div>
      <div className="cars-header position-relative">
        <div className="cars-header-front position-relative text-center w-100">
          <h1>RENT CAR</h1>
        </div>
      </div>
      <section className="mt-4 container">
        <div className="row justify-content-center ">
          <div className="col-12 col-md-6 text-center">
            <img
              src={car?.img}
              style={{ maxWidth: "80%" }}
              className="my-auto"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="bg-danger text-white d-inline-block m-0 my-3 px-4 py-2 rounded">
              RENTAL
            </div>
            <h1 className="fw-bold mt-4">{car?.name}</h1>
            <p className="h3 fw-bold mt-4">
              {car?.rent_per_day}
              <span className="text-danger">/Day</span>
            </p>
            <p className="text-secondary h5 mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Blanditiis fugit maxime, temporibus ducimus nobis quam mollitia
              quaerat harum ipsum cum nihil, repudiandae corrupti laboriosam
              sed.
            </p>
            <section className="container mt-5">
              <div className="row h5">
                <div className="col-12 col-sm-5">
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <FaCar />
                    </span>
                    Model: {car?.year}
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <GiGearStickPattern />
                    </span>
                    Gears: {car?.gear === "a" ? "Automatic" : "Manuel"}
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <IoIosSpeedometer />
                    </span>
                    Kilometer: {car?.km}
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <SiYamahamotorcorporation />
                    </span>
                    Motor: V-6 Cylinder
                  </div>
                </div>
                <div className="col-12 col-sm-5">
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <FaEye />
                    </span>
                    GPS Navigation
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <FaLock />
                    </span>
                    Anti-Lock Brakes
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <FaKey />
                    </span>
                    Remote Keyless
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger">
                      <MdOutlineMonitor />
                    </span>
                    Rear-Seat DVD
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <section
        className="mt-5 container mb-6 pb-6"
        style={{
          marginBottom: "300px",
        }}
      >
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-12 col-md-8 p-4 px-5">
            <div>
              <h2 className="fw-bold">Personal Information</h2>
              <div className="row gap-4 my-4 ps-2">
                <div
                  className="border px-4 py-2  rounded col-12 col-md"
                  style={{ minWidth: "fit-content" }}
                >
                  <input
                    type="text"
                    className="w-100 h-100"
                    placeholder="First Name"
                    style={{ border: "none", outline: "none" }}
                    required
                  />
                </div>
                <div
                  className="border px-4 py-2 rounded col-12 col-md"
                  style={{ minWidth: "fit-content" }}
                >
                  <input
                    type="text"
                    className="w-100 h-100"
                    placeholder="Last Name"
                    style={{ border: "none", outline: "none" }}
                    required
                  />
                </div>
                <div
                  className="border px-4 py-2 rounded col-12 col-md"
                  style={{ minWidth: "fit-content" }}
                >
                  <input
                    type="email"
                    className="w-100 h-100"
                    placeholder="Email"
                    style={{ border: "none", outline: "none" }}
                    defaultValue={JSON.parse(localStorage.getItem("userCredentials"))?.email}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="fw-bold">Booking Details</h2>
              <div className="row gap-4 my-4">
                <div
                  className="rounded col-12 col-md"
                  style={{
                    width: "200px",
                    minWidth: "120px",
                  }}
                >
                  <label className="text-danger fw-bold">Start Date</label>
                  <input
                    type="date"
                    id="startdate"
                    className="px-4  w-100 h-100 border"
                    style={{
                      border: "none",
                    }}
                    name="start_date"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div
                  className="  rounded col-12 col-md"
                  style={{
                    width: "200px",
                    minWidth: "120px",
                  }}
                >
                  <label className="text-danger fw-bold">End Date</label>
                  <input
                    type="date"
                    id="enddate"
                    className="px-4  w-100 h-100 border"
                    style={{
                      border: "none",
                    }}
                    name="end_date"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-4 p-4"
            style={{
              borderLeft: "3px solid black",
            }}
          >
            <div className="px-4 rounded-5">
              <h2 className="fw-bold">Payment Detail</h2>
              <p className="py-2 mt-4">
                Total Price: <span className="fw-bold">{price}</span>
              </p>
              <p className="py-2">
                Rented Day: <span className="fw-bold">{Math.round(price/car?.rent_per_day)}</span>
              </p>
              <p className="py-2">
                Price per Day:{" "}
                <span className="fw-bold">{car?.rent_per_day}</span>
              </p>
              <button
                className="btn btn-success w-100"
                type="submit"
              >
                RESERVE NOW
              </button>
            </div>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default RentCar;
