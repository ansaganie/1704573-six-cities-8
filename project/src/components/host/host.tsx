import React from 'react';
import IAbstractUser from '../../models/IAbstractUser';
import combineClass from '../../utils/combine-class';

type HostProps = {
  host: IAbstractUser,
  description: string,
}

function Host({ host, description }: HostProps): JSX.Element {
  const { isPro, name, avatarUrl } = host;

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div
          className={combineClass({
            'property__avatar-wrapper user__avatar-wrapper': true,
            'property__avatar-wrapper--pro': isPro,
          })}
        >
          <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="property__user-name">{name}</span>
        {isPro && <span className="property__user-status">Pro</span>}
      </div>
      <div className="property__description">
        <p className="property__text">{description}</p>
      </div>
    </div>
  );
}

export default Host;
