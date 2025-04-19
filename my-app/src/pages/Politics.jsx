import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import '../styles/Pages.css'

export default function politics() {
  return (
    <>
      <Helmet><title>Politics</title></Helmet>
      <header><Navbar /></header>
      <h1>Politics</h1>
    </>
  );
}
