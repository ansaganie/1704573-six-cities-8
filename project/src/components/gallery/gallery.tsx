import React from 'react';

type GalleryProps = {
  title: string,
  images: string[],
}

function Gallery({ title, images }: GalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((src) => (
          <div key={src} className="property__image-wrapper">
            <img className="property__image" src={src} alt={title}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
