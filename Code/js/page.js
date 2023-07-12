// 새로고침할때 스크롤위치 캐싱 무시하고 맨 위로 이동
// scrollTo(가로,세로) -> 위치이동 메서드
setTimeout(() => {
    window.scrollTo(0, 0);
}, 100);

///////////////////////// load /////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  console.log("mouse-JS 로딩완료!");
  //_____________마우스 따라다니는 로고_____________//
  // 대상: #cursor
  const mouseCursor = document.querySelector("#cursor");
  // console.log("마우스",mouseCursor);

  // 마우스 커서 이미지 절반 크기 (이미지 마우스 가운데 위치해야해서 알아봄)
  const Msize = mouseCursor.clientWidth / 2;
  // console.log("커서 사이즈",Msize);

  // 이벤트 대상: body
  // 이벤트 종류: onmousemove (마우스가 대상 위에서 움직임)
  ///// EVNET-FN__onmousemove /////
  document.body.onmousemove = function () {
  //마우스 위치 확인! (pageX,Y는 전체 웹문서에의 위치)
  // console.log("x",event.pageX,"y",event.pageY);

  // 위치값 보정 (clientX, clientY는 브라우저 화면에서의 위치)
  let positionX = event.clientX - Msize;
  let positionY = event.clientY - Msize;

  // 커서 이미지 위치값 이동(가운데 위치 보정)
  mouseCursor.style.top = positionY + "px";
  mouseCursor.style.left = positionX + "px";
}; ///// EVNET-FN__onmousemove /////

  //_____________지동 페이지 휠 효과_____________
console.log("page wheel-JS 로딩완료!");

// 0. 변수 설정하기
// (1) 전체 페이지 변수
let pgnum = 0;
// (2)전체 페이지 수
const pgall = document.querySelectorAll(".page").length + 1;
// console.log("페이지 수",pgall);
// (3) 광스크롤 금지변수
let prot_sc = 0;
// (4) 스크롤 금지변수(0-허용,1-금지)
let sc_sts = 0;

  // 1. 전체 휠 이벤트 설정
  window.addEventListener("wheel", wheelFn, { passive: false });

  // 2. 휠 이벤트 함수
  function wheelFn(e) {
    // console.log("스상:", sc_sts, "/pgnum:", pgnum);

    if (sc_sts && (pgnum === 3 || pgnum === 4)) return;
    // 기본기능 멈추기
    e.preventDefault();

    // 광스크롤 막기
    if (prot_sc) return;
    prot_sc = 1;
    setTimeout(() => (prot_sc = 0), 800);

    // (1)호출 확인
    // console.log("휠 기능");

    // (2) 췰 방향 알아내기
    // 이벤트 객체.wheelDelta
    let dir = e.wheelDelta;
    // console.log("방향",dir);

    if (dir < 0) {
      pgnum++;
      if (pgnum > pgall - 1) pgnum = pgall - 1;
    } else {
      pgnum--;
      if (pgnum < 0) pgnum = 0;
    }

    // console.log("페이지번호", pgnum);
    updatePg();
  }
  /***********************************************
      함수명: updatePg
      기능: 페이지 이동시 설정값 업데이트 하기
  ***********************************************/
  function updatePg() {
    // 1. 함수 호출 확인
    // console.log("업데이트");

    // 2. 페이지 이동값 셋팅
    let pgpos = window.innerHeight * pgnum;

    // 3. 페이지 이동하기 : 제이쿼리
    $("html,body")
      .stop()
      .animate(
        {
          scrollTop: pgpos + "px",
        },
        400,
        "easeInOutQuint",
        () => {
          // 이동후 업데이트 구역!
          // pgnum이 2이면 스크롤 상태값 1
          if (pgnum === 3 || pgnum === 4) sc_sts = 1;
        }
      );

    // scrollTo(가로,세로)
    // window.scrollTo(0, pgpos);
    // 세로 이동 위치: 윈도우 높이값*페이지 번호
  } //////////////////// updatePg 함수 //////////////////

  // 스크롤 체크할 요소의 위치값
  const pg4 = $("#page_4");
  let pg4pos = pg4.offset().top;
  let pg4Ht = pg4.height() - $(window).height();
  // 총이동가능거리
  let mvHt = pg4pos + pg4Ht;
  // console.log("4페이지top:", pg4pos, pg4Ht, mvHt);

  // pg4 내부 pgnum 분기 기준박스
  const pg3Inbx = $(".page_4-con1").offset().top;

  // 한번만 실행 상태값(1-한번실행전,0-이미실행함)
  let one_sts = 1;

  // 스크롤 이벤트 셋팅하기 /////
  $(window).scroll(function () {
    let scTop = $(window).scrollTop();
    // console.log(scTop);
    // console.log("***한번실행:", one_sts);

    // 만약 4페이지에서 이동범위바깥으로 나갈경우 다시
    // 스크롤 허용을 불허용값으로 업데이트 하기!
    // sc_sts = 0
    if (scTop < pg4pos || scTop >= mvHt) {
      sc_sts = 0;
      one_sts = 1; // 한번실행 초기화
      console.log("대상외구역:", sc_sts, one_sts);
    }

    // 해당구역 하단부분 처리
    if (scTop >= mvHt && scTop <= mvHt + 1 && sc_sts === 0 && one_sts === 1) {
      one_sts = 0; // 한번실행잠금!
      console.log("한번실행:", sc_sts, one_sts);

      updatePg();
      console.log("페이지번호:", pgnum);
    }

    // 스크롤 내부에서 pgnum 3,4 분기하기
    if (scTop > pg3Inbx - 100 && scTop < pg3Inbx) pgnum = 3;
    if (scTop > pg3Inbx && scTop < pg3Inbx + 100) pgnum = 4;
  }); //////////// scroll /////////////////////
}); ///////////////////////// load /////////////////////////
