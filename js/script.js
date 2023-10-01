var pictureCount = 0;
var images = ['tel1', 'tel2', 'tel3']
var prices = {}
var total = 0
function changePicture() {
        const carouselEl = document.getElementById("carousel");
        const slideContainerEl = carouselEl.querySelector("#slide-container");
        const slideEl = carouselEl.querySelector(".slide");
        let slideWidth = slideEl.offsetWidth;
        // Add click handlers
        document.querySelectorAll(".slide-indicator")
            .forEach((dot, index) => {
                dot.addEventListener("click", () => navigate(index));
                dot.addEventListener("mouseenter", () => clearInterval(autoplay));
            });
        // Add keyboard handlers
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') {
                clearInterval(autoplay);
                navigate("backward");
            } else if (e.code === 'ArrowRight') {
                clearInterval(autoplay);
                navigate("forward");
            }
        });
        // Add resize handler
        window.addEventListener('resize', () => {
            slideWidth = slideEl.offsetWidth;
        });
        // Autoplay
        const autoplay = setInterval(() => navigate("forward"), 3000);
        slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));
        // Slide transition
        const getNewScrollPosition = (arg) => {
            const gap = 10;
            const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
            if (arg === "forward") {
                const x = slideContainerEl.scrollLeft + slideWidth + gap;
                return x <= maxScrollLeft ? x : 0;
            } else if (arg === "backward") {
                const x = slideContainerEl.scrollLeft - slideWidth - gap;
                return x >= 0 ? x : maxScrollLeft;
            } else if (typeof arg === "number") {
                const x = arg * (slideWidth + gap);
                return x;
            }
        }
        const navigate = (arg) => {
            slideContainerEl.scrollLeft = getNewScrollPosition(arg);
        }
        // Slide indicators
        const slideObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slideIndex = entry.target.dataset.slideindex;
                    carouselEl.querySelector('.slide-indicator.active').classList.remove('active');
                    carouselEl.querySelectorAll('.slide-indicator')[slideIndex].classList.add('active');
                }
            });
        }, { root: slideContainerEl, threshold: .1 });
        document.querySelectorAll('.slide').forEach((slide) => {
            slideObserver.observe(slide);
        });
    }

    var darkmodevar = false;
    function darkmode() 
    {
        if (!darkmodevar){
        let element = document.body;
        element.className = "dark-mode";
        element = document.getElementById('modebuttond');
        element.id = 'modebuttonl';
        element.src = "imgs/sun.svg";
        }
        else
        {
            let element = document.body;
            element.className = "light-mode";
            element = document.getElementById('modebuttonl');
            element.id = 'modebuttond';
            element.src = "imgs/moon.svg";
        }
        darkmodevar = !darkmodevar;
    }
function loadShop() {
    fetch('js/phones.json').then((response) => response.json()).then((json) =>{
        jsn = json.phones;
        for(var k = 0; k < jsn.length; k++){
            prices[jsn[k].id] = parseInt(jsn[k].price.replace('.', ''));
            var element = document.getElementById('phoneContainer');
            element.insertAdjacentHTML('beforebegin', `<div class="phone" id="pid0">
            <div class="phoneimageholder" id="${jsn[k].id}" style="background-image: url(${jsn[k].image})"></div>
            <div class="topdecor">
                <p class="text phonename">${jsn[k].name}<div class="fine phonedescription">${jsn[k].description}</div></p>
            </div>
            <div class="bottomdecor">
                <p class="price text">${jsn[k].price} Ft</p>
                <button class="buybutton" onclick="addToCart(this)">Vásárlás</button>
            </div>
        </div>`);
        }
    });

}

function dobuylist() {
    var element = document.getElementById('buylist');
    var element2 = document.getElementById('buybutton');
    if (element.classList.contains('openbuylist')){
        element.classList.remove('openbuylist')
        element.classList.add('closebuylist')
    }
    else {
        element.classList.add('openbuylist')
        element.classList.remove('closebuylist')
    }
}
var maxInCart = 4;
function removeFromCart(val) {
    total-= prices[val.parentElement.id];
    val.parentElement.remove();
    document.getElementById('totalprice').innerText = `${total} Ft`
}

function addToCart(val) {
    if (document.getElementById('buylist').children.length < maxInCart){
    var img = getComputedStyle(val.parentElement.parentElement.children[0]).getPropertyValue('background-image').slice(4, -1).replace(/"/g, "");
    var id = val.parentElement.parentElement.children[0].id;
    var shoplist = document.getElementById('buylist');
    shoplist.insertAdjacentHTML('afterbegin', `
    <div class="incart" id="${id}" style="background-image: url('${img}')">
        <div class="cross" onclick="removeFromCart(this)">X</div>
    </div>`);
    total += prices[id];
    document.getElementById('totalprice').innerText = `${total} Ft`
    console.log(img);
    }
    else{
        alert("Jelenleg több mint 4 eszköz nem engedélyezett a kosarában.")
    }
}