import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

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
        <div id="banner">
          <img src="images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">
          {products.map(function (product, index) { /* product배열의 개수 만큼 반복해주는 함수 map을 이용하여 반복 */
            return (
              <div className="product-card">
                <Link className="product-link" to={`/products/${product.id}`}> {/* link는 <a>테그로 변경되어 실행된다.
                                                                            index는 id를 나타낸다.*/}                                                  
                  <div>
                    <img className="product-img" src={product.imageUrl} />
                  </div>
                  <div className="product-contents">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}원</span>
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                      />
                      <span>{product.seller}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
    </div>
  );
}

export default MainpageComponent;


