import React from 'react'
import "./Home.css";
import Product from './Product';

function Home() {
    return (
        <div className = "home">
            <div className = "home__container">
                <img 
                        className = "home__image"
                        src = "https://www.teahub.io/photos/full/19-194069_japanese-food-wallpaper-japanese-cooking-class.jpg" 
                        alt = ""
                />

                <div className = "home__row">
                    <Product 
                        id = "001"
                        title = "Light-Saber Chopsticks: Light-up Your Meals!! TATAKAUUUU!!! Makenai!!" 
                        price = {5.96} 
                        image = "https://cdn.shopify.com/s/files/1/0280/3689/0761/products/41O2X9WFvDL_1024x1024.jpg?v=1577016172"
                        rating = {3}
                    />
                    <Product
                        id = "002"
                        title = "Hello Kitty: Cup Noodles edition... Don't miss out on our limited edition. This one has a red bow. I dont know what she's wearing tho" 
                        price = {10.27} 
                        image = "https://cdn.shopify.com/s/files/1/0584/3841/products/Kidrobot_HelloKitty_Pork_Nissin_CupNoodles_Plush-Web-1_2000x2000.jpg?v=1606956922"
                        rating = {4}
                    />
                </div>

                <div className = "home__row">
                    <Product
                        id = "003"
                        title = "Tendo Maya does not lose xD Thank you for the keychains feet!" 
                        price = {12.99} 
                        image = "https://www.hlj.com/media/catalog/product/cache/467d58fefb7842fb1aed595e14a86f25/c/s/cspr10712_0.jpg"
                        rating = {8}
                    />
                    <Product
                        id = "004"
                        title = "To keep away from copyrights: lets call these Uncle Benu's mexican style rice!!!" 
                        price = {25.31} 
                        image = "https://digitalcontent.api.tesco.com/v2/media/ghs/c2eeb403-7ce0-4685-8f4d-2dc54283fa4c/snapshotimagehandler_1636516451.jpeg?h=540&w=540"
                        rating = {3}
                    />
                    <Product
                        id = "005"
                        title = "Pusheen POG " 
                        price = {15.99} 
                        image = "https://mylittlebrownie.com/projects/mlb/v0516/wp-content/uploads/2016/06/CoolClip1_1024x1024.jpg"
                        rating = {5}
                    />
                </div>

                <div className = "home__row">
                    <Product
                        id = "006"
                        title = "Perfect for powercuts ORRR when you want to take a spookie dookie!!!!!" 
                        price = {832.97} 
                        image = "https://wl-brightside.cf.tsp.li/resize/728x/jpg/fac/87b/283df35c2fa2a5be38fa6abe01.jpg"
                        rating = {11}
                    />
                </div>
            </div>


        </div>
    );
}

export default Home
