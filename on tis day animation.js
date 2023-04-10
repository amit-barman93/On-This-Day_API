document.querySelector(".top.onlode .on_this_day").style.opacity="1";
document.querySelector(".top.onlode .img1").style.transform="scale(5)";
setTimeout(() => {
    document.querySelector(".top.onlode .img1").style.transform="scale(2)";
    document.querySelector(".top.onlode .img1").style.margin="0rem 2rem 0rem 0rem";
}, 1000);
setTimeout(() => {
    if (document.querySelector(".top").classList.contains("onlode")) {
        document.querySelector(".top").classList.remove("onlode")
    
    }
    document.querySelector(".img1").style.transform="none";
    document.querySelector(".img1").style.margin="0rem 1rem 0rem 0rem";
    

}, 2000);
setTimeout(() => {
    document.querySelector(".main_contener").style.display="flex";
}, 2500);

