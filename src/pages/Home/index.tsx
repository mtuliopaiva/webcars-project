// Home.tsx
import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import CarouselComponent from '../../components/Carousel/Carousel';

const Home: React.FC = () => {
  return (
    <MainLayout>
      {/* Conteúdo específico desta página */}
      <>
        <h1>Home</h1>
      <CarouselComponent />

        <p>Conteúdo da página...</p>
      </>
    </MainLayout>
  );
};

export default Home;
