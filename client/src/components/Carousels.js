import React from 'react'
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import SearchBar from './UI/SearchBar'
import '../../node_modules/bootstrap/dist/js/bootstrap'
export default function Carousels({setSearchItem}) {
  
  return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{zIndex:2}}>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={pic1} className="d-block w-100" alt="..."  height={300} style={{objectFit:'cover'}}/>
    </div>
    <div className="carousel-item">
      <img src={pic2} className="d-block w-100" height={300} style={{objectFit:'cover'}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={pic3} className="d-block w-100" height={300}  style={{objectFit:'cover'}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  <div className='contanier mt-4'style={{display:'flex',justifyContent:'center'}} > <SearchBar setSearchItem={setSearchItem}/></div>
</div>

  )
}
