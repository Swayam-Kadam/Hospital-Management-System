import React from 'react'
import { Link } from 'react-router-dom';

const Unsuccess = () => {
    return (
        <div className="d-flex justify-content-center align-items-center bg-danger" style={{ height: '100vh' }}>
          <div className="card p-5">
            <div className="card-body text-center">
            <i className="fa-solid fa-circle-xmark my-3" style={{fontSize:'5rem',color: 'red'}}></i>
              <h2 className="text-danger">❌ Payment Failed ❌ </h2>
              <Link to="/" className='text-danger'>Home 🏠</Link>
            </div>
          </div>
        </div>
      );
    };

export default Unsuccess
