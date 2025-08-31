// system
import React from 'react';

const nextImageMock = ({ src, alt, ...rest }: any) => {
  const imgSrc = typeof src === 'string' ? src : src?.src || '';
  return <img {...rest} src={imgSrc} alt={alt} data-testid={rest['data-testid']} />;
};

export default nextImageMock;
