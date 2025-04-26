import image from '../assets/image-icon.svg';
import "./NewsShortListBlock.css"


export default function NewsShortListBlock () {
    return (
    <div className='NewsShortListBlock'>
        <img src={image} alt='news-image' className='NSLB-image'/>
        <h3>newsheadline h3</h3>
    </div>
    )
}

export function NewsShortListBlock2 () {
    return (
    <div className='NewsShortListBlock'>
        <img src={image} alt='news-image' className='NSLB-image'/>
        <h3>newsheadline h3</h3>
    </div>
    )
}