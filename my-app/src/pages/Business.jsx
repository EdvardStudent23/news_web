import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import '../styles/Pages.css'

export default function business() {
  return (
    <>
      <Helmet><title>Business</title></Helmet>
      <header><Navbar /></header>
      <h1>Business</h1>
    </>
  );
}
