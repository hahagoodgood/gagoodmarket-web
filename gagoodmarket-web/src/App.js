/* App.js는 src파일의 진입점인 index.js에서 사용하는 react 테그를 작성하는 파일
  각각의 페이지를 불러와 Swtich를 이용하여 페이지를 불러온다.
*/

import "./App.css";
import MainPageComponent from "./main/index.js"; //메인폴더의 index 파일의 MainPageComponent 함수 사용
import { Switch, Route, Link, useHistory } from "react-router-dom"; //react-router-dom페이지
import UploadPage from "./upload/index.js";
import ProductPage from "./proudct/index.js";
import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons"

function App() {
  const history = useHistory();//페이지 이동을 함수로 할 수 있다.
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to={"/"}>
            <img src="/images/icons/GAGOOD_2.png" />
          </Link>
          <Button id="uploadbtn" size="large"
          onClick={function(){
            history.push("/upload"); //upload로 이동하는 함수로 useHistory를 이용한다.
          }}
          icon={<DownloadOutlined/>}>
            상품 업로드
          </Button>
        </div>
      </div>
      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            {" "}
            {/* 주소 뒤에 아무것도 없을 때 */}
            <MainPageComponent />
          </Route>
          <Route exact={true} path="/products/:id">
            {" "}
            {/* 주소 뒤에 "/product가 있을때"
            :뒤에 자유롭게 숫자 입력 가능 ex)./product/2*/}
            <ProductPage />
          </Route>
          <Route exact={true} path="/upload">
            {" "}
            {/* 주소 뒤에 "/upload가 있을때" */}
            <UploadPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
