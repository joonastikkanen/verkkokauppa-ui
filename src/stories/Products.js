import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Footer, Tooltip, Card, Navigation, Container, Button,Notification } from "hds-react";

import './product.css';
import styles from "hds-react";

export const Products = ({ apiUrl, productId, ...props }) => {

    const [data,setData]=useState([]);
    const [notification, setNotification] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartId, setCartId] = useState();

    const createCart=() => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({namespace: "asukaspysakointi", user: "Testihenkilo"})
        };

        fetch('https://talpa-verkkokauppa-cart-experience-api-dev.apps.arodevtest.hel.fi/', requestOptions)
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                setCartId(myJson.cartId);
            });

        console.log(requestOptions);
    }

    const addToCart=(e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({productId: e.target.getAttribute('productId'), quantity: 1})
        };

        fetch('https://talpa-verkkokauppa-cart-experience-api-dev.apps.arodevtest.hel.fi/'+cartId+'/items', requestOptions)
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson.items.length);
                if (myJson.items.length > 0) {
                    setNotification(true);
                    const newCount = myJson.items.length;
                    setCartCount(newCount);
                }
            });

        console.log(requestOptions);
    }

    const getData=()=>{
        fetch(apiUrl+productId
        ,{
          headers : { 
            "Access-Control-Allow-Origin" : "*",
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {

            setData(myJson);
          });
      }
      useEffect(()=>{
        createCart();
        getData();
      },[])


    return (
        <article>
            <Navigation
            title="Helshop Demo"
            menuToggleAriaLabel="menu"
            skipTo="#content"
            skipToContentLabel="Skip to content"
            >
                
                <Navigation.Actions>
                    <a href="#"><div className="cartStatus">Ostoskori<div className="cartCount">{cartCount}</div></div></a>
                </Navigation.Actions>
            </Navigation>
            <div className="container">
                
                {notification === true && (<Notification label="Tuote lisätty ostoskoriin" type="success" dismissible onClose={() => setNotification(false)}>Tuote on lisätty ostoskoriin onnistuneesti!</Notification>)}

                
                <section className="productList">
                    <Card
                        border
                        heading={data.name}
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    >
                        <button onClick={addToCart} productId={data.productId} type="button" className="Button-module_button__1msFE button_hds-button__2A0je Button-module_primary__2LfKB button_hds-button--primary__2NVvO"><span className="Button-module_label__a4np1 button_hds-button__label__2EQa-">Lisää ostoskoriin</span></button>

                        <div className="clear"></div>
                    </Card>
                </section>
            </div>
            <Footer></Footer>
        </article>
        
    );
};

Products.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
};
  
Products.defaultProps = {
    apiUrl: 'https://talpa-verkkokauppa-product-experience-api-dev.apps.arodevtest.hel.fi/',
    productId: '97249ce6-b8ac-3b19-b81a-c026c4f0488b',
    //productId: '7a691d19-df05-3bec-a786-fd3b9e991a2d'
};