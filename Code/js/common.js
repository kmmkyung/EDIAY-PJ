// 공통 JS - common.js

const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);
const cg = (x) => console.log(x);

///////////////////////// load /////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  cg("common-JS 로딩완료!");

  // ______________________________page2_____________________________
  // 기본셋팅
  let c4 = $(".R-menu-con4");
  c4.hide().first().show();
  /*-------------------------
        page2 - new menu 슬라이드
        함수명: p2Slide
        기능: 이동방향에 따른 요소 이동하기
        대상: btns
        변경대상: slide, bar
        -------------------------*/
  const p2Btns = qsa(".con-btns>.btns");
  const bar = qs(".bar-small_bar");
  let mlCnt = 0;
  const p2Slide = (dir) => {
    // dir 버튼구분
    // 선정 / 광클금지변수 / 대상
    let prot = 0;
    const slide = qs(".con-slide>ul");
    let slideli = qsa(".con-slide>ul>li");

    // 광클금지
    if (prot) return;
    prot = 1; //잠금
    setTimeout(() => {
      prot = 0; // 0.4초 후 해제
    }, 400);

    // 호출확인
    // cg("dir", dir);

    // 분기하기(이동대상 : slideli)
    // if 왼쪽 / else 오른쪽
    if (dir) {
      mlCnt++;
      slide.appendChild(slideli[0]);
      if (mlCnt === 4) mlCnt = 0;
      bar.style.marginLeft = `${mlCnt * 25}%`;
    } else {
      slide.insertBefore(slideli[slideli.length - 1], slideli[0]);
      mlCnt--;
      if (mlCnt === -1) mlCnt = 3;
      bar.style.marginLeft = `${mlCnt * 25}%`;
    }

    // 내용변경하기
    c4.eq(mlCnt).show().siblings(".R-menu-con4").hide();
  }; ///// p2Slide /////

  // 버튼 클릭이벤트
  // cg(p2Btns);
  p2Btns.forEach((ele, idx) => {
    ele.onclick = () => {
      // 슬라이드 함수 호출
      p2Slide(idx);
      // 자동호출 지우기
      clearAuto();
    }; ///// click /////
  }); ///// forEach /////

  /*-------------------------
        함수명: autoSlide
        기능: 인터발 함수로 슬라이드 자동 함수 호출
        -------------------------*/

  // 인터발 함수 지우기 위한 변수
  let autoI;
  // 타임아웃함수 지우기 위한 변수
  let autoT;
  function autoSlide() {
    // console.log("인터발 시작");
    // 인터발함수로 슬라이드 함수 호출
    autoI = setInterval(() => p2Slide(1), 3000);
  } /////autoSlide 함수 /////

  // 최초호출
  autoSlide();

  /*-------------------------
    함수명: clearAuto
    기능: 인터발 함수 지우고 다시 셋팅
    -------------------------*/
  function clearAuto() {
    // console.log("인터발 멈춤");
    // 인터발 지우기
    clearInterval(autoI);

    // 타임아웃 지우기
    clearTimeout(autoT);

    // 5초 후 작동(인터발은 3초 후 => 8초)
    autoT = setTimeout(autoSlide, 5000);
  } ///// clearAuto 함수 /////

  // ______________________________page2_____________________________
  // ______________________________page3_____________________________
  /*-------------------------
        page3 - card 누르면 앞뒷면 바꾸기
        함수명: p3Card
  -------------------------*/
  p3Card();
  function p3Card() {
    const cardfont = document.querySelectorAll(".card-front");
    const cardbackClose = document.querySelectorAll(".back-close");
    const card = document.querySelectorAll(".card-wrap");
    console.log("cardfont", cardfont);

    cardfont.forEach((v, i) => {
      v.addEventListener("click", function () {
        card[i].classList.add("active");
      });
    });
    cardbackClose.forEach((v, i) => {
      v.addEventListener("click", function () {
        card[i].classList.remove("active");
      });
    });
  }
  /*-------------------------
        page3 - best menu 슬라이드
        함수명: p3Slide
        기능: 이동방향에 따른 요소 이동하기
        대상: page_3-con2__icon>btns
        변경대상: page_3-con1>ul
-------------------------*/
  const p3slide = $(".page_3-con1>ul");

  const p3btns = $("#page_3 .btns");
  // console.log(p3btns);

  const p3bar = $(".icon-small_bar");

  let p3seq = 0;

  p3btns.click(function () {
    // 버튼구분
    let isB = $(this).is(".icon-right");
    let winW = window.innerWidth;
    // console.log(isB);
    console.log("p3seq", p3seq);

    // 오른쪽
    if (isB) {
      p3seq++;
      if (winW > 1360) {
        if (p3seq === 2) p3seq = 1;
        p3slide.stop().animate({ left: -50 * p3seq + "%" }, 400);
        p3bar.stop().animate({ left: 50 * p3seq + "%" }, 400);
        }
      else if (winW >= 768) {
        if (p3seq === 3) p3seq = 2;
        p3slide.stop().animate({ left: -70 * p3seq + "%" }, 400);
        p3bar.stop().animate({ left: 25 * p3seq + "%" }, 400);
      }
      else if(winW < 768){
        if (p3seq === 3) p3seq = 2;
          p3slide.stop().animate({ left: -100 * p3seq + "%" }, 400);
          p3bar.stop().animate({ left: 25 * p3seq + "%" }, 400);
      }
    }
    // 왼쪽
    else {
      p3seq--;
      if (winW > 1360) {
        if (p3seq === -1) {p3seq = 0;}
        p3slide.stop().animate({ left: 50 * p3seq + "%" }, 400);
        p3bar.stop().animate({ left: 50 * p3seq + "%" }, 400);
        }
        else if (winW >= 768) {
          if (p3seq === -1) {p3seq = 0;}
          p3slide.stop().animate({ left: -35 * p3seq + "%" }, 400);
          p3bar.stop().animate({ left: 25 * p3seq + "%" }, 400);
        }
        else if (winW < 768) {
          if (p3seq === -1) {p3seq = 0;}
          p3slide.stop().animate({ left: -100 * p3seq + "%" }, 400);
          p3bar.stop().animate({ left: 25 * p3seq + "%" }, 400);
        }
      }
    });

  // ______________________________page3_____________________________
  // ______________________________page4_____________________________
  /*-------------------------
        page4 - 스크롤 액션
        함수명: scrollC
        기능: 스크롤시 등장액션 
        대상: scroll-con
        -------------------------*/

  // 대상선정
  const scrollCon = qsa(".scroll-con");
  // cg(scrollCon);

  // 화면 높이값 2/3
  const hv = (window.innerHeight / 3) * 2;
  // console.log("hv-2/3",hv);

  // 등장액션 대상 위치값 리턴함수/////
  const retVal = (ele) => ele.getBoundingClientRect().top;

  const showIt = (x) => {
    // x - 등장요소
    // 대상요소의 현재스크롤 위치
    let xval = retVal(x);

    // 구간적용여부 검사하기
    // 0보다 크고 화면의 2/3보다 작은 구간!
    if (xval < hv && xval > 0) {
      // console.log("작동!~~~~");
      // 해당요소에 클래스 넣기!
      x.classList.add("on");
    }
  }; //////////// showIt //////////

  window.addEventListener("scroll", () => {
    // cg("스크롤중")

    // 스크롤 등장 요소 개수만큼 for
    for (let x of scrollCon) showIt(x);
  });

  // ______________________________footer_____________________________
  /*-------------------------
    footer - svg 로고 삽입 
    대상 : .page_6-vector__logo
    -------------------------*/
  const logoSVG = qs(".page_6-vector__logo");

  // svg넣기
  logoSVG.innerHTML = svgData.logo;

  // ______________________________footer_____________________________
});
