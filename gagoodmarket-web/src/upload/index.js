//index.js 는 해당 파일의 시작점이다. 이 파일은  upload의 시작점이다.
import "./index.css";
import { Form, Divider, Input, InputNumber, Button, Upload, message } from "antd";
import { ForkOutlined } from "@ant-design/icons";
import { useState } from "react";
import {API_URL} from "../config/constants.js"
import axios from "axios";
import {useHistory} from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  //입력된 상품 정보를 서버로 전송하는 함수
  const onSubmit = (values) => {
    axios.post(`${API_URL}/products`,{
      name: values.name,
      description: values.description,
      seller: values.seller,
      price: parseInt(values.price),
      imageUrl: imageUrl,
    }).then((result)=>{
      console.log(result);
      history.replace("/");
    }).catch((error) => {
      console.error(error);
      message.error(`에러가 발생했습니다. ${error.message}`); /* 에러 발생시 antd의 message를 사용하여 에러메시지 도출 */
    });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      /* 이미지가 업로드 중일때 */
      return;
    }
    if (info.file.status === "done") {
      /* 이미지가 업로드 완료 되었을때 */
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  /* 람다식으로 함수를 선언하는부분이다. Form테그에서 요소를 전달하는데 사용할 것이다. */
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        {" "}
        {/* form객체는 서버에 요청을 보낼때 사용하는데 보네는 요청에 입력되는 정보를 포함한다. */}
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image" //key vlaue 형태로 값이 저장되는데 name = key
            action={`${API_URL}/image`} //이미지 저장 functino이 있는 url
            listType="picture" //사진 형태
            //showUploadList={false} //들어간 이미지를 보여주는 속성
            onChange={onChangeImage}
          >
            {/* {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )} */}
            <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" />
                <span>이미지를 업로드해주세요.</span>
              </div>
          </Upload>
        </Form.Item>
        <Divider /> {/* 영역 분할하는 것으로 가로 선을 그어준다. */}
        <Form.Item
          name="seller"
          label={<div className="upload-label">판매자 명</div>}
          rules={[{ required: true, message: "판매자 이름을 입력해주세요." }]}
          /* rulse는 Form.Item의 규칙을 정하는 것으로 required는 필수 입력이라는 뜻이다. */
        >
          <Input
            className="upload-name"
            size="large"
            placeHolder="이름 입력해주세요"
          />
          {/* 이름을 입력하는 테그로 placeHolder는 아무것도 입력이 되지 않았을때 나타내는 글이다. */}
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품 이름</div>}
          rules={[{ required: true, message: "상품 이름을 입력해주세요" }]}
        >
          <Input
            clasName="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
        >
          <InputNumber defaultValue={0} clasName="upload-price" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품 소개</div>}
          rules={[{ required: true, message: "상품 소개을 입력해주세요" }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount /* 원래는 ={true}를 입력해야 하나 생략이 가능하다. */
            maxLength={300}
            placeholder="상품 소개을 입력해주세요."
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            상품 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
