import React from 'react';

type InsideProps = {
  inside: string[],
}

function Inside({ inside }: InsideProps): JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {inside.map((value) => (
          <li key={value} className="property__inside-item">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inside;
