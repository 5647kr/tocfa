# TOCFA

## 0. 목차

1.  [프로젝트 소개](#1-프로젝트-소개)
2.  [기술 개발 구현](#2-기술-개발-구현)
3.  [기술 스택](#3-기술-스택)
4.  [코딩 컨벤션](#4-코딩-컨벤션)
5.  [시연 이미지](#5-시연-이미지)
6.  [폴더 구조](#6-폴더-구조)
7.  [성과 및 느낀 점](#8-성과-및-느낀-점)
    <br>

## 1. 프로젝트 소개

실생활에 도움이 되는 생활법률 사이트로 실제 예시와 함께 이해할 수 있는 법률 정보 사이트 입니다. 실제 웹사이트 서비스를 운영하는것과 같이 관리자페이지, 사용자 페이지를 나누었으며 관리자페이지에서는 공지사항, 법률정보등 컨텐츠 추가, 수정, 삭제 기능을 구현하였으며, 사용자 페이지에서는 관리자페이지에서 추가한 컨텐츠를 볼 수 있도록 기능을 구현하며 조회수를 통해 글 목록의 최신순, 조회순으로 필터링을 지원해 많은 도움이 되는 글의 목록을 확인할 수 있습니다.
<br />
<br />

- 사용자페이지 URL: [https://5647kr.github.io/focfa/](https://5647kr.github.io/tocfa/)
- 관리자페이지 URL: [https://5647kr.github.io/focfa/admin/login](https://5647kr.github.io/tocfa/admin/login)
<br />

- 관리자 계정<br/>
  ID : admin@admin.com<br/>
  PW : qwer1234
<br>
<br>

## 2. 기술 개발 구현

### 1. supabase를 이용한 CRUD 기능 구현

<br>
실제 백엔드와 통신하는것과 같이 supabase를 이용한 CRUD 기능을 구현하였습니다.
<br>

```
// 글 작성
async function CreateApi({ data, typeSelect }) {
  try {
    const { data: newPost, error } = await supabase
      .from(typeSelect)
      .insert([data])
      .select();

    if (error) {
      throw new Error("글 작성 실패");
    }
    return newPost[0];
  } catch (error) {
    throw error;
  }
}
// 글 조회
async function ReadApi(typeSelect) {
  try {
    let data, error;
    if (typeSelect !== "category") {
      ({ data, error } = await supabase.from(typeSelect).select("*"));
    } else {
      ({ data, error } = await supabase
        .from(typeSelect)
        .select("*")
        .eq("userType", "user"));
    }

    if (error) {
      throw new Error("글 조회 실패");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
// 글 수정
async function UpdateApi({ data, typeSelect }) {
  try {
    const { data: updateData, error } = await supabase
      .from(typeSelect)
      .update(data)
      .eq("id", data.id);

    if (error) {
      throw new Error("글 수정 실패");
    }
    return updateData;
  } catch (error) {
    throw error
  }
}

// 글 삭제
async function DeleteApi({ id, typeSelect }) {
  try {
    const { error } = await supabase.from(typeSelect).delete().eq("id", id);
    if (error) {
      throw new Error("삭제 오류");
    }
  } catch (error) {
    throw error;
  }
}

```

<br>
<br>

## 3. 기술 스택

<table>
  <tr>
    <td align="center" width="100px">사용 기술</td>
    <td width="800px">
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=ffffff"/>&nbsp
      <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white"/>&nbsp 
      <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>&nbsp
      <img src="https://img.shields.io/badge/zustand-2c51c1?style=for-the-badge&logo=zustand&logoColor=white"/>&nbsp 
    </td>
  </tr>
  <tr>
    <td align="center">기술 도구</td>
    <td>
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp 
      <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    </td>
  <tr>
  <tr>
    <td align="center">API</td>
    <td>
     <img src="https://img.shields.io/badge/supabase-000000?style=for-the-badge&logo=supabase&logoColor=hsl(153.1deg 60.67% 53.14%)"/>&nbsp 
    </td>
  <tr>
    <td align="center">디자인</td>
    <td>
      <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
    </td>
  </tr>
  <tr>
    <td align="center">IDE</td>
    <td>
      <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
  </tr>
</table>

<br>

## 4. 코딩 컨벤션

<br>

<detail>
  <table>
    <tr>
      <th>커밋 메세지</th>
      <th>의미</th>
    </tr>
    <tr>
      <td>Feat</td>
      <td>새로운 기능 추가</td>
    </tr>
    <tr>
      <td>Fix</td>
      <td>버그 & 에러 수정</td>
    </tr>
    <tr>
      <td>File</td>
      <td>리드미 등 문서 수정, 라이브러리 설치</td>
    </tr>
    <tr>
      <td>Style</td>
      <td>코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우</td>
    </tr>
    <tr>
      <td>Design</td>
      <td>UI 디자인 변경</td>
    </tr>
    <tr>
      <td>Refactor</td>
      <td>코드 리팩토링</td>
    </tr>
    <tr>
      <td>Test</td>
      <td>테스트 코드, 리팩토링 테스트 코드 추가</td>
    </tr>
    <tr>
      <td>Chore</td>
      <td>빌드 업무 수정, 패키지 매니저 수정</td>
    </tr>
    <tr>
      <td>Rename</td>
      <td>파일명 혹은 폴더명 수정, 위치 옮기기</td>
    </tr>
    <tr>
      <td>Remove</td>
      <td>파일 삭제</td>
    </tr>
  </table>
</detail>

<br>
<br>

## 5. 시연 이미지
업로드 예정

<br>
<br>

## 6. 폴더 구조

<details>
<summary>폴더 구조</summary>
<div markdown="1">

```
TOCFA
┃
┣ 📦public
┃ ┣ 📂assets
┃ ┃ ┗ 📂img
┃ ┃ ┃ ┣ 📜contract.webp
┃ ┃ ┃ ┣ 📜finance.webp
┃ ┃ ┃ ┣ 📜hero.webp
┃ ┃ ┃ ┣ 📜house.webp
┃ ┃ ┃ ┣ 📜logo.png
┃ ┃ ┃ ┣ 📜rights.webp
┃ ┃ ┃ ┣ 📜transport.webp
┃ ┃ ┃ ┗ 📜work.webp
┃ ┣ 📜404.html
┃ ┗ 📜index.html
┃
┣ 📦src
┃ ┣ 📂admin
┃ ┃ ┣ 📜Admin.jsx
┃ ┃ ┣ 📜AdminHome.jsx
┃ ┃ ┣ 📜AdminLogin.jsx
┃ ┃ ┣ 📜AdminPost.jsx
┃ ┃ ┗ 📜AdminUpdate.jsx
┃ ┣ 📂api
┃ ┃ ┣ 📜CategoryApi.jsx
┃ ┃ ┣ 📜LogApi.jsx
┃ ┃ ┗ 📜PostApi.jsx
┃ ┣ 📂components
┃ ┃ ┣ 📜ContentSection.jsx
┃ ┃ ┣ 📜Header.jsx
┃ ┃ ┣ 📜HeroSection.jsx
┃ ┃ ┣ 📜Input.jsx
┃ ┃ ┣ 📜Loading.jsx
┃ ┃ ┣ 📜Modal.jsx
┃ ┃ ┗ 📜Protected.jsx
┃ ┣ 📂store
┃ ┃ ┣ 📜PostStore.jsx
┃ ┃ ┗ 📜TypeStore.jsx
┃ ┣ 📂styles
┃ ┃ ┣ 📜GlobalStyle.jsx
┃ ┃ ┗ 📜font.css
┃ ┣ 📂user
┃ ┃ ┣ 📜UserHome.jsx
┃ ┃ ┣ 📜UserLaws.jsx
┃ ┃ ┣ 📜UserLawsDetail.jsx
┃ ┃ ┣ 📜UserNotice.jsx
┃ ┃ ┗ 📜UserNoticeDetail.jsx
┃ ┣ 📜App.js
┃ ┣ 📜index.js
┃ ┗ 📜supabaseClient.js
```

 </div>
</details>

<br>
<br>

## 7. 성과 및 느낀 점

이번 프로젝트를 통해 CRUD의 모든 기능을 구현해보았습니다. supabase를 이용해 SQL 문법은 물론 CRUD 기능을 구현함에 따라 사용자 페이지는 물론 관리자페이지까지 제작해보며, 하나의 서비스를 제대로 구현한 느낌을 받았다. 프론트엔드에 더 깊이 파고든 느낌을 받았다.
