import React from 'react';
import { useParams } from 'react-router';
import useOfferLoader from '../../hooks/use-offer-loader';
import { OfferId } from '../../models/IOffer';
import Gallery from '../gallery/gallery';
import Header from '../header/header';
import Host from '../host/host';
import Inside from '../inside/inside';
// import Nearby from '../nearby/nearby';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Overview from '../overview/overview';
import Review from '../review/review';
import Spinner from '../spinner/spinner';

function OfferScreen():JSX.Element {
  const { offerId } = useParams<{ offerId: OfferId }>();
  const [ offer, loading, notFound ] = useOfferLoader(offerId);

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
          <section className="property__map map"></section>
        </section>
        <div className="container">
          {/* <Nearby/> */}
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
