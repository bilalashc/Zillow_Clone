import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchListings, getListings } from '../../store/listings';
import './Listings.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Navigation } from 'swiper';
import 'swiper/css/bundle';

const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    return (
        <div className = "container">
            <Swiper 
            spaceBetween={50}
            slidesPerView={3}
            modules = {[Navigation]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}>
            {listings.map(listing => (
                <SwiperSlide>
                    <div key={listing.id} className = "card">
                        <p>A place for where the images will be</p>
                        <div className = "card-body">
                            <h3>${Math.floor(listing.price)}</h3>
                            <p>{listing.bedrooms} bds | {listing.bathrooms} ba | {listing.listing_size} sqft | {listing.market_status}</p>
                            <p>{listing.address}, {listing.city}, {listing.state}, {listing.zip_code}</p>
                        </div>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}


export default Listings;