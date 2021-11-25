import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useOfferLoader from '../../hooks/use-offer-loader';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import useTitleUpdate from '../../hooks/use-title-update';
import { OfferId } from '../../models/IOffer';
import { getNearbyOffersById, getNearbyOffersLoading } from '../../store/offer-slice/offer-selector';
import { fetchNearbyOffers } from '../../store/offer-slice/offer-thunk';
import Gallery from '../gallery/gallery';
import Header from '../header/header';
import Host from '../host/host';
import Inside from '../inside/inside';
import Map from '../map/map';
import Nearby from '../nearby/nearby';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Overview from '../overview/overview';
import Review from '../review/review';
import Spinner from '../spinner/spinner';

const OFFER_PAGE_TITLE = '6 cities | ';

function OfferScreen():JSX.Element {
  const dispatch = useAppDispatch();
  const { offerId } = useParams<{ offerId: OfferId }>();
  const [ offer, loading, notFound ] = useOfferLoader(offerId);
  const nearByOffers = useAppSelector((state) =>
    getNearbyOffersById(state, offerId));
  const loadingNearby = useAppSelector(getNearbyOffersLoading);

  useTitleUpdate(`${OFFER_PAGE_TITLE}${offer?.title}`);

  useScrollToTop(offerId);

  useEffect(() => {
    dispatch(fetchNearbyOffers(offerId));
  }, [ dispatch, offerId ]);

  if (notFound) {
    return <NotFoundScreen/>;
  }

  if (!offer) {
    return <Spinner/>;
  }

  const {
    id,
    title,
    images,
    goods,
    host,
    description,
    location,
  } = offer;

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          {loading
            ? <Spinner/>
            : (
              <>
                <Gallery title={title} images={images}/>
                <div className="property__container container">
                  <div className="property__wrapper">
                    <Overview offer={offer} />
                    <Inside inside={goods}/>
                    <Host host={host} description={description}/>
                    <Review offerId={id}/>
                  </div>
                </div>
              </>
            )}
          <section className="property__map map">
            <Map
              offerInFocusId={id}
              locationInFocus={location}
              offers={[ ...nearByOffers, offer ]}
            />
          </section>
        </section>
        <div className="container">
          <Nearby
            nearByOffers={nearByOffers}
            loading={loadingNearby}
          />
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
