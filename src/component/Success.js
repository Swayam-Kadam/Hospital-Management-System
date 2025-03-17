import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-success" style={{ height: '100vh' }}>
      <div className="card p-5">
        <div className="card-body text-center">
        <i className="fa-solid fa-circle-check my-3" style={{fontSize:'5rem',color: 'green'}}></i>
          <h2 className="text-success">Payment Successful 🎉</h2>
          <Link to="/" className='text-success'>Home 🏠</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;

