import React from 'react';
import { NumberStringObject } from '../../models/IOffer';

type InsideProps = {
  inside: NumberStringObject,
}

function Inside({ inside }: InsideProps): JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {Object.entries(inside).map(([ index, value ]) => (
          <li key={index} className="property__inside-item">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inside;
