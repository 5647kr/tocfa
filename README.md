# TOCFA

1. [TOCFA 프로젝트 소개](#1-TOCFA-프로젝트-소개)
2. [TOCFA 프로젝트 기술 개발 구현](#2-TOCFA-프로젝트-기술-개발-구현)
4. [TOCFA 프로젝트 트러블 슈팅](#3-TOCFA-프로젝트-트러블-슈팅)
5. [TOCFA 프로젝트 기술 및 개발 환경](#4-TOCFA-프로젝트-기술-및-개발-환경)
3. [TOCFA 프로젝트 코딩 컨벤션](#5-TOCFA-프로젝트-코딩-컨벤션)
6. [TOCFA 프로젝트 미래 개선 방향](#6-TOCFA-프로젝트-미래-개선-방향)
7. [TOCFA 프로젝트 성과 및 느낀 점](#1-TOCFA-프로젝트-성과-및-느낀-점)

<br>

## TOCFA 프로젝트 소개
TOCFA, "샅샅이 찾아보다"라는 뜻을 가지고 있는 톺아보다란 단어에서 따온 프로젝트로 현재 본인의 할 일, 일정, 재정을 관리하는 다이어리형 어플리케이션입니다. 기존 할 일 등록, 수정, 삭제 기능에서 더 나아가 하루 매주 매월 따로 할 일을 관리하며 진행도를 파악할 수 있습니다. 일정 관리 또한 기존 달력형식이 아닌 달력에 일정을 등록, 수정, 삭제 기능을 추가하여 일정관리를 할 수 있습니다. 재정 관리로는 수입과 지출 금액을 등록하면 자동으로 계산하여 월별 수입액과 지출액을 한 눈에 볼 수 있고 월별 재정 상태를 확인할 수 있습니다. 이는 모두 월별로 관리되며 매월 1일에 자동으로 초기화되어 쉽게 관리할 수 있습니다. 마지막으로 있는 분석 페이지에서는 1년간의 할 일 진행도, 재정상태를 그래프로 볼 수 있어 시각으로 볼 수 있는 장점을 가진 어플리케이션입니다.

배포 URL: https://5647kr.github.io/TOCFA/

<br>

## TOCFA 프로젝트 기술 개발 구현

### 1. 매달 1일 초기화
<br>
로컬 스토리지에 매일 할 일 등록을 하게 되면 데이터양이 많이 쌓여 성능상 좋지 않는다 판단하여, 할 일, 재정 등 매달 1일에 초기화하여 성능 개선을 합니다. 이 때 지난 달 할 일 목록은 사라지지만, 진행도 데이터는 남게 되어 분석 페이지에서 확인이 가능합니다. 이는 할 일, 재정 페이지에서의 기능은 똑같이 작동합니다. 매달 1일에 데이터에 이번 달과 다른 달의 데이터가 있는 경우 로컬스토리지 초기화를 진행합니다.
<br>

```
  // 초기화날 설정
  if(this.todoArr.length !== 0 && this.currentDate.split("/")[1] === "1") {
    const newMonthTodoArr = this.todoArr.some((item) => item.date.split("/")[0] !== this.currentDate.split(("/")[0]));
    if(newMonthTodoArr) {
      this.manageTodoList();
      this.updateTodoState();
    }
  } else {
    this.updateTodoState();
  }
```
<br>

### 2. 할 일 진행도를 저장하는 로컬 스토리지
<br>
할 일 진행도를 저장하는 로컬 스토리지로 12달의 진행도를 각각 저장하며 할 일을 등록하면 "/" 기준으로 뒤의 0이 증가 또는 감소하고 완료하면 "/" 기준으로 앞의 0이 증가 또는 감소하여 데이터를 저장해 분석 페이지에서 사용하게 됩니다.
<br>

```
  generateTodoStorage() {
    const todoStateData = {
      "list1": "0/0", 
      "list2": "0/0",
      "list3": "0/0",
      "list4": "0/0"
    };

    for(let i = 0; i <= 11; i++) {
      this.todoState.push({ ...todoStateData });
    }
    
    localStorage.setItem("todoState", JSON.stringify(this.todoState));

    const todoTitle = ["할일 목록1", "할일 목록2", "할일 목록3", "할일 목록4"];

    this.todoTitles.push(...todoTitle);

    localStorage.setItem("todoTitles", JSON.stringify(this.todoTitles))
    
  }
```

<br>

## TOCFA 프로젝트 트러블 슈팅

### 1. 무제한 추가되는 로컬 스토리지 데이터
<br>
분석 페이지에 사용될 로컬 스토리지 데이터는 첫 저장 후 추가적인 등록이 이루어지지 않아야 한다. 그 이유는 로컬스토리지에 저장되는 객체형태의 키값을 이용해 해당 달과 일치하는지의 여부를 파악하기 때문에 여러번 추가적인 등록이 이루어질 시 사용하지 않는 데이터를 계속해서 추가하게 되는 문제가 생기며, 분석 페이지에서 사용할 chartJs에서도 문제가 생길걸 염려해, 저장은 한번만 이루어지게끔 설정할 필요가 있었습니다. 이에 이미 로컬스토리지에 기본 데이터가 저장되었는지를 판단하고 아닌 경우는 기본 데이터를 생성해 저장하고 이미 데이터가 있는 경우 종료되게끔 처리하였습니다.
<br>

```
    this.start.addEventListener("click", () => {
      if(this.financeState.length === 0) {
        this.generateTodoStorage();
        this.generateFinanceStorage();
      } else {
        return;
      }
    })
```
<br>

### 2. 달력 일정 표시
<br>
js를 활용해 매달 table태그에 바뀌는 날짜에 맞게 일정을 표시해주어야 하는 기능이 있습니다. 여러 시도 끝에 생성되는 날짜 td의 자식요소인 ul태그에 id로 날짜를 저장하여 비교해서 일치하는 날짜의 일정을 보이게끔 처리하였습니다. 날짜는 모든 값이 유일하기에 등록된 일정이 알맞는 날짜에 표시할 수 있었습니다.

```
    for (let i = calendarDay; i < calendarDay + monthLength; i++) {
      const currentDate = calendarDate++;
      this.days[i].innerHTML = `
        <span>${currentDate}</span>
        <ul id="${this.currentYear}${this.currentMonth}${currentDate}"></ul>
      `;
    }


      displayMonthSchedule() {
    this.days.forEach((day) => {
      const monthSchedule = day.querySelector("ul");
      
      if (!monthSchedule) {
        return; // 또는 continue로 건너뛸 수도 있음
      }

      monthSchedule.innerHTML = "";

      this.scheduleArr.filter((item) => {
        if(item.date === monthSchedule.id) {
          const monthScheduleItem = document.createElement("li");
          monthScheduleItem.textContent = item.title;
      
          monthScheduleItem.id = item.id;

          monthSchedule.appendChild(monthScheduleItem);
        }
      })
    })
  }
```

<br>

## TOCFA 프로젝트 기술 및 개발 환경

<table>
  <tr>
    <td align="center" width="100px">사용 기술</td>
    <td width="800px">
      <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">&nbsp  
      <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">&nbsp 
      <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> &nbsp
    </td>
  </tr>
  <tr>
    <td align="center">기술 도구</td>
    <td>
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp 
      <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    </td>
  <tr>
    <td align="center">디자인</td>
    <td>
      <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
    </td>
  </tr>
  <tr>
    <td align="center">라이브러리</td>
    <td>
      <img src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white"/>&nbsp
  </tr>
  <tr>
    <td align="center">IDE</td>
    <td>
      <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
  </tr>
</table>

<br>

## TOCFA 프로젝트 코딩 컨벤션

<br>

<detail>
  <table>
    <tr>
      <th>커밋 유형</th>
      <th>커밋 메세지</th>
      <th>의미</th>
    </tr>
    <tr>
      <td>✨</td>
      <td>Feat</td>
      <td>새로운 기능 추가</td>
    </tr>
    <tr>
      <td>🐛</td>
      <td>Fix</td>
      <td>버그 & 에러 수정</td>
    </tr>
    <tr>
      <td>📝</td>
      <td>File</td>
      <td>리드미 등 문서 수정, 라이브러리 설치</td>
    </tr>
    <tr>
      <td>🎨</td>
      <td>Style</td>
      <td>코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우</td>
    </tr>
    <tr>
      <td>🖌</td>
      <td>Design</td>
      <td>UI 디자인 변경</td>
    </tr>
    <tr>
      <td>🔨</td>
      <td>Refactor</td>
      <td>코드 리팩토링</td>
    </tr>
    <tr>
      <td>🤔</td>
      <td>Test</td>
      <td>테스트 코드, 리팩토링 테스트 코드 추가</td>
    </tr>
    <tr>
      <td>⚙</td>
      <td>Chore</td>
      <td>빌드 업무 수정, 패키지 매니저 수정</td>
    </tr>
    <tr>
      <td>🗒</td>
      <td>Rename</td>
      <td>파일명 혹은 폴더명 수정, 위치 옮기기</td>
    </tr>
    <tr>
      <td>🔥</td>
      <td>Remove</td>
      <td>파일 삭제</td>
    </tr>
  </table>
</detail>

<br>

## TOCFA 프로젝트 미래 개선 방향
<br>
이 프로젝트를 진행하면서 매달 초기화되는 로컬스토리지가 정상적으로 작동되고 그에 따른 진행도 데이터및 분석페이지에 활용해야하는 데이터가 초기화 되지 않는지에 대한 확인이 가장 오랜 시간을 차지 하였습니다. 이에 코드상 date 객체를 바꿔가면서 확인하였으나, 실제로 제대로 동작하는지에 대해 확인해보고 싶은 마음이 있습니다. 따라서 1~2월에 정상적으로 동작하는지를 확인해 수정할 부분이 있는지를 확인할 예정입니다.

<br>

## TOCFA 프로젝트 성과 및 느낀 점
<br>
대부분의 todoList, 달력, 가계부 어플을 만드는데서 그치지 않고 실용적인 어플로 사용하고 싶은 마음에 매일 매주 매달 매년 따로 관리되는 todoList를 만들고 싶었으며 얼마나 진행했는지도 확인할 수 있는 진행도도 시각화 할 수 있도록 chartJs를 활용해 볼 수 있는 프로젝트라 좋은 경험이였다고 생각한다. 또한 가계부도 등록에서 그치지 않고 월별로 재정상태를 확인할 수 있도록 line 그래프를 활용하고 대시보드를 이용해 전체적인 소득과 지출을 확인할 수 있게끔 기능 구현을 하였습니다. 무엇보다도 localStorage 사용에 익숙해진 점이 큰 성과인 프로젝트였습니다.



