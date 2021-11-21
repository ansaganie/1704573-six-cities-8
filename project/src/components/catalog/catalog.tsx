import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentTab } from '../../store/main-page-slice/main-page-selector';
import { getFilteredOffers } from '../../store/offer-slice/offer-selector';
import { fetchOffers } from '../../store/offer-slice/offer-thunk';
import OfferCard from '../offer-card/offer-card';
import Sorting from '../sorting/sorting';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector(getCurrentTab);
  const offers = useAppSelector(getFilteredOffers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [ dispatch ]);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${offers.length} places to stay in ${cityName}`}</b>
      <Sorting/>
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => <OfferCard offer={offer} key={offer.id}/>)}
      </div>
    </section>
  );
}

export default Catalog;
