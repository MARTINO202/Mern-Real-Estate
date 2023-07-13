import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

function NewProduct() {
    const [state, setState] = useState({})
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [sqmeters, setSqmeters] = useState("");
    const [beds, setBeds] = useState("");
    const [category, setCategory] = useState("");
    
    const [address, setAddress] = useState("");
    const [continent, setContinent] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }



    const handleState = (e) => {
        setState(prev => {
          return { ...prev, [e.target.name]: e.target.value }
        })
      }






    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description ||!address ||!price || !category ||!continent ||!sqmeters ||!beds || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, address, price, category,continent,sqmeters,beds, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dhu2q3rgf",
                uploadPreset: "jtjyom4e",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }


    
    

    return (
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Create a product</h1>
                        {isSuccess && <Alert variant="success">Product created with succcess</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control as="textarea" placeholder="House description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>



                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" placeholder="House Address" style={{ height: "20px" }} value={address} required onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>






                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control type="word" placeholder="Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="sale">sale</option>
                                <option value="rent">rent</option>
                               {/* <option value="phones">phon(e.target.value)*/}
                               </Form.Select>

</Form.Group>


<Form.Group className="mb-3" onChange={(e) => setContinent(e.target.value)}>
                            <Form.Label>continent</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="europe">europe</option>
                                <option value="asia">asia</option>
                                <option value="america">america</option>
                                <option value="africa">africa</option>
                                <option value="australia">australia</option>
                                <option value="oceania">oceania</option>
                                
                               {/* <option value="phones">phon(e.target.value)*/}
                               </Form.Select>
                               </Form.Group>



                               <Form.Group className="mb-3">
                               <Form.Label>Square Meter</Form.Label>
                            <Form.Control type="number" placeholder="sq" value={sqmeters} required onChange={(e) => setSqmeters(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>Bed rooms</Form.Label>
                            <Form.Control type="number" placeholder="Beds" value={beds} required   step={1} min={1} onChange={(e) => setBeds(e.target.value)} />
                        </Form.Group>









                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} alt="" />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Create Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default NewProduct;
