import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const RentedCars = () => {
  const [rentedCarList, setRentedCarList] = useState([]);
  const [editCar, setEditCar] = useState();
  const [startedit, setStartedit] = useState();
  const [endedit, setEndedit] = useState();
  const [edit, setEdit] = useState(false);
  const url = "http://127.0.0.1:8000";

  const getRentedCars = async () => {
    let carlist = [];
    try {
      const response = await axios.get(`${url}/api/reservation/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("rentUser")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        for (let car of response.data) {
          let carobject = await getCarData(car);
          carobject = { ...carobject, ...car };
          carlist.push(carobject);
        }

        setRentedCarList(carlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCarData = async (data) => {
    try {
      const response = await axios.get(`${url}/api/car/${data.car}/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${url}/api/reservation/${editCar.id}/`,
        {
          car: editCar.car,
          start_date: startedit,
          end_date: endedit,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("rentUser")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data?.message) {
        getRentedCars();
        toast.success("Update Successfull");
        setEdit(false);
        setEditCar();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getRentedCars();
  }, []);

  return (
    <>
      <div className="cars-header position-relative">
        <div className="cars-header-front position-relative text-center w-100">
          <h1>Rented Car</h1>
        </div>
      </div>
      <div className="container mt-5">
        <table className="w-100">
          <thead>
            <tr>
              <th>Plate No</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {rentedCarList.map((car, index) => {
              return (
                <tr key={index}>
                  <td>{car.plate_number}</td>
                  <td>{car.start_date}</td>
                  <td>{car.end_date}</td>
                  <td>{car.total_price}</td>
                  <td>
                    <button
                      className="btn btn-warning fw-bold"
                      onClick={() => {
                        setEdit(true);
                        setEditCar(car);
                        setStartedit(car.start_date);
                        setEndedit(car.end_date);
                      }}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {edit && (
          <div className="mt-5">
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-danger fw-bold">Start Date</h4>
                <input
                  type="date"
                  id="startdate"
                  className="px-4 py-2 w-100 h-100 border"
                  style={{
                    border: "none",
                  }}
                  name="start_date"
                  value={startedit}
                  onChange={(e) => setStartedit(e.target.value)}
                />
              </div>
              <div>
                <h4 className="text-danger fw-bold">End Date</h4>
                <input
                  type="date"
                  id="enddate"
                  className="px-4 py-2  w-100 h-100 border"
                  style={{
                    border: "none",
                  }}
                  name="end_date"
                  value={endedit}
                  onChange={(e) => setEndedit(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-success" onClick={handleUpdate}>
                UPDATE
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default RentedCars;
