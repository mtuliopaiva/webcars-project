import React from 'react';
import { Carousel } from 'antd';
import firstBanner from '../../assets/banners/firstBanner.png';

const contentStyle: React.CSSProperties = {
  height: '250px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselComponent: React.FC = () => (
  <Carousel autoplay>
    <div>
    <img src={firstBanner} alt="Imagem 1" style={{ ...contentStyle, backgroundImage: `url(${firstBanner})` }} />
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default CarouselComponent;