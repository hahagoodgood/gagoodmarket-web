import "./index.css";
import axios from "axios";
import React from "react";

function MainpageComponent() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function(){
    axios
    .get("https://89b31317-d448-414e-8434-4b9625326e64.mock.pstmn.io/product")
    .then(function (result) {
      const products = result.data.products;
      setProducts(products);
    })
    .catch(function (error) {
      console.error("에러 발생 : ", error);
    });
  },[]);
  

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">
          {products.map(function (product, index) {
            return (
              <div className="product-card">
                <div>
                  <img
                    className="product-img"
                    src={product.imageUrl}
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <span className="product-seller">
                    <img
                      className="product-avatar"
                      src="images/icons/avatar.png"
                    />
                    <span>{product.seller}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default MainpageComponent;


