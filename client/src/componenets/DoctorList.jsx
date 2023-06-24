import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();

  return (
    <>
      <div className="card m-2" style={{cursor:'pointer'}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Address</b> {doctor.address}
          </p>
          <p>
            <b>Phone</b> {doctor.phone}
          </p>
          <p>
            <b>Email</b> {doctor.email}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultantion</b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Timings</b> {doctor.timing[0]} - {doctor.timing[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
