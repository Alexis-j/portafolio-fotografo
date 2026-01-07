import Footer from '../Footer';
import Navbar from '../Navbar';
import React from 'react';

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
