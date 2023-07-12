const mbData = {
    BRAND:[
        "BRAND HISTORY",
        "오시는길",
        "사회공헌",
        "앱, 맴버쉽",
    ],
    MENU:[
        "COFFEE",
        "ICE BLENDED",
        "TEA",
        "JUICE/ADE",
        "DEIL&DESSER",
        "MD",
    ],
    STORE:[
        "이디야 커피랩",
        "매장안내"
    ],
    NEWS:[
        "공지사항",
        "이벤트",
        "매장안내"
    ],
    ABOUT:"ABOUT US"
}


window.addEventListener("DOMContentLoaded",()=>{
    // 모바일용 nav HTML코드 생성
    hcode = `
            <ul>`;
    for(let x in mbData){
        if(x !== "ABOUT"){
            hcode += `
                <li>
                    <a href="#" class="mobile_tit">${x}</a>
                    <div class="submenu mobile_sub">
                        <ul>`
            for(let y of mbData[x])[
                hcode += `
                            <li><a href="#">${y}</a></li>`
            ]
            hcode += `
                        </ul>
                    </div>
                </li>`
        }else{
            hcode +=`
                <li>
                    <h2 class="submenu_h2 submenu">
                        <a href="#">${mbData[x]}</a>
                    </h2>
                </li>
            `
        }
    }
    hcode += `</ul>
            <ol>
                <li class="icon-search">
                <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
                </li>
                <li class="fran"><a href="#">FRANCHISE</a></li>
            </ol>
    `
    // 모바일 nav에 hcode 넣기
    document.querySelector(".mobile").innerHTML = hcode;

// 모바일 메뉴 클릭하면 서브메뉴 등장
const mobileTit = document.querySelectorAll(".mobile_tit");
mobileTit.forEach((v,i)=>{
    v.onclick = () =>{
        v.nextElementSibling.classList.toggle("on");
        // 다른 서브메뉴 클래스 없애려고 불가피하게 제이쿼리 사용함
        $(v).parent().siblings().find(".mobile_sub").removeClass("on");
    }
  })
})