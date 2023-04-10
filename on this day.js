var birth = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/3/28";
var death = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/deaths/3/28";
var event = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/3/28";
var holiday = "https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/3/28";
var on_this_day = document.querySelector(".on_this_day")
var birth_artical = document.querySelector("#birth_artical");
var event_artical = document.querySelector("#event_artical");
var death_artical = document.querySelector("#death_artical");
var holiday_artical = document.querySelector("#holiday_artical");
var top_old = document.querySelector(".top_old");
var death_old = document.querySelector("#death_old");
var mounth = document.querySelector(".tag_date p");
var day = document.querySelector(".tag_date h1");
var search = document.querySelector("#search");
var view_all = document.querySelector("#view_all");
var home_btn = document.querySelector("#home");
var view_all_event = document.querySelector("#view_all_event");
var view_all_birth = document.querySelector("#view_all_birth");
var view_all_deaths = document.querySelector("#view_all_deaths");
var view_all_holiday = document.querySelector("#view_all_holiday");
var filter = document.querySelector("#filter");
var filter_search = document.querySelector("#filter_search");
var filter_con_name = document.querySelector(".filter_con_name");
var mounth_input = 1;
var day_input = 1;
var range = 2023;

var classname = ["free", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
var mounth_list = ["start", "January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December "]
// onlode...............................

// date
const d = new Date();
var dd = d.getDate();
var mm = d.getMonth() + 1;
mounth.innerHTML = mounth_list[mm];
day.innerHTML = dd
var preloder = document.querySelectorAll(".preloder");


// date mounth input
var day_list = document.querySelectorAll(".d");
var mounth_lists = document.querySelectorAll(".m")
day_list.forEach(e => {
    e.addEventListener("click", () => {

        day_input = e.innerHTML;
        document.querySelector("#day_input").innerHTML = e.innerHTML;
    })
})
mounth_lists.forEach(f => {
    f.addEventListener("click", () => {

        mounth_input = f.innerHTML;
        document.querySelector("#mounth_input").innerHTML = mounth_list[mounth_input];


    })
})
search.addEventListener("click", () => {
    birth_artical.innerHTML = "";
    event_artical.innerHTML = "";
    death_artical.innerHTML = "";
    holiday_artical.innerHTML = "";
    top_old.innerHTML = "";
    death_old.innerHTML = "";
    add()
    dd = day_input;
    mm = mounth_input;
    mounth.innerHTML = mounth_list[mounth_input];

    day.innerHTML = dd
    events();
    birthday();
    deaths();
    holidays();
})
//  to day in history
on_this_day.addEventListener("click", () => {
    birth_artical.innerHTML = "";
    event_artical.innerHTML = "";
    death_artical.innerHTML = "";
    holiday_artical.innerHTML = "";
    top_old.innerHTML = "";
    death_old.innerHTML = "";
    add()
    dd = d.getDate();
    mm = d.getMonth() + 1;
    mounth.innerHTML = mounth_list[mm];

    day.innerHTML = dd
    events();
    birthday();
    deaths();
    holidays();
})
view_all_event.addEventListener("click", () => {
    remove()
    viwe_all_event()
    filter_con_name.innerHTML = "event"
    console.log("hii");
})
view_all_birth.addEventListener("click", () => {
    remove()
    viwe_all_birth()
    filter_con_name.innerHTML = "birth"
})
view_all_deaths.addEventListener("click", () => {
    remove()
    viwe_all_death()
    filter_con_name.innerHTML = "death"
})
view_all_holiday.addEventListener("click", () => {
    remove()
    document.querySelector(".range").style.display = "none"
    viwe_all_holiday()

})
home_btn.addEventListener("click", () => {
    add()
})
// Range........................
document.querySelector(".range").addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector("#disabledRange").removeAttribute("disabled");

})
document.querySelector("#disabledRange").addEventListener("input", (e) => {
    document.querySelector(".see").innerHTML = Math.round((document.querySelector("#disabledRange").value * 8.23) + 1200);
})
filter.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".input_range").style.display = "block";
    filter_search.style.display = "block";
})
filter_search.addEventListener("click", () => {

    if (filter_con_name.innerHTML == "event") {
        range = document.querySelector(".see").innerHTML;
        view_all.innerHTML = "";
        viwe_all_event()
    }
    else if(filter_con_name.innerHTML == "birth"){
        range = document.querySelector(".see").innerHTML;
        view_all.innerHTML = "";
        viwe_all_birth()
    }
    else if(filter_con_name.innerHTML == "death"){
        range = document.querySelector(".see").innerHTML;
        view_all.innerHTML = "";
        viwe_all_death()
    }

})
// viwe_all_event()
// viwe_all_birth()
// viwe_all_death()
// viwe_all_holiday()
events();
birthday();
deaths();
holidays();
async function birthday() {
    preloder.forEach(e => {
        e.classList.remove("remove")
    });
    

    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${mm}/${dd}`);
    var data = await responce.json();
    var b = 0
    if (data.births.length == 0) {
        birth_artical.innerHTML = `<h1><i class="bi bi-exclamation-octagon-fill"></i>Not Found</h1>`
        document.querySelectorAll(".view_all1").forEach(v => {
            v.style.display = "none"
        })
    }
    else {
        document.querySelectorAll(".view_all1").forEach(v => {
            v.style.display = "block";
        })
        data.births.forEach(e => {



            if (e.year <= 1850 && e.pages[0].originalimage && b <= 10) {
                // console.log(b);
                // console.log(e);
                b++
                var birthdayhtml =
                    `
            <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${classname[b]}" aria-expanded="false"
                    aria-controls="flush-collapse${classname[b]}">
                    <div class="artical_img"
                        style="background-image: url(${e.pages[0].originalimage.source});">
                    </div>
                    <p>${e.text} : (B.${e.year})</p>
                </button>
            </h2>
            <div id="flush-collapse${classname[b]}" class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body" style="display: flex; flex-direction: row;">
                        <div class="artical_div">
                        <div class="artical_main_img"
                            style="background-image: url(${e.pages[0].originalimage.source});">
                        </div>
                        <p class="p"> ${e.pages[0].extract} <a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                                More</a></p>
                        </div>
                </div>
            </div>
        </div>
            `

                birth_artical.innerHTML += birthdayhtml;
            }

        });
        var bi = 0
        data.births.reverse().forEach(f => {
            // console.log(f);

            if (f.pages[0].originalimage && bi <= 4) {
                // console.log(bi);
                // console.log(f);
                bi++
                var img =
                    `
                <div class="tot_old_artical">
                <div class="img" style="background-image: url('${f.pages[0].originalimage.source}');"></div>
                <p><b>${f.pages[0].normalizedtitle}</b></p>
                <a href=${f.pages[0].content_urls.desktop.page} target="_blank">${f.year}</a>
            </div>
                `
                top_old.innerHTML += img;
            }
        });

    }
    setTimeout(() => {

        preloder.forEach(e => {
            e.classList.add("remove")
        });
    }, 3000);
};
async function events() {
    setTimeout(() => {

        preloder.forEach(e => {
            e.classList.add("remove")
        });
    }, 3000);
    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`);
    var data = await responce.json();

    var ev = 0
    if (data.events.length == 0) {
        event_artical.innerHTML = `<h1><i class="bi bi-exclamation-octagon-fill"></i>Not Found</h1>`
    }
    else {

        data.events.forEach(e => {



            if (e.pages[0].originalimage && ev <= 10) {
                // console.log(ev);
                // console.log(e);
                ev++
                var eventdayhtml =
                    `
        <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapse${classname[ev]}" aria-expanded="false"
                aria-controls="flush-collapse${classname[ev]}">
                <div class="artical_img"
                    style="background-image: url(${e.pages[0].originalimage.source});">
                </div>
                <p>${e.pages[0].description} (Y:${e.year})</p>
            </button>
        </h2>
        <div id="flush-collapse${classname[ev]}" class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body" style="display: flex; flex-direction: row;">
                <div class="artical_div">
                    <div class="artical_main_img"
                        style="background-image: url(${e.pages[0].originalimage.source});">
                    </div>
                    <p class="p"> ${e.pages[0].extract} <a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                            More</a></p>
                    
                </div>
            </div>
        </div>
    </div>
        `

                event_artical.innerHTML += eventdayhtml;
            }

        });

        document.querySelectorAll(".view_all1").forEach(e => {
            e.style.display = "block";
        });
    }
}
async function deaths() {
    setTimeout(() => {

        preloder.forEach(e => {
            e.classList.add("remove")
        });
    }, 3000);
    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/deaths/${mm}/${dd}`);
    var data = await responce.json();

    var d = 0
    if (data.deaths.length == 0) {
        death_artical.innerHTML = `<h1><i class="bi bi-exclamation-octagon-fill"></i> Not Found</h1>`
    }
    else {
        data.deaths.forEach(e => {



            if (e.year <= 1900 && e.pages[0].originalimage && d <= 10) {
                // console.log(d);
                // console.log(e);
                d++
                var deathdayhtml =
                    `
            <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${classname[d]}" aria-expanded="false"
                    aria-controls="flush-collapse${classname[d]}">
                    <div class="artical_img"
                        style="background-image: url(${e.pages[0].originalimage.source});">
                    </div>
                    <p>${e.text} (D.${e.year})</p>
                </button>
            </h2>
            <div id="flush-collapse${classname[d]}" class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body" style="display: flex; flex-direction: row;">
                <div class="artical_div">
                        <div class="artical_main_img"
                            style="background-image: url(${e.pages[0].originalimage.source});">
                        </div>
                        <p class="p"> ${e.pages[0].extract} <a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                                More</a></p>
                        </div>
                </div>
            </div>
        </div>
            `

                death_artical.innerHTML += deathdayhtml;
            }

        });
        var bi = 0
        data.deaths.reverse().forEach(f => {
            // console.log(f);

            if (f.pages[0].originalimage && bi <= 4) {
                // console.log(bi);
                // console.log(f);
                bi++
                var img =
                    `
                <div class="tot_old_artical">
                <div class="img" style="background-image: url('${f.pages[0].originalimage.source}');"></div>
                <p><b>${f.pages[0].normalizedtitle}</b></p>
                <a href=${f.pages[0].content_urls.desktop.page} target="_blank">${f.year}</a>
            </div>
                `
                death_old.innerHTML += img;
            }
        });

    }

}
async function holidays() {
    setTimeout(() => {

        preloder.forEach(e => {
            e.classList.add("remove")
        });
    }, 3000);
    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/${mm}/${dd}`);
    var data = await responce.json();

    var h = 0
    if (data.holidays.length == 0) {
        holiday_artical.innerHTML = `<h1><i class="bi bi-exclamation-octagon-fill"></i> Not Found</h1>`
    }
    else {
        data.holidays.forEach(e => {



            if (e.pages[0].originalimage && h <= 10) {
                // console.log(h);
                // console.log(e);
                h++
                var holidayshtml =
                    `
                <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse${classname[h]}" aria-expanded="false"
                        aria-controls="flush-collapse${classname[h]}">
                        <div class="artical_img"
                            style="background-image: url(${e.pages[0].originalimage.source});">
                        </div>
                        <p>${e.text}</p>
                    </button>
                </h2>
                <div id="flush-collapse${classname[h]}" class="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body" style="display: flex; flex-direction: row;">
                    <div class="artical_div">
                        <div class="artical_main_img"
                            style="background-image: url(${e.pages[0].originalimage.source});">
                        </div>
                        <p class="p"> ${e.pages[0].extract} <a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                                More</a></p>
                        </div>
                    </div>
                </div>
            </div>
                `

                holiday_artical.innerHTML += holidayshtml;
            }

        });

    }

}
async function viwe_all_event() {
    document.querySelector(".view_all_event_name").innerHTML = "History Events";

    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`);
    var data = await responce.json();
    console.log(data.events.length);
    var i=0;
    data.events.forEach(e => {
        if (e.pages[0].originalimage && e.year <= range) {
            var html =
                `
                <div class="alert alert-primary" role="alert">
                <div class="accordion-body" style="display: flex; flex-direction: row;">
                  <div class="artical_div">
                    <div class="img_info">
                      <div class="artical_main_img"
                      style="background-image: url(${e.pages[0].originalimage.source});">
                    </div>
                    <b>${e.pages[0].normalizedtitle} </b>
                    <b> Y : ${e.year}</b>
                    </div>
                    <p class="p">${e.pages[0].extract}<a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                        More</a></p>
                  </div>
                </div>
              </div>
            `
            i++
            view_all.innerHTML += html
        }
        if (data.events.length >= 50 && e.pages[0].originalimage ) {
            console.log("hii");
            document.querySelector(".range").style.display = "block"
        }
        
    })
    console.log(i);
    if (i==0) {
        view_all.innerHTML=`<h1><i class="bi bi-exclamation-octagon-fill"></i>Not Found</h1>`
    }

}
async function viwe_all_birth() {
    document.querySelector(".view_all_event_name").innerHTML = "Famous Birthdays"
    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${mm}/${dd}`);
    var data = await responce.json();
    console.log(data);
    var i=0;
    data.births.forEach(e => {
        if (e.pages[0].originalimage && e.year <= range) {
            var html =
                `
                <div class="alert alert-primary" role="alert">
                <div class="accordion-body" style="display: flex; flex-direction: row;">
                  <div class="artical_div">
                    <div class="img_info">
                      <div class="artical_main_img"
                      style="background-image: url(${e.pages[0].originalimage.source});">
                    </div>
                    <b>${e.pages[0].normalizedtitle} </b>
                    <b> Y : ${e.year}</b>
                    </div>
                    <p class="p">${e.pages[0].extract}<a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                        More</a></p>
                  </div>
                </div>
              </div>
            `
            i++
            view_all.innerHTML += html
        }
        if (data.births.length >= 50 && e.pages[0].originalimage) {
            document.querySelector(".range").style.display = "block"
        }

    })
    if (i==0) {
        view_all.innerHTML=`<h1><i class="bi bi-exclamation-octagon-fill"></i>Not Found</h1>`
    }

}
async function viwe_all_death() {
    document.querySelector(".view_all_event_name").innerHTML = "On This Day Deaths"
    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/deaths/${mm}/${dd}`);
    var data = await responce.json();
    console.log(data);
    var i=0;
    data.deaths.forEach(e => {
        if (e.pages[0].originalimage && e.year <= range) {
            var html =
                `
                <div class="alert alert-primary" role="alert">
                <div class="accordion-body" style="display: flex; flex-direction: row;">
                  <div class="artical_div">
                    <div class="img_info">
                      <div class="artical_main_img"
                      style="background-image: url(${e.pages[0].originalimage.source});">
                    </div>
                    <b>${e.pages[0].normalizedtitle} </b>
                    <b> Y : ${e.year}</b>
                    </div>
                    <p class="p">${e.pages[0].extract}<a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                        More</a></p>
                  </div>
                </div>
              </div>
            `
            i++
            view_all.innerHTML += html
        }
        if (data.deaths.length >= 50 && e.pages[0].originalimage ) {
            console.log("hii");
            document.querySelector(".range").style.display = "block"
            
        }

    })
    if (i==0) {
        view_all.innerHTML=`<h1><i class="bi bi-exclamation-octagon-fill"></i>Not Found</h1>`
    }
}
async function viwe_all_holiday() {
    document.querySelector(".view_all_event_name").innerHTML = "On This Day holidays"
    const responce = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/${mm}/${dd}`);
    var data = await responce.json();
    console.log(data);
    data.holidays.forEach(e => {
        if (e.pages[0].originalimage) {
            var html =
                `
                <div class="alert alert-primary" role="alert">
                <div class="accordion-body" style="display: flex; flex-direction: row;">
                  <div class="artical_div">
                    <div class="img_info">
                      <div class="artical_main_img"
                      style="background-image: url(${e.pages[0].originalimage.source});">
                    </div>
                    
                    <b>${e.pages[0].normalizedtitle} </b>
                    </div>
                    <p class="p">${e.pages[0].extract}<a href=${e.pages[0].content_urls.desktop.page} target="_blank">Read
                        More</a></p>
                  </div>
                </div>
              </div>
            `
            view_all.innerHTML += html
        }
    })

}
async function remove() {
    document.querySelectorAll(".event").forEach(e => {
        e.style.display = "none";
    })


    document.querySelector(".view_all_content").style.display = "block"
}
async function add() {
    document.querySelectorAll(".event").forEach(e => {
        e.style.display = "block";
    })
    document.querySelector(".view_all_content").style.display = "none"
    view_all.innerHTML = "";
    document.querySelector(".input_range").style.display = "none";
    filter_search.style.display = "none";
    document.querySelector(".see").innerHTML = 2023;
    range = 2023;
    document.querySelector("#disabledRange").value="50"
    filter_con_name.innerHTML = ""
}