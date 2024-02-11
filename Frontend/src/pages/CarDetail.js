import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FaCar, FaEye, FaKey, FaLock } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";
import { SiYamahamotorcorporation } from "react-icons/si";
import { MdOutlineMonitor } from "react-icons/md";

const CarDetail = () => {
  const { state: car } = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="cars-header position-relative">
        <div className="cars-header-front position-relative text-center w-100">
          <h1>{car.name.toUpperCase()}</h1>
        </div>
      </div>
      <section className="mt-4 container">
        <div className="row justify-content-center ">
          <div className="col-12 col-sm-6 text-center">
            <img src={car.img} style={{ maxWidth: "80%" }} className="my-auto" />
          </div>
          <div
            className="col-12 col-sm-6"
          >
            <div className="bg-danger text-white d-inline-block m-0 px-4 py-2 rounded">
              RENTAL
            </div>
            <h1 className="fw-bold mt-4">{car.name}</h1>
            <p className="h3 fw-bold mt-4">
              {car.rent_per_day}
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
                    <span className="text-danger"><FaCar /></span>
                    Model: {car.year}
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger"><GiGearStickPattern /></span>
                    Gears: {car.gear === "a" ? "Automatic" : "Manuel"}
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger"><IoIosSpeedometer /></span>
                    Kilometer: {car.km}
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger"><SiYamahamotorcorporation /></span>
                    Motor: V-6 Cylinder
                  </div>
                </div>
                <div className="col-12 col-sm-5">
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger"><FaEye /></span>
                    GPS Navigation
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger"><FaLock /></span>
                    Anti-Lock Brakes
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger"><FaKey /></span>
                    Remote Keyless
                  </div>
                  <div className="d-flex gap-3 mb-3">
                    <span className="text-danger"><MdOutlineMonitor /></span>
                    Rear-Seat DVD
                  </div>
                </div>
              </div>
            </section>
            <div className="border">
              <button className="btn btn-danger w-50" onClick={()=> navigate("/rent-car", {state:car})}>RENT CAR</button>
              <button className="btn btn-warning w-50" onClick={() => navigate("/cars")}>CARS</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetail;
