/*product 폴더의 진입점 파일으로 상품 상세 정보를 나타내는 페이지입니다. */
import { useParams } from "react-router-dom"; /* 파라미터 가져오는 함수 */
import axios from "axios"; //axios는 서버간 통신을 위한 모듈
import { useEffect, useState } from "react";
import "./index.css";

function ProductPage() {
  const {id} = useParams(); /* id파라니터를 가져온다. */
  const [product, setProduct] = useState(null); /* userState는 컴포넌트를 랜더링 해주는 장치로 
                                                여기서 product는 값이 변경될 수 있는 변수고
                                                useState(null)이기에 초기값은 null이다.
                                                setProducts는 값을 변경시키는 함수이다. */
                                                

  useEffect(function(){ /* 최초 1번만 목서버와 통신하기 위한 userEffect */
    axios
    .get(`https://89b31317-d448-414e-8434-4b9625326e64.mock.pstmn.io/product/${id}`)//Template Literal은 `(백틱)사이에 있을 때 문자열을 끊지 않고 변수${변수}형태로 사용할 수 있도록 해준다.
    .then(function (result) {
      setProduct(result.data);
    })
    .catch(function (error) {
      console.error("에러 발생 : ", error);
    });
  },[]); /* []값이 변경되지 않는한 1번만 실행된다. */

    if(product === null){ /* 위의 통신은 비동기 처리 이기에 아래의 리턴 문장이 먼저 실행되게 된다
                            이를 방지하기 위해 if문으로 product가 초기값일 시 로딩중 임을 나타내는 문장입니다. */

      return <h1>상품 정보를 받고 있습니다...</h1>
    }else{
      return (
        <div>
          <div id="image-box">
            <img src={"/" + product.imageUrl}></img>
          </div>
          <div id="profile-box">
            <img src="/images/icons/avatar.png"/>
            <span>{product.seller}</span>
          </div>
          <div id="contents-box">
            <div id="name">{product.name}</div>
            <div id="price">{product.price}</div>
            <div id="createdAt">2023년 11월 19일</div>
            <div id="description">{product.description}</div>
          </div>
        </div>
      );
    }

  }
  
  export default ProductPage;