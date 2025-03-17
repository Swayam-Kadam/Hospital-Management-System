import React from 'react'

const foter = () => {
    return (
        <div style={{backgroundColor:'#1d3557',color:'white',borderTopLeftRadius:'1rem',borderTopRightRadius:'1rem'}}>
            <div className="container" style={{ marginTop: '5rem',height: '10rem' }}>
                <hr />
                <div className="container" style={{  marginTop: '2rem',justifyContent: 'space-between',display:'flex',height: '100%', width: '100%', overflow: 'hidden' }}>

                    <div className="image">
                        <img src='/logo.svg' alt="logo" />
                    </div>

                    <div className='timing'>
                        <table className='d-flex'>
                            <thead>
                                <tr><th>Hours</th></tr>
                                <tr><th>Monday:-</th></tr>
                                <tr><th>Wednesday:-</th></tr>
                                <tr><th>Thursday:-</th></tr>
                                <tr><th>Friday:-</th></tr>
                                <tr><th>Saturday</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>--</td></tr>
                                <tr><td>10:00AM to 11:00PM</td></tr>
                                <tr><td>10:00AM to 11:00PM</td></tr>
                                <tr><td>10:00AM to 11:00PM</td></tr>
                                <tr><td>10:00AM to 11:00PM</td></tr>
                                <tr><td>10:00AM to 8:00PM</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="conatct" >
                    <table className='d-flex'>
                            <thead>
                                <tr><th>Contect</th></tr>
                                <tr><th><i className="fa-solid fa-phone"></i></th></tr>
                                <tr><th><i className="fa-solid fa-message"></i></th></tr>
                                <tr><th><i className="fa-solid fa-location-dot"></i></th></tr>
                            </thead>
                            <tbody>
                                <tr><td>--</td></tr>
                                <tr><td>30900 203400</td></tr>
                                <tr><td>apollo@gmail.com</td></tr>
                                <tr><td>Gujarat,India</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div ><footer style={{backgroundColor:'#1d3557',marginTop:'2.5rem',color:'white'}}>&copy; All CopyRight Reserved By Apollo Medical Institute.</footer></div>
            
        </div>
    )
}

export default foter
