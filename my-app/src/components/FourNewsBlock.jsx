import image from '../assets/image-icon.svg'
import './FourNewsBlock.css'

export default function FourNewsBlock() {
  return (
    <><div className='FNB'>
        <div className='news-block'>
            <img src={image} alt="news-image" className='Image-icon'/>
            <div className="package-news-content">
            <h2> News headline </h2>
            </div>
        </div>

        <div className='news-block'>
            <img src={image} alt="news-image" className='Image-icon'/>
            <div className="package-news-content">
            <h2> News headline </h2>
            </div>
        </div>
        
        <div className='news-block'>
            <img src={image} alt="news-image" className='Image-icon'/>
            <div className="package-news-content">
            <h2> News headline </h2>
            </div>
        </div>

        <div className='news-block'>
            <img src={image} alt="news-image" className='Image-icon'/>
            <div className="package-news-content">
            <h2> News headline </h2>
            </div>
        </div>
    </div></>
  );
}
