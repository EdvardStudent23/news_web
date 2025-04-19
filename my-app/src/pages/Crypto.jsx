import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import '../styles/Pages.css'

export default function crypto() {
  return (
    <>
      <Helmet><title>Crypto</title></Helmet>
      <header><Navbar /></header>
      <h1>Crypto</h1>
    </>
  );
}
