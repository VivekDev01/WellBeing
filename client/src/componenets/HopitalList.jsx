import React from "react";
import { useNavigate } from "react-router-dom";

const HospitalList = ({ hospital }) => {
    const navigate = useNavigate();

  return (
    <>
      <div className="card m-2" style={{cursor:'pointer'}} onClick={()=>navigate(`/hospital/book-appointment/${hospital._id}`)}>
        <div className="card-header">
           {hospital.name}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {hospital.specialization}
          </p>
          <p>
            <b>Address</b> {hospital.address}
          </p>
          <p>
            <b>Phone</b> {hospital.phone}
          </p>
          <p>
            <b>Email</b> {hospital.email}
          </p>
         
          <p>
            <b>Timings</b> {hospital.timing[0]} - {hospital.timing[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default HospitalList;
