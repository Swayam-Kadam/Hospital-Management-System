import React,{useState} from 'react'
import Foter from './Foter'

const department =[
  {
    src:'/doctor/pediatrics.jpg',
    name:'PEDIATRICS'
  },
  {
    src:'/doctor/heart.jpg',
    name:'CARDIOLOGY'
  },
  {
    src:'/doctor/new.jpg',
    name:'NEUROLOGY'
  },
  {
    src:'/doctor/orthopedics.jpg',
    name:'ORTHOPEDICS'
  },
  {
    src:'/doctor/oncology.jpg',
    name:'ONCOLOGY'
  },
  {
    src:'/doctor/therapy.jpg',
    name:'PHYSICAL THERAPY'
  },
  {
    src:'/doctor/dermatology.jpg',
    name:'DERMATOLOGY'
  },
  {
    src:'/doctor/ent.jpg',
    name:'ENT'
  }
]

const Home = () => {

    const [startIndex, setStartIndex] = useState(0); // Track the first visible card
  
    const handleScrollRight = () => {
      if (startIndex + 4 < department.length) {
        setStartIndex((prevIndex) => prevIndex + 1); // Move forward by one card
      }
    };
  
    const handleScrollLeft = () => {
      if (startIndex > 0) {
        setStartIndex((prevIndex) => prevIndex - 1); // Move backward by one card
      }
    };

  return (
    <div>
      <div className="container d-flex" style={{ height: '28rem' }}>
        <div className="Details-doc" style={{ height: '100%', width: '50%', overflow: 'hidden' }}>

          <p style={{ marginTop: '2rem', backgroundColor: '#f1faee', textAlign: 'left' }}>
            <strong>Welcome to Apollo Medical Institute | Your Trusted Healthcare Provider!!</strong><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tenetur, laboriosam natus id nobis nihil unde rerum at ipsa? Veritatis ad quasi rerum delectus atque natus! Ullam officia tenetur distinctio necessitatibus sit corporis rerum? Cumque eveniet quae itaque atque modi iste dolor? Eveniet laudantium sint cum ipsum pariatur! Delectus repudiandae iste soluta ipsum eius eligendi maxime hic totam quam? Pariatur veniam, consequuntur temporibus sunt animi unde, assumenda cumque omnis excepturi facilis impedit deserunt nemo doloremque iusto ipsum, minima dignissimos doloribus! Deserunt, ad quisquam ullam magnam veritatis deleniti similique, corrupti iure tempore sequi aperiam labore dolorum dolore debitis dolor dignissimos optio quam delectus officiis quia adipisci error. Suscipit harum molestias deleniti recusandae, sequi expedita ducimus, soluta corporis fugiat voluptatibus dolorum voluptates? Corrupti delectus accusamus, laborum quisquam mollitia temporibus impedit perferendis fugiat alias ipsum distinctio obcaecati fuga! Atque odio dicta esse? Repudiandae incidunt voluptas illo distinctio nulla dicta, sit perferendis voluptate! Quidem rerum atque molestiae minus? Possimus eligendi nostrum explicabo laudantium consequatur, est </p>
        </div>
        <div className='image' style={{ height: '100%', width: '50%', marginRight: '0' }}>
          <img src="/doc1.png" alt="im" style={{ height: '100%', width: '100%' }} />
        </div>
      </div>


      <div className='container d-flex' style={{ marginTop: '5rem', height: '28rem' }}>
        <div className='image1' style={{ height: '100%', width: '50%', marginLeft: '0' }}>
          <img src="/doc2.png" alt="im" style={{ height: '100%', width: '100%' }} />
        </div>

        <div className="Details-doc1" style={{ height: '100%', width: '50%', alignContent: 'center', overflow: 'hidden' }}>

          <p style={{ marginTop: '2rem', backgroundColor: '#f1faee', textAlign: 'left' }}>
            Biography <br /><br />
            <strong>Who We Are?</strong> <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tenetur, laboriosam natus id nobis nihil unde rerum at ipsa? Veritatis ad quasi rerum delectus atque natus! Ullam officia tenetur distinctio necessitatibus sit corporis rerum? Cumque eveniet quae itaque atque modi iste dolor? Eveniet laudantium sint cum ipsum pariatur! Delectus repudiandae iste soluta ipsum eius eligendi maxime hic totam quam? Pariatur veniam, consequuntur temporibus sunt animi unde, assumenda cumque omnis excepturi facilis impedit deserunt nemo doloremque iusto ipsum, minima dignissimos doloribus! Deserunt, ad quisquam ullam magnam veritatis deleniti <br /><br />We Are Working On MERN Stack Project!!<br /><br /> tempore sequi aperiam labore dolorum dolore debitis dolor dignissimos optio quam delectus officiis quia adipisci error. Suscipit harum molestias deleniti recusandae, sequi expedita ducimus, soluta corporis fugiat voluptatibus dolorum voluptates? Corrupti delectus accusamus, laborum quisquam mollitia temporibus impedit perferendis fugiat alias ipsum distinctio obcaecati fuga! Atque odio dicta esse? Repudiandae incidunt voluptas illo distinctio nulla dicta, sit perferendis voluptate! Quidem rerum atque molestiae minus? Possimus eligendi nostrum explicabo laudantium consequatur, est </p>
        </div>
      </div>

    <div className="container" style={{ marginTop: '5rem',}}>
    <h2 style={{ color: '#457b9d', textAlign: 'left' }}>Department</h2>
      <div className='container d-flex' style={{ marginTop: '1rem', justifyContent:'space-between' }}>
        
        {/* Left Scroll Button */}
        <button
            className="btn btn"
            onClick={handleScrollLeft}
            disabled={startIndex === 0}  // Disable when at the first card
            style={{
              borderRadius:'50%',
              marginTop:'8%',
              left: '-2rem',
              height: '3rem',
              width: '3rem',
              backgroundColor:'#457b9d'
            }}
          >
            &lt;
          </button>

        {department.slice(startIndex, startIndex + 4).map((item,index)=>(
          <div  key ={index} className="card" style={{ width: '18rem',height:'15rem'}}>
          <img className="card-img-top" src={item.src} alt="Card" style={{height:'100%',borderRadius:'2rem'}}/>
          <strong style={{position:'absolute',bottom:'10%',backgroundColor:'#e63946',color:'#f1faee',borderRadius:'8px',left:'30%'}}>{item.name}</strong>
          </div>
        ))}


          {/* Right Scroll Buttons */}
          <button
            className="btn btn"
            onClick={handleScrollRight}
            disabled={startIndex + 4 >= department.length}   // Disable when at the last card
            style={{
              borderRadius:'50%',
              marginTop:'8%',
              right: '-2rem',
              height: '3rem',
              width: '3rem',
              backgroundColor:'#457b9d'
            }}
          >
            &gt;
          </button>
      </div>
      </div>
      <Foter />
    </div>
  )
}




export default Home



