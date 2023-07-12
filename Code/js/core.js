window.addEventListener("DOMContentLoaded", () => {
  console.log("core-JS 로딩완료!");

  /*-------------------------
  menu - 메뉴 보이기
  기능: 오버시 메뉴보이기
  대상: .nav>ul>li
  변경대상: .nav
  변경내용: 높이값 기존에서 메뉴 내용만큼 + 50px
  -------------------------*/
  const nav = document.querySelector("#gnb .nav");
  const menu = document.querySelectorAll(".nav>ul>li"); 
  const submenu = document.querySelectorAll(".submenu"); 
  const about = document.querySelector(".submenu_h2");

  menu.forEach((v, i) => {
    v.onmouseenter = () => {
      submenu[i].style.display = "block"; 

      // 서브메뉴 전체 높이값
      // sw <- about us 부모요소에 submenu클래스 없어서 추가하고
      // .subemenu ul있으면 ul의 clientHeight구하고 ul없으면 submenu의 clientHeight구하기 ################################
      let vH = v.querySelector(".submenu ul")? v.querySelector(".submenu ul").clientHeight : v.querySelector(".submenu").clientHeight + 50;
      nav.classList.add("on");
      about.style.display = "block";
      nav.style.height = vH + 150 + "px";
    };

    v.onmouseleave = () => {
      submenu[i].style.display = "none";
    };
  });

  nav.onmouseleave = () => {
    if (window.innerWidth <= 786) {
      about.style.display = "block";
    } else {
      about.style.display = "none";
    }
    nav.classList.remove("on");
    nav.style.height = "100px";
  };


  /*-------------------------
    mobile-menu - menu 보이기
    함수명: mobileMenu
    기능: #gnb에 class .on을 적용시키면 모바일전용 메뉴 보여짐
    대상: .ham , .close
    변경대상: #gnb
    -------------------------*/
  const ham = document.querySelector(".ham");
  const close = document.querySelector(".close");

  ham.onclick = mobileMenu;
  close.onclick = mobileMenu;
  function mobileMenu() {
    const gnb = document.querySelector("#gnb");
    gnb.classList.toggle("on");
  }
}); //////////////////////////////////////////////////////////////////////////////////////
