import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";

const DisplayCars = () => {
  const navigate = useNavigate();
  const { state: dates } = useLocation();
  const url = "http://127.0.0.1:8000";
  const [carList, setCarList] = useState([]);
  const [carImages, setCarImages] = useState([]);

  // const getCars = async () => {
  //   if (!localStorage.getItem("basicCarList")) {
  //     try {
  //       let data = await axios.get(
  //         `${url}/api/car/?start_date=${dates?.start_date}&end_date=${dates?.end_date}`
  //       );
  //       console.log(data.data)
  //       console.log(JSON.parse(localStorage.getItem("basicCarList")))
  //       if (JSON.stringify(data.data) !== localStorage.getItem("basicCarList")) {
  //         try {
  //           let data = await axios.get(
  //             `${url}/api/car/?start_date=${dates?.start_date}&end_date=${dates?.end_date}`
  //           );
  //           localStorage.setItem("basicCarList", JSON.stringify(data.data));
  //           setCarList(data.data);
  //           getCarImage(data.data);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       } else {
  //         setCarList(JSON.parse(localStorage.getItem("carList")));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     setCarList(JSON.parse(localStorage.getItem("basicCarList")))
  //   }
  // };

  const getCars = async () => {
    try {
      let data = await axios.get(
        `${url}/api/car/?start_date=${dates?.start_date}&end_date=${dates?.end_date}`
      );
      if (localStorage.getItem("raw_data") !== JSON.stringify(data.data)){
        localStorage.setItem("raw_data", JSON.stringify(data.data))
        getCarImage(data.data) 
      }else{
        setCarList(JSON.parse(localStorage.getItem("carlist")))
      }
    } catch (error) {}
  };

  const getCarImage = async (carlist) => {
    const accessKey = process.env.REACT_APP_ACCESS_KEY;
    const apiUrl = "https://api.unsplash.com/photos/random";
    const query = "car";
    const count = carlist.length;

    const url = `${apiUrl}?query=${query}&count=${count}`;

    await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        const imageUrls = data?.map((photo) => photo.urls.regular);
        setCarImages(imageUrls);
        console.log(carlist)
        let newCarList = carlist?.map((car, index) => {
          car.img = imageUrls[index];
          car.name = `${car.brand} ${car.model}`;
          car.km = `${Math.floor(Math.random() * 100000)}`;
          return car;
        });
        setCarList(newCarList);
        localStorage.setItem("carlist", JSON.stringify(newCarList));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div
      className="cars"
      style={{
        fontFamily: "Rubik,sans-serif",
      }}
    >
      <div className="cars-header position-relative">
        <div className="cars-header-front position-relative">
          <h1>CAR LISTING</h1>
          <p className="h4 mt-3">List of available cars here</p>
        </div>
      </div>
      <div className="car-area d-flex justify-content-center container">
        <div className="car-grid-container d-flex flex-wrap my-4 gap-5 justify-content-center">
          {carList?.map((car) => {
            return (
              <div
                className="rounded-4 shadow-lg p-3 d-flex flex-column row-gap-4 align-items-center bg-white"
                style={{ minWidth: "20px", maxWidth: "550px" }}
                key={car.id}
              >
                <div
                  style={{
                    backgroundImage: `url(${car.img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "80%",
                    height: "250px",
                  }}
                ></div>
                {/* <img src={car.img} style={{ maxWidth: "80%", height:"200px" }} /> */}
                <h3 className="fw-bold">{car.name}</h3>
                <p className="fw-bold h4">
                  <span>{car.rent_per_day} PLN</span>
                  <span className="text-danger">/Day</span>
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <div className="d-flex gap-1">
                    <span className="text-danger">
                      <FaCar />
                    </span>
                    <p>Model {car.year}</p>
                  </div>
                  <div className="d-flex">
                    <span className="text-danger">
                      <GiGearStickPattern />
                    </span>
                    <p>{car.gear === "a" ? "Automatic" : "Manuel"}</p>
                  </div>
                  <div className="d-flex">
                    <span className="text-danger">
                      <IoIosSpeedometer />
                    </span>
                    <p>{car.km}km</p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <button
                    className="left-inclined btn btn-danger w-50"
                    onClick={() => navigate("/rent-car", { state: car })}
                  >
                    Rent Car
                  </button>
                  <button
                    className="right-inclined btn btn-success w-50"
                    onClick={() => navigate(`${car.id}`, { state: car })}
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayCars;
