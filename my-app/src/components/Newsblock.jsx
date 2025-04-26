import image from '../assets/image-icon.svg';
import "./Newsblock.css"

export default function Newsblock() {
  return (
    <div className='news-block'>

        <img src={image} alt="news-image" className='Image-icon'/>
        <div className="package-news-content">
        {/* Головна новина */}
        <h2> News headline </h2>
        </div>
  </div>
  );
}
