import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

function EditProductPage() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [sqmeters, setSqmeters] = useState("");
    const [beds, setBeds] = useState("");
    const [continent, setContinent] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setAddress(product.address)
                setCategory(product.category);
                setContinent(product.continent);
                setSqmeters(product.sqmeters);
                setBeds(product.beds);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
    }, [id]);

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

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description ||!address || !price || !category||!continent ||!sqmeters ||!beds || !images.length) {
            return alert("Please fill out all the fields");
        }
        updateProduct({ id, name, description,address, price, category,continent,sqmeters,beds, images }).then(({ data }) => {
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
                        <h1 className="mt-4">Edit product</h1>
                        {isSuccess && <Alert variant="success">Product updated</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group></>


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
                            <Form.Select value={category}>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="sale">sale</option>
                                <option value="rent">rent</option>
                               {/* <option value="phones">phones</option>
                                <option value="laptops">laptops</option>*/}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" onChange={(e) => setContinent(e.target.value)}>
                            <Form.Label>continent</Form.Label>
                            <Form.Select value={continent}>
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
                            <Form.Control type="number" placeholder="square meter" value={sqmeters} required onChange={(e) => setSqmeters(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="number" placeholder="Beds" value={beds} required   step={1} min={1} onChange={(e) => setBeds(e.target.value)} />
                        </Form.Group>


                        





                        








                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Update Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default EditProductPage;
