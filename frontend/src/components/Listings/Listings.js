import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchListings, getListings } from '../../store/listings';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Mousewheel, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'; 
import './Listings.css';


const Listings = () => {
    const dispatch = useDispatch();
    const listings = useSelector(getListings);

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    return (
        <div className="container">
            <Swiper
                modules={[Navigation, Mousewheel, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination = {{ clickable: true}}
                scrollbar = {{ draggable: true}}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}>
            {listings.map((listing) => (
                <SwiperSlide>
                    <div key = {listing.id} className="card">
                        <p>This is a placeholder for images</p>
                        <div className="card-body">
                            <h3>${Math.floor(listing.homePrice).toLocaleString()}</h3>
                            <p>{listing.bedrooms} bds | {listing.bathrooms} ba | {listing.listingSize} sqft | {listing.marketStatus}</p>
                            <p>{listing.address}, {listing.city}, {listing.state}, {listing.zipCode}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    );
};


export default Listings;