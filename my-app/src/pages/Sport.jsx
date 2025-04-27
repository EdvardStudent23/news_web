import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import NewsShortListBlock from '../components/NewsShortListBlock';
import NewsShortList, { NewsShortList6 } from '../components/NewsShortList';
import Newsblock from '../components/Newsblock';
import '../styles/Sport.css'
import FourNewsBlock from '../components/FourNewsBlock';
import Footer from '../components/Footer';

export default function Sport() {
  return (
    <>
      <Helmet><title>Sport</title></Helmet>
      <title>Sport</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <header><Navbar /></header>

      <div className='pagetitle'>
        <h1>Sport</h1>
      </div>

      <main className='main'>


        <div className='main-container'>
          <div className='news-zone-wrapper'>
            <div className='news-zones'>
              <div className="stack">
                <div className="stack-inner">
                  <div className="container-title">
                    {/* Заголовок опціонально*/}
                  </div>

                  <div className="container-lead-package">
                    <div className="sport-package-news">
                      <div className='stack1'>
                        <div><Newsblock/></div>
                        <div><NewsShortList6/></div>
                      </div>

                      <div className='stack2'>
                        <div><Newsblock/></div>
                        <div><NewsShortList6/></div>
                      </div>

                      <div className='stack3'>
                        <div><Newsblock/></div>
                        <div><Newsblock/></div>
                      </div>
                    </div>  
                  </div>    
                </div>  
              </div>
            </div> 
            
            <FourNewsBlock/>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
