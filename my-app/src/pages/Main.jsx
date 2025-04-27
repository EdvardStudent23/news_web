import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Newsblock from '../components/Newsblock';
import NewsShortList from '../components/NewsShortList';
import NewsShortListBlock from '../components/NewsShortListBlock';
import '../styles/Pages.css'
import StackItem from '../components/StackItem';
import {StackItem3s} from '../components/StackItem';
import Footer from '../components/Footer';



export default function main() {
  return (
    <>
      <Helmet><title>Main</title></Helmet>
      <title>Main</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="stylesheet" href="../style/main.css" /> */}
      <header><Navbar /></header>
      <div className='pagetitle'>
        <h1>Main</h1>
      </div>
      <main className='main'>
        {/* нижче мейн ділиться на декілька кусків
        перший кусок - головні новини. мають виглядати як на снн
        в 3 стовпці (стек) */}

        <div className='main-container'>
          <div className='news-zone-wrapper'></div>
            <div className='news-zones'>
              {/* стеки */}
              {/* стек 1 */}
            
              <div className="stack">
                <div className="stack-inner">
                  <div className="container-title">
                    {/* Заголовок */}
                  </div>

                  <div className="container-lead-package">
                    <div className="package-news">
                      <div><Newsblock/></div>
                      <div><NewsShortList/></div>

                      <div class='stack2-block'>
                        <div class='NSLB'><NewsShortListBlock/></div>
                        <div class='NSLB'><NewsShortListBlock/></div>
                        <div class='NSLB'><NewsShortListBlock/></div>
                      
                        {/* <div className='NewsShortListBlock'>
                          <div><NewsShortListBlock/></div>
                        </div>
                        <div className='NewsShortListBlock'>
                          <div><NewsShortListBlock/></div>
                        </div>
                        <div className='NewsShortListBlock'>
                          <div><NewsShortListBlock/></div>
                        </div> */}
                      </div>

                      {/* <div className='news-block'>
                        <img src="" alt="package-news-image" />

                        <div className="package-news-content">
                          {/* Головна новина */}
                        {/* </div>
                      </div>  */}
          
                    </div>
                  </div>
                </div>
              </div>

              {/* стек 2 */}
              <div className="stack">
                <div className="stack-inner">

                  {/* внутрішня частина стека 2 */}
                  <div className="container-lead-package">
                    <div className="package-news">
                      {/* внутрішня частина */}

                      <div><Newsblock/></div>
                      <div><NewsShortList/></div>
                      <div><Newsblock/></div>
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* стек 3 */}
              <div className="stack">
                <div className="stack-inner">


                  {/* внутрішня частина стека 3 */}
                  <div className="container-lead-package">
                    <div className="package-news">
                      {/* внутрішня частина */}

                      <div><Newsblock/></div>
                      <div><Newsblock/></div>
                      <div className='stack3-block'>
                        <div className='NewsShortListBlock'>
                          <div><NewsShortListBlock/></div>
                        </div>
                        <div className='NewsShortListBlock'>
                          <div><NewsShortListBlock/></div>
                        </div>
                        <div className='NewsShortListBlock'>
                          <div><NewsShortListBlock/></div>
                        </div>
                      </div>
                      
                    </div>
                  </div>

                </div>
              </div>

            </div>
        </div>

        <div className='StackBlock1'>
          <div className='st1'><StackItem3s/></div>
          <div className='st2'><StackItem/></div>
          <div className='st3'><StackItem3s/></div>
        </div>

        <div className='StackBlock2'>
          <div className='st1'><StackItem3s/></div>
          <div className='st2'><StackItem3s/></div>
          <div className='st3'><StackItem3s/></div>
        </div>

      </main>
      <Footer/>
    </>
  );
}



// напиши ті блоки що далі