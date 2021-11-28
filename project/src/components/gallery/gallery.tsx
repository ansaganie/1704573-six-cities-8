import React from 'react';
import { NumberStringObject } from '../../models/IOffer';
import { shuffleArray } from '../../utils/common';

const MAX_IMAGE_COUNT = 6;

type GalleryProps = {
  title: string,
  images: NumberStringObject,
}

function Gallery({ title, images }: GalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {shuffleArray(Object.entries(images))
          .slice(0, MAX_IMAGE_COUNT)
          .map(([index, src]) => (
            <div key={index} className="property__image-wrapper">
              <img className="property__image" src={src} alt={title}/>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Gallery;
