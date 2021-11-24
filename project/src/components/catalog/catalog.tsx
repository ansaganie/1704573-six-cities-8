import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentTab } from '../../store/main-page-slice/main-page-selector';
import { getFilteredOffers, getOffersLoading } from '../../store/offer-slice/offer-selector';
import { fetchOffers } from '../../store/offer-slice/offer-thunk';
import OfferCard, { OfferCardType } from '../offer-card/offer-card';
import Sorting from '../sorting/sorting';
import Spinner from '../spinner/spinner';

function Catalog(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector(getCurrentTab);
  const offers = useAppSelector(getFilteredOffers);
  const offersLoading = useAppSelector(getOffersLoading);

  useEffect(() => {
    if (!offers.length) {
      dispatch(fetchOffers());
    }
  }, [ dispatch, offers.length ]);

  if(offers.length === 0 && !offersLoading) {
    return null;
  }

  return (
    <section className="cities__places places">
      {
        offersLoading
          ? <Spinner/>
          : (
            <>
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offers.length} places to stay in ${cityName}`}</b>
              <Sorting/>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) =>
                  <OfferCard offer={offer} key={offer.id} type={OfferCardType.MainPage}/>)}
              </div>
            </>
          )
      }
    </section>
  );
}

export default Catalog;
