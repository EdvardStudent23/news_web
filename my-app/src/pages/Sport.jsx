import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import '../styles/Pages.css'

export default function sport() {
  return (
    <>
      <Helmet><title>Sport</title></Helmet>
      <header><Navbar /></header>
      <h1>Sport</h1>
    </>
  );
}
