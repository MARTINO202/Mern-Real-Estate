import React from "react";
import { Badge, Card } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import { FaAddressBook, FaBed, FaSquareFull } from 'react-icons/fa'

function SimilarProduct({ _id, category, name,price,beds,sqmeters,address, pictures }) {
    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "20rem" }}>
            <div style={{}}>
            <Card style={{ width: "20rem",marginBottom:"1px solid black" ,alignItems:"center"}}>
            <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Badge   style={{fontSize:"1rem",textTransform:"uppercase"}} bg="warning" text="dark">
                        {category}
                    </Badge>
                </Card.Body>
                <Card.Img variant="top" className="product-preview-img" src={pictures[0].url} style={{ height: "150px", objectFit: "cover" }} />
            
                <Card.Body>
                    <Card.Title  style={{marginBottom:'30px' ,paddingRight:"0rem", fontSize:"0.rem"}}>${price}</Card.Title>
                </Card.Body>
                <div    style={{ display:"flex", gap:"0.9rem",color:"blue",fontSize:"0.3rem",marginTop:"-45px" }}>
                
                    <h6    style={{ display:"flex"}}>{beds}|<h5>bed</h5><FaBed></FaBed></h6>||
                    <h6    style={{ display:"flex"}}>{sqmeters}|<h5>sqmeters</h5><FaSquareFull></FaSquareFull></h6>
                    
                    </div>
                   <span  style={{marginTop:"-1rem" ,textOverflow:'center'}}>  <FaAddressBook    style={{color:"green"}}></FaAddressBook>{address}   </span>
                   
                    
                    
            </Card>
            </div>
        </LinkContainer>
    );
}

export default SimilarProduct;
