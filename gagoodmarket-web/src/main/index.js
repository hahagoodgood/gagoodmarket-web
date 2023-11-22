import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs"; /* 날짜를 원하는 형식으로 변환해주는 라이브러리 */
import relativeTime from "dayjs/plugin/relativeTime"; /* 날짜관련 정보를 쉽게 가져오는 플러그인 */
import { API_URL } from "../config/constants.js";
import { Divider, Carousel } from "antd";

dayjs.extend(relativeTime); /* dayjs 확장 */

function MainpageComponent() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  React.useEffect(function () {
    /* API서버와 통신하여 products객체를 전송받는 Axios 통신입니다. */
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });

    /* API서버와 통신하여 banners 객체를 전송받는 Axios 통신입니다. */
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });
  }, []);

  return (
    <div>
      {/* Carousel을 사용하여 이미지 슬라이드를 구현하는 테그입니다. */}
      <Carousel autoplay autoplaySpeed={6000}> {/* autoplay는 자동으로 넘겨주며 60초마다 한개씩 넘김니다. */}
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>{/* 클릭했을때 설정한 곳으로 이동이 될 수 있도록 해주는 link입니다. */}
              <div id="banner"> 
                <img src={`${API_URL}/${banner.imageUrl}`} /> {/* API 통신을 통해 서버에서 이미지를 불러와 줍니다. */}
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <Divider />
      <div id="product-list">
        {products.map(function (product, index) {
          /* product배열의 개수 만큼 반복해주는 함수 map을 이용하여 반복 */ const price_dot =
            product.price.toLocaleString("en-US");
          return (
            <div className="product-card">
              <Link className="product-link" to={`/products/${product.id}`}>
                {" "}
                {/* link는 <a>테그로 변경되어 실행된다.
                                                                            index는 id를 나타낸다.*/}
                <div>
                  <img
                    className="product-img"
                    src={`${API_URL}/${product.imageUrl}`}
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{price_dot}원</span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">
                      {dayjs(product.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        <Divider />
      </div>
    </div>
  );
}

export default MainpageComponent;
