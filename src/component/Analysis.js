import React, { useEffect, useState } from 'react';
import VerticalChart from './VerticalChart';
import axios from 'axios';
import { DoughnutChart } from './DoughnutChart';

const Analysis = () => {
  const [chartData, setChartData] = useState([]);
  const [Revanue,setRevanue] = useState([])
  const [doctor,setDoctor] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/appointment/appo'); 
        const appointments = response.data;

        // Count appointments per department
        const departmentCounts = {};
        appointments.forEach((app) => {
          departmentCounts[app.department] = (departmentCounts[app.department] || 0) + 1;
        });

        // Convert to chart-friendly format
        const formattedData = Object.keys(departmentCounts).map((dept) => ({
          name: dept,
          value: departmentCounts[dept],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();

    const fetchRevanue = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/appointment/appo'); 
          const appointments = response.data;
  
          // Count appointments per department
          const departmentCounts = {};
          appointments.forEach((app) => {
            departmentCounts[app.department] = (departmentCounts[app.department] || 0) + 1;
          });
  
          // Convert to chart-friendly format
          const formattedData = Object.keys(departmentCounts).map((dept) => ({
            name: dept,
            value: departmentCounts[dept]*500,
          }));
  
          setRevanue(formattedData);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
  
      fetchRevanue();

      const fetchDoctors = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/doctor'); 
          const doctors = response.data;
  
          // Count appointments per department
          const departmentCounts = {};
          doctors.forEach((app) => {
            departmentCounts[app.department] = (departmentCounts[app.department] || 0) + 1;
          });
  
          // Convert to chart-friendly format
          const formattedData = Object.keys(departmentCounts).map((dept) => ({
            name: dept,
            value: departmentCounts[dept],
          }));
  
          setDoctor(formattedData);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
  
      fetchDoctors();
  
  }, []);


    // Calculate total appointments
    const totalAppointments = chartData.reduce((sum, item) => sum + item.value, 0);

    // Calculate total Revanue
    const totalRevanue = Revanue.reduce((sum, item) => sum + item.value, 0);

    // Calculate total Doctors
    const totalDoctor = doctor.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className='container mt-5' style={{backgroundColor:'#f1faee'}}>

        <div style={{backgroundColor:'#dee2e6',borderRadius:'1rem'}}>
      <div className="container" style={{ width: '60%' }}>
      <h2 className='bg-danger text-warning my-5 rounded'>Total Appointment = {totalAppointments}+</h2>
        <VerticalChart title="Appointment Analysis" heading="Appointment" chartData={chartData} />
      </div>
      </div>

      <div className="container my-5" style={{ width: '50%' }}>
      <h2 className='bg-danger text-warning mb-5 rounded'>Total Revanue From Appointment = {totalRevanue}+</h2>
        <DoughnutChart  chartData={Revanue} />
      </div>

    <div style={{backgroundColor:'#dee2e6',borderRadius:'1rem'}}>
      <div className="container" style={{ width: '60%' }}>
      <h2 className='bg-danger text-warning my-5 rounded'>Total Doctors = {totalDoctor}+</h2>
        <VerticalChart title="Doctors Analysis" heading="Doctor" chartData={doctor} />
      </div>
      </div>

    </div>
  );
};

export default Analysis;

