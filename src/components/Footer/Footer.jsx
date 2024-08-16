import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../../files/gallary.png'

const Footer = () => {
  return (
    <div className='container'>
        <div className="footer-about">
              <div className="">
              <div className="logo">
                <b className='logo_img'>
                 <img style={{margin: '0 10px'}} src={logo} alt="logo_img" />
                 Gallary Image
                </b>
              </div>
                <div style={{padding: '20px 0'}} className="div-about">
                <div className="footer-input">
                  <input style={{padding: '10px', borderRadius: '10px'}} type="text" placeholder='Enter Your Email' />
                  <b style={{margin: '0 10px', padding: '13px 15px', cursor: 'pointer', borderRadius: '50%', border: '1px solid #f9532d'}} className="input-icon"><i className="fa-solid fa-arrow-right"></i></b>
                  <div className='footer-img' style={{display: 'flex'}}>
                    <div className="img">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIHDQ_CU0W38ktREqnPwdVlGCdA_e4xbaDK9NrjFOpD2AqdcajDV3c9_R3vp034nrC9eyvMThwY8ifNpmH3_8GMg_SzAsLKcWQeSskaVl8HjVtLWilhcBNwfep0yRxq-Z_klBXoYTVX0BaE39VwJ2a-drZup5i8owkdaZF0-KhCaodrtN2Rii9HPZrdlk/s1600/github.png" alt='' />
                    </div>
                    <div className="img">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhoPvxJtYJq2-7BDn6LGcQ6QsT3Bo0vxkKu8WAOZnqsHIiTtGJqsHHHWlqqYN4iQFlVaqTaq7AFkWbY5Wrqxvk9Se1Wc_rjA7UKZoXHoxqSWXyaTg9aL9RC37H78NTnT4TwePdwqEYwVw8VxtjPoy6eG-f7RTJhX0JCa0lPmpfaz69hJ1ZHI9seBrUuvf4/s64/instagram.png" alt='' />
                    </div>
                    <div className="img">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-WWnXxgKNxwqarx8Vr_xpaCcwOQbv7bpFxWXy1o7DCq7jZNiT3CFdAo52AvJol-C-3InAzj6B4isdJVwVCAlUY9jxqgM43wDXrmfsqL4PGr-fsBG0YjcOzwAHFscoDXg3EGlhupxjKRwrMe7Y2bX9VzTc-RY95A03bV1avKnjwJZjh0HKbGZDEa73mPU/s1600/telegram.png" alt='' />
                    </div>
                    <div className="img">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiejpFbnjtnjhErKo-66_ATecAMmYtSrLzQYdIRMRAxLHtgMUZKnA6jGJQsTMnrniZmMhTZydWkR-l2cpZcGEBGlI4Ptl9ogR-NSPF2wNO5FQdMlL_xaGHQfPnSRIh0Lg4JX0PJLjg9p-tAL9Y8qFbbuGIW3YoolXiMja2qujyDjcFPYGzsPu-RyHle2Jc/s1600/youtube.png" alt='' />
                    </div>
                  </div>
                </div>      
                </div>
              </div>
              <div className="footer-box">
                <div className="footer-link">
                  <h4>Buying & Selling</h4>
                  <Link>Find a car</Link> <br />
                  <Link>Listings by city</Link> <br />
                  <Link>Sell your car</Link> <br />
                  <Link>Compare side by side</Link>
                </div>
                <div className="footer-link">
                  <h4>Resource</h4>
                  <Link>Blog</Link> <br />
                  <Link>Guides</Link> <br />
                  <Link>FAQ</Link> <br />
                  <Link>Help Center</Link>
                </div>
                <div className="footer-link">
                  <h4>About</h4>
                  <Link>Company</Link> <br />
                  <Link>Career</Link> <br />
                  <Link>Contact</Link>
                </div>

              </div>
        </div>
        <div style={{textAlign: 'center', padding: '30px 0'}}>
          <h6>
            With my Hobbi 
            <b> © 2023 Project Leadership</b>
          </h6>
        </div>
    </div>
  )
}

export default Footer