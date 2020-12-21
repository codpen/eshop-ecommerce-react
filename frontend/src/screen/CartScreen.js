import React, { useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
  Form,
} from "react-bootstrap";

//////////////////    COMPONENTS     //////////////////////////
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import ErrMessage from "../components/ErrMessage";

/////////////////     REDUX    ///////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { Link } from "react-router-dom";
import { black } from "colors";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const category = match.params.category;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, category, qty));
    }
  }, [dispatch, productId, qty]);

  ////////////////////      remove cart Handler    /////////////////////////

  const removecartHandler = (productid) => {
    console.log(productId);
  };

  ////////////////////      Checkout Process Handler    /////////////////////////

  const checkoutHandler = () => {
    console.log("CHECKOUT");
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          {category ? (
            <li className="breadcrumb-item">
              <a href={`/products/${category}/${productId}`}>{category}</a>
            </li>
          ) : null}
          <li className="breadcrumb-item active" aria-current="page">
            CART
          </li>
        </ol>
      </nav>

      <Row className="mt-5">
        <Col md={9}>
          <h1>SHOPPING CART ({cartItems.length})</h1>
          <br />
          <br />
          {cartItems.length == 0 ? (
            <ErrMessage varient="#d1ecf1">
              <span style={{ color: "#3E19FA" }}>Your cart is empty</span>
              <Link to="/">Go back</Link>
            </ErrMessage>
          ) : (
            <ListGroup varient="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={3}>
                    <h3>Image</h3>
                  </Col>
                  <Col md={3}>
                    <h3>Name</h3>
                  </Col>
                  <Col md={2}>
                    <h3>Price</h3>
                  </Col>
                  <Col md={2}>
                    <h3>Quantity</h3>
                  </Col>
                </Row>
              </ListGroup.Item>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image
                        width="200"
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        style={{ fontSize: "1.08rem" }}
                        to={`/products/${item.category}/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} style={{ fontSize: "1.2rem" }}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(
                              item.product,
                              item.category,
                              Number(e.target.value)
                            )
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((q) => (
                          <option key={q + 1} value={q + 1}>
                            {q + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} style={{ marginLeft: ".002rem" }}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removecartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h3>
                  <strong>ORDER SUMMARY</strong>
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>
                  SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) ITEMS
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Price:</h4>
                  </Col>
                  <Col>
                    <h5>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Delivery:</h4>
                  </Col>
                  <Col>
                    <h4 style={{ color: "tomato" }}>Free</h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Total:</h4>
                  </Col>
                  <Col>
                    <h5 style={{ fontSize: "1.6rem", fontWeight: "bold" }}>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block p-2"
                  disabled={cartItems.length == 0}
                  onCLick={checkoutHandler}
                >
                  PROCEED TO PAY
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
