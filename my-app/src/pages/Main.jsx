import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import '../styles/Pages.css'

export default function main() {
  return (
    <>
      <Helmet><title>Main</title></Helmet>
      <header><Navbar /></header>
      <h1>Main</h1>
    </>
  );
}
