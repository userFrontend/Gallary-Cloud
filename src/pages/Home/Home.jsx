import React from 'react'
import './Home.css'
import hero from '../../files/hero.jpg'
import { Link } from 'react-router-dom'
import { useInfoContext } from '../../context/InfoContext'
import Footer from '../../components/Footer/Footer'
const Home = ({setRegister}) => {
  const {currentUser} = useInfoContext()
  return (<>
      <main>
        <section>
         <div className="container">
          <div className="hero">
            <div className="hero-text">
            <h1>Welcome to <span style={{color: '#f9532d'}}>Picture Gallary</span></h1>
            <p>save your pictures</p>
            <Link to={!currentUser && '/auth'} onClick={() => {!currentUser && setRegister(true)}}>
              <button style={{backgroundColor: '#f9532d', color: 'white'}}>Get Started {`>>`}</button>
            </Link>
            </div>
            <div className="hero-img">
              <img src={hero} alt="image" />
            </div>
          </div>
         </div>
        </section>
        <section>
          <div className="container">
            <div className="about">
                  <h2 style={{textAlign: 'center'}}>About</h2>
                  <div className="card-box">
                    <div className="card-res">
                    <lord-icon
                      src="https://cdn.lordicon.com/ruvyooob.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#f9532d"
                      style={{width:"50px", height:"50px"}}>
                    </lord-icon>
                    <div className="card-res-body">
                      <h3 style={{color: '#f9532d'}}>Use this site</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A veniam in quae nesciunt sed assumenda nulla laboriosam ipsa, quam id dolorem praesentium dolorum. Necessitatibus distinctio expedita, dolores assumenda earum reprehenderit.</p>
                    </div>
                    </div>
                    <div className="card-res">
                    <lord-icon
                      src="https://cdn.lordicon.com/kndkiwmf.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#f9532d"
                      style={{width:"50px", height:"50px"}}>
                    </lord-icon>
                    <div className="card-res-body">
                      <h3 style={{color: '#f9532d'}}>More Information</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A veniam in quae nesciunt sed assumenda nulla laboriosam ipsa, quam id dolorem praesentium dolorum. Necessitatibus distinctio expedita, dolores assumenda earum reprehenderit.</p>
                    </div>
                    </div>
                    <div className="card-res">
                    <lord-icon
                      src="https://cdn.lordicon.com/rehjpyyh.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#f9532d"
                      style={{width:"50px", height:"50px"}}>
                    </lord-icon>
                    <div className="card-res-body">
                      <h3 style={{color: '#f9532d'}}>Popular pictures</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A veniam in quae nesciunt sed assumenda nulla laboriosam ipsa, quam id dolorem praesentium dolorum. Necessitatibus distinctio expedita, dolores assumenda earum reprehenderit.</p>
                    </div>
                    </div>
                  </div>
              </div>
          </div>
        </section>
      </main>
      <Footer/>
      </>
  )
}

export default Home