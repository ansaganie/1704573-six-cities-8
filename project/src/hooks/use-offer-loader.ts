import { useEffect, useState } from 'react';
import IOffer, { OfferId } from '../models/IOffer';
import { getNotFoundOfferId, getOfferLoading, getOffers } from '../store/offer-slice/offer-selector';
import { fetchOffer } from '../store/offer-slice/offer-thunk';
import { useAppDispatch, useAppSelector } from './redux';

const emptyOffer = {} as IOffer;

type UseOfferLoader = [offer: IOffer, loading: boolean, notFound: boolean ];

const useOfferLoader = (offerId: OfferId): UseOfferLoader => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const loading = useAppSelector(getOfferLoading);
  const notFoundOfferId = useAppSelector(getNotFoundOfferId);
  const [ offer, setOffer ] = useState<IOffer>(emptyOffer);

  useEffect(() => {
    const result = offers.find(({ id }) => id === offerId);

    if (result) {
      setOffer(result);
    } else {
      dispatch(fetchOffer(offerId));
    }
  }, [offers, offerId, dispatch]);

  return [ offer, loading, notFoundOfferId === offerId];
};

export default useOfferLoader;
