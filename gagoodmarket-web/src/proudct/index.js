/*product 폴더의 진입점 파일으로 상품 상세 정보를 나타내는 페이지입니다. */
import { useParams } from "react-router-dom"; /* 파라미터 가져오는 함수 */

function ProductPage() {
  const {id} = useParams(); /* id파라니터를 가져온다. */
    return <h1>상품 상세 페이지 {id} 상품</h1>;
  }
  
  export default ProductPage;