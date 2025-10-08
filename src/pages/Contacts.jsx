import React from "react";
import "../assets/styles/Contacts.scss";



export default function Contacts() {

    return (
        <section className="small_heading_banner">
            <img className="banner_image" src="/public/small_heading_banner.png" alt="Contacts Banner" />
            <div className="container">
                <div className="inner">
                    <div className="full_container">
                        <div className="w70_block">
                            <div className="page_title_wrapper">
                                <h1 className="page_title">Make contact</h1>
                                <h5 className="page_subtitle">Driver Brussels makes every effort to answer your questions and fulfill your requests</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="triangle_decor">
                <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="54" viewBox="0 0 1920 54" fill="none">
                    <path d="M0 53.6548L1920 0V53.6548H0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}