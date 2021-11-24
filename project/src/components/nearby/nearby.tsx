import React from 'react';
import IOffer from '../../models/IOffer';
import OfferCard, { OfferCardType } from '../offer-card/offer-card';
import Spinner from '../spinner/spinner';

const MAX_NEARBY_COUNT = 3;

type NearbyProps = {
  nearByOffers: IOffer[],
  loading: boolean,
};

function Nearby({ nearByOffers, loading }: NearbyProps): JSX.Element {

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighborhood</h2>
      {loading
        ? <Spinner/>
        : (
          <div className="near-places__list places__list">
            {nearByOffers.slice(0, MAX_NEARBY_COUNT).map((offer) =>
              <OfferCard key={offer.id} offer={offer} type={OfferCardType.OfferPage}/>)}
          </div>
        )}
    </section>
  );
}

export default Nearby;
