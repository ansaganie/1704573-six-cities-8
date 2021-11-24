import React from 'react';

function Nearby(props): JSX.Element {
  return (
    <section class="near-places places">
            <h2 class="near-places__title">Other places in the neighborhood</h2>
            <div class="near-places__list places__list">
              <article class="near-places__card place-card">
                <div class="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img class="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image">
                  </a>
                </div>
                <div class="place-card__info">
                  <div class="place-card__price-wrapper">
                    <div class="place-card__price">
                      <b class="place-card__price-value">&euro;80</b>
                      <span class="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button class="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                      <svg class="place-card__bookmark-icon" width="18" height="19">
                        <use xlink:href="#icon-bookmark"></use>
                      </svg>
                      <span class="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div class="place-card__rating rating">
                    <div class="place-card__stars rating__stars">
                      <span style="width: 80%"></span>
                      <span class="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 class="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p class="place-card__type">Private room</p>
                </div>
              </article>

              <article class="near-places__card place-card">
                <div class="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img class="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place image">
                  </a>
                </div>
                <div class="place-card__info">
                  <div class="place-card__price-wrapper">
                    <div class="place-card__price">
                      <b class="place-card__price-value">&euro;132</b>
                      <span class="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button class="place-card__bookmark-button button" type="button">
                      <svg class="place-card__bookmark-icon" width="18" height="19">
                        <use xlink:href="#icon-bookmark"></use>
                      </svg>
                      <span class="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div class="place-card__rating rating">
                    <div class="place-card__stars rating__stars">
                      <span style="width: 80%"></span>
                      <span class="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 class="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p class="place-card__type">Apartment</p>
                </div>
              </article>

              <article class="near-places__card place-card">
                <div class="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img class="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place image">
                  </a>
                </div>
                <div class="place-card__info">
                  <div class="place-card__price-wrapper">
                    <div class="place-card__price">
                      <b class="place-card__price-value">&euro;180</b>
                      <span class="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button class="place-card__bookmark-button button" type="button">
                      <svg class="place-card__bookmark-icon" width="18" height="19">
                        <use xlink:href="#icon-bookmark"></use>
                      </svg>
                      <span class="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div class="place-card__rating rating">
                    <div class="place-card__stars rating__stars">
                      <span style="width: 100%"></span>
                      <span class="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 class="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p class="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
  );
}

export default Nearby;