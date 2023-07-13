import axios from "../axios";
import React, { useEffect, useState ,useRef} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import person from "../assets/person.jpg"

import { Link, useNavigate, useParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import { FaAddressBook, FaBed, FaSquareFull } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'







function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [address, setAddress]= useState(null);
    const [num, setNum] = useState(null);
    const [desc, setDesc] = useState(null);
    const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef()
  const [success, setSuccess] = useState(false)
  const [shortComment, setShortComment] = useState(false)
const navigate = useNavigate()




    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const images = product.pictures.map((picture) => <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} />);

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }


    const handleCloseForm = () => {
      setShowForm(false)
      setDesc('')
    }
  
    const handleContactOwner = async (e) => {
      e.preventDefault()
  
      emailjs.sendForm("service_u05fjyq", "template_p1dleqk", formRef.current, '3uLm67lLxeKcGVKr_')
        .then((result) => {
          handleCloseForm()
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 2500)
        }, (error) => {
          console.log(error.text);
        });
    }

    return (
        <Container className="pt-4" style={{ position: "relative" }}>
            <Row>
                <Col lg={6}>
                    <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
                    
                </Col>
                <Col lg={6} className="pt-4">
                    <h1>{product.name}</h1>
                    <p>
                        <Badge bg="primary" >{product.category}</Badge>
                    </p>
                    <h5 className="product__price"    style={{}}>$ {product.price}</h5>






                    <div className='details'>
            <div className='typeAndContinent'>
              <div>Continent: <span>{`${product?.continent}`}</span></div>
              
            </div>
            <div className='priceAndOwner'>
              
            <div>Address:  <FaAddressBook className='icon' />  <span>{product?.address} </span></div>
                
            </div>
            <div className='moreDetails'>
              <span>{product?.beds} bed room<FaBed className='icon' /></span>
              <span>{product?.sqmeters} square meters <FaSquareFull className='icon' /></span>
            </div>
          </div>







                    <p style={{ textAlign: "justify" }} className="py-3">
                        <strong>Description:</strong> {product.description}
                    </p>

                    {user?._id == null && (
            <Link to={`/signin`}>
              <h4 className='noFuncMessage'>
                Sign in to contact agent.
              </h4>
            </Link>
          )
          }




                    {user && !user.isAdmin && (
                        <ButtonGroup       style={{ width: "90%" }}>
                            
                            <Button size="lg" onClick={() => setShowForm(true)} className='contactOwner'>
                                Contact Agent
                            </Button>
                        </ButtonGroup>
                    )}
                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${product._id}/edit`}>
                            <Button size="lg">Edit Product</Button>
                        </LinkContainer>
                    )}
                    {
        showForm &&
        <div className='contactForm' onClick={handleCloseForm}>
          <div className='contactFormWrapper' onClick={(e) => e.stopPropagation()}>
            <h2>Send Email To Owner</h2>
            <form onSubmit={handleContactOwner} ref={formRef}>
              <input value={user?.email} type="text" placeholder='My email' name="from_email" />
              <input value={desc} type="text" placeholder='Desc' name="message" onChange={(e) => setDesc(e.target.value)} />
              <input value={num} type="number" placeholder='Phone Number' name="message" onChange={(e) => setNum(e.target.value)} />
             
              <button>Send</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className='removeIcon' />
          </div>
        </div>
      }
      {success && (
        <div className='success'>
          You've successfully contacted the Agent!
        </div>
      )}
                </Col>

            </Row>
            <div className="my-4">
                <h2>Similar Products</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap"   style={{margin:"0 6rem"}}>
                    <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>
        </Container>
    );
}

export default ProductPage;
