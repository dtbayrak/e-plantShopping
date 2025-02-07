import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/ProductList.css'
import CartItem from './CartItem';
import plantsArray from '../utils/Plants.js';
import { addItem } from '../features/CartSlice.jsx';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        //width: '1100px',
        width: 'calc(52.5%)',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        //e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (item) => {
        dispatch(addItem(item));
    };

    const isAddedToCart = (name) => {
        return cartItems.find(i => i.name === name);
    };

    const getTotalQuantity = () => {
        return cartItems.reduce((output, item) => output + item.quantity, 0);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/e-plantShopping/" style={{ textDecoration: 'none' }}>
                            <div style={{ color: 'white', padding: '10px' }}>
                                <h3>Paradise Nursery</h3>
                                <i>Where Every Leaf Tells a Story</i>
                                {/* <i>Where Green Meets Serenity</i> */}
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                            <h1 className='cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
                                    <text class="cart-text" x="128" y="150">{getTotalQuantity()}</text>
                                </svg>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
            {
                !showCart ? (
                    <div className="product-grid">
                        {plantsArray.map((cItem, cIndex) => (
                            <div key={cIndex}>
                                <p className="category-header">{cItem.category}</p>
                                <div className="product-list">
                                    {cItem.plants.map((pItem, pIndex) => (
                                        <div className="product-card" key={pIndex}>
                                            <div className="product-title">{pItem.name}</div>
                                            <img className="product-image" src={pItem.image} alt={pItem.name} />
                                            <div>{pItem.description}</div>
                                            <div className="product-price">{pItem.cost}</div>
                                            <button className="product-button" onClick={() => handleAddToCart(pItem)}
                                                disabled={isAddedToCart(pItem.name)}>{isAddedToCart(pItem.name) ? "Added to Cart" : "Add to Cart"}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <CartItem onContinueShopping={handleContinueShopping} />
                )
            }
        </div >
    );
}

export default ProductList;
