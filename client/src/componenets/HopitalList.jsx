import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const HospitalList = ({ hospital }) => {
    const navigate = useNavigate();

    const formatTiming = (timing) => {
      const timingStart = moment(timing.timing_start, "HH:mm").format("HH:mm");
      const timingEnd = moment(timing.timing_end, "HH:mm").format("HH:mm");
      return `${timingStart} - ${timingEnd}`;
    };

  return (
    <>
      <div className="card m-2" style={{cursor:'pointer'}} onClick={()=>navigate(`/hospital/book-appointment/${hospital._id}`)}>
        <div className="card-header">
           {hospital.name}
        </div>
        <div className="card-body"> 
          <p>
            <b>Specializations</b> {hospital.specialization}
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
          <b>Timings:</b> {formatTiming(hospital)}
          </p>
        </div>
      </div>
    </>
  );
};

export default HospitalList;
