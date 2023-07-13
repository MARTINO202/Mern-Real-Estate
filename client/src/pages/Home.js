import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

import { useTypewriter, Cursor } from "react-simple-typewriter";

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import Footer from "./Footer";

function Home() {
    const [type, setType] = useState("beach")
    const [continent, setContinent] = useState("0")
    const [priceRange, setPriceRange] = useState("0")
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);

    const [text] = useTypewriter({
        words: ["How may we help you?"],
        loop: true,
        typeSpeed: 20,
        deleteSpeed: 10,
        delaySpeed: 2000,
      });




    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

     // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
  }
    return (
        <div>


<div className='containerr'>
      <div className='wrapper'>
        <h2>Find your dream place </h2>
        <h5>Search the best selection of luxury real estate</h5>
        <h2 className="text-4xl font-bold text-white">
           <span>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#ff014f"
          />
        </h2>
      </div>
    </div>



    <div className="recent-products-container container mt-4">
                <h2>Categories</h2>
                <Row >
                    {categories.map((category) => (
                        <LinkContainer     style={{width:"35rem",textTransform:"capitalize"}} to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>

            {/* sale banner */}
            <h6  style={{margin:"2rem"}}>Sponsored</h6>
            <div className="sale__banner--container mt-4">
                <img    style={{width:"30rem"}}   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-7QsT1LjRv7qmyOHecKa6L9FxJMZ4BUfIb6Kk_1ETIgAoiY-su_xdOOeP66zGZPJGJ3k&usqp=CAU" />
            </div>





           {/* <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner" />*/}
            
            <div className="featured-products-container container mt-4">
                <h2>Last products</h2>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        See more {">>"}
                    </Link>
                </div>
            </div>
            {/* sale banner */}
            {/*
            <div className="sale__banner--container mt-4">
                <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" />
            </div>

 


           
            <div className="recent-products-container container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
                    </div>*/}
                    <Footer/>




        </div>
    );
}

export default Home;
