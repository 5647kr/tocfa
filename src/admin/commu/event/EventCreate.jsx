import { useEffect, useState } from "react";
import styled from "styled-components";
import { ImagePlus, Package, X } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import AdminSectionWrap from "../../../components/AdminSection";
import BoxWrap from "../../../components/BoxWrap";
import ErrorBox from "../../../components/ErrorBox";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import usePostStore from "../../../store/postStore";

export default function EventCreate() {
  const [formState, setFormState] = useState({
    title: "",
    imgurl: "",
    content: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { commu_event, readPost, createPost, updatePost } = usePostStore();
  const navigate = useNavigate();
  const params = useParams();
  const isEditMode = !!params.id;

  // 수정용 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode && !isLoaded) await readPost("commu_event");
      setIsLoaded(true);
    };
    fetchData();
  }, [isEditMode, isLoaded, readPost]);

  // 수정모드인지 새글작성인지 확인후 input처리
  useEffect(() => {
    if (isEditMode && commu_event.length > 0) {
      const post = commu_event.find((data) => data?.id === params.id);

      console.log(post);

      if (post) {
        setFormState({
          title: post.title,
          imgurl: post.imgurl,
          content: post.content,
        });
        if (post.imgurl) setPreviewImg(post.imgurl);
      }
    }
  }, [commu_event, isEditMode, params.id]);

  // 제출
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    let img = formState.imgurl;
    try {
      if (previewImg) {
        const formData = new FormData();
        formData.append("file", previewImg);
        formData.append("upload_preset", "starScope");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dx71aeltq/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("이미지 오류");
        }
        const data = await response.json();
        img = data.url;
      }
    } catch (error) {
      console.error(error);
    }

    const newFormData = { ...formState, imgurl: img };

    if (newFormData.title.trim() === "") {
      setErrorMessage("제목을 입력해주세요.");
      return;
    }
    if (newFormData.content.trim() === "") {
      setErrorMessage("내용을 입력해주세요.");
      return;
    }
    if (newFormData.imgurl.trim() === "") {
      setErrorMessage("이미지를 등록하세요.");
      return;
    }

    console.log(newFormData);

    try {
      if (isEditMode) {
        await updatePost(params.id, newFormData, "commu_event");
      } else {
        await createPost(newFormData, "commu_event");
      }
      navigate("/admin/product");
    } catch (error) {
      console.error(error);
    }
  };

  // 수정
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeImg = (e) => {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;

    const reader = new FileReader();

    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
  };

  return (
    <AdminSectionWrap>
      <BoxWrap>
        <TitleWrap>
          <Package />
          <h1>{isEditMode ? "기존 이벤트 수정" : "신규 이벤트 등록"}</h1>
        </TitleWrap>

        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
        <FaqForm onSubmit={handleProductSubmit}>
          <InputWrap>
            <label htmlFor="title">제목</label>
            <Input
              type="text"
              id="title"
              name="title"
              autoComplete="off"
              value={formState.title}
              onChange={handleChange}
              placeholder="제목을 입력해주세요"
            />
          </InputWrap>

          <ImgWrap>
            <label htmlFor="imgurl">이벤트 사진</label>
            {/* 이미지 선택 후 화면 (미리보기) */}
            {previewImg ? (
              <PreviewImgWrap $previewImg={previewImg}>
                <img src={previewImg} alt="Preview" />
                <button type="button" onClick={() => setPreviewImg("")}>
                  <X />
                </button>
              </PreviewImgWrap>
            ) : (
              <PreviewImgWrap $previewImg={previewImg}>
                <input
                  type="file"
                  id="imgurl"
                  accept="image/*"
                  className="a11y-hidden"
                  onChange={handleChangeImg}
                />
                <label htmlFor="imgurl">
                  <ImagePlus />
                  <span>이미지 등록</span>
                </label>
              </PreviewImgWrap>
            )}
          </ImgWrap>

          <InputWrap>
            <label htmlFor="content">이벤트 설명</label>
            <textarea
              id="content"
              name="content"
              autoComplete="off"
              value={formState.content}
              onChange={handleChange}
              placeholder="이벤트 설명을 입력해주세요"
            />
          </InputWrap>

          <Button type="submit">
            {isEditMode ? "이벤트 수정 완료" : "신규 이벤트 등록"}
          </Button>
        </FaqForm>
      </BoxWrap>
    </AdminSectionWrap>
  );
}

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
  & h1 {
    font-size: 1.6rem;
    font-weight: var(--font-mw);
  }
  & svg {
    width: 1.6rem;
  }
`;

const FaqForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  & label {
    font-size: var(--font-mz);
  }
  & textarea {
    min-height: 14rem;
  }
  & textarea,
  input {
    resize: none;
    padding: 1.2rem;
    border: 1px solid var(--stroke-color);
    border-radius: 1rem;
    font-size: var(--font-mz);
  }
  & textarea::placeholder,
  input::placeholder {
    color: var(--bg-color);
    font-size: var(--font-mz);
  }
  & > button {
    width: fit-content;
    margin: 0 auto;
    margin-top: 4rem;
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewImgWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 0.2;
  background-color: ${({ $previewImg }) =>
    $previewImg ? "var(--white-color)" : "var(--bg-color)"};
  box-shadow: ${({ $previewImg }) =>
    $previewImg ? "0 5px 15px var(--stroke-color)" : "none"};
  border-radius: 1rem;
  display: flex;
  justify-content: center;

  & > label {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  & > img {
    width: 100%;
    aspect-ratio: 1 / 0.2;
    object-fit: cover;
    vertical-align: top;
    border-radius: 1rem;
  }

  & > button {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;
