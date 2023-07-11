import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  const formatTiming = (timing) => {
    const timingStart = new Date(timing.timing_start);
    const timingEnd = new Date(timing.timing_end);
    const startTime = timingStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = timingEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${startTime} - ${endTime}`;
  };

  return (
    <>
      <div className="card m-2" style={{ cursor: 'pointer' }} onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p>
            <b>Address:</b> {doctor.address}
          </p>
          <p>
            <b>Phone:</b> {doctor.phone}
          </p>
          <p>
            <b>Email:</b> {doctor.email}
          </p>
          <p>
            <b>Experience:</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation:</b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Timings:</b> {formatTiming(doctor)}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
