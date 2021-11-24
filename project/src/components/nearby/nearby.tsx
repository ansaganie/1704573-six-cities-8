import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { OfferId } from '../../models/IOffer';
import { getNearbyOffersLoading, getNearbyOffersById } from '../../store/offer-slice/offer-selector';
import { fetchNearbyOffers } from '../../store/offer-slice/offer-thunk';
import OfferCard, { OfferCardType } from '../offer-card/offer-card';
import Spinner from '../spinner/spinner';

const MAX_NEARBY_COUNT = 3;

type NearbyProps = {
  offerId: OfferId;
};

function Nearby({ offerId }: NearbyProps): JSX.Element {
  const dispatch = useAppDispatch();
  const nearByOffers = useAppSelector((state) => getNearbyOffersById(state, offerId));
  const loading = useAppSelector(getNearbyOffersLoading);

  useEffect(() => {
    dispatch(fetchNearbyOffers(offerId));
  }, [ dispatch, offerId ]);

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
