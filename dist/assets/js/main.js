document.addEventListener("DOMContentLoaded", function() {

    //
    //Slider
    //
    if (document.querySelector('.header-home')) {
        let interval = null;
        let timeOut = null;
        let dotSlide = document.querySelectorAll('.dot');

        dotSlide.forEach(e => {
            e.addEventListener('click', () => {
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }

                if (!timeOut) {
                    timeOut = setTimeout(() => {
                        setTime();
                    }, 5000);
                } else {
                    clearTimeout(timeOut);
                    timeOut = null;
                    timeOut = setTimeout(() => {
                        setTime();
                    }, 5000);
                }
                activeSlide(e);
            });
        });

        setTime();

        function setTime() {
            interval = setInterval(function() {
                let actived = document.querySelector('.dot.actived');
                let next = actived.nextElementSibling ? actived.nextElementSibling : dotSlide[0];
                activeSlide(next);
            }, 5000);
        }

        function activeSlide(e) {
            let slidePosition = e.dataset.slider;
            let background = document.querySelector(`.background${slidePosition}`);
            let content = document.querySelector('.header-home .content');
            let alignContent = document.querySelector('#align-content');
            let nextDot, previousDot, nextSlide, previousSlide;
            let center = ['offset-sm-1', 'offset-md-2-5'];
            let right = ['offset-sm-2', 'offset-md-5'];
            nextDot = e.nextElementSibling;
            previousDot = e.previousElementSibling;
            nextSlide = background.nextElementSibling;
            previousSlide = background.previousElementSibling;
            while (nextDot) {
                if (nextDot.className.includes('actived')) nextDot.classList.remove('actived');
                nextDot = nextDot.nextElementSibling;
            }
            while (previousDot) {
                if (previousDot.className.includes('actived')) previousDot.classList.remove('actived');
                previousDot = previousDot.previousElementSibling;
            }

            while (nextSlide) {
                if (nextSlide.className.includes('actived')) nextSlide.classList.remove('actived');
                nextSlide = nextSlide.nextElementSibling;
            }
            while (previousDot) {
                if (previousSlide.className.includes('actived')) previousSlide.classList.remove('actived');
                previousSlide = previousSlide.previousElementSibling;
            }

            if (content.className.includes('actived')) content.classList.remove('actived');

            e.classList.add('actived');
            background.classList.add('actived');


            if (slidePosition == 1) {
                if (alignContent.className.includes(center[0])) alignContent.classList.remove(center[0], center[1]);
                else if (alignContent.className.includes(right[0])) alignContent.classList.remove(right[0], right[1]);
                content.style.justifyItems = "start";
                content.style.textAlign = "left";
            } else if (slidePosition == 2) {
                if (alignContent.className.includes(right[0])) alignContent.classList.remove(right[0], right[1]);

                alignContent.classList.add(center[0], center[1]);
                content.style.justifyItems = "center";
                content.style.textAlign = "center";
            } else if (slidePosition == 3) {
                if (alignContent.className.includes(center[0])) alignContent.classList.remove(center[0], center[1]);

                alignContent.classList.add(right[0], right[1]);
                content.style.justifyItems = "end";
                content.style.textAlign = "right";
            }

            setTimeout(() => {
                content.classList.add('actived');
            }, 300);
        }
    }
    //sliders end

    //
    //Menu button
    //
    let menuBtn = document.querySelector('.nav-menu-icon');
    let menuClose = menuBtn.querySelector('.nav-menu-close');
    let menuList = document.querySelector('.menu');
    let overlayBgHeader = document.querySelector('.overlay-bg-header');
    menuList.setAttribute('data-expanded', 'false');
    let menuIcon = menuBtn.querySelector('.nav-menu-icon i');
    menuBtn.addEventListener('click', () => {
        menuIcon.classList.toggle('hidden');
        menuClose.classList.toggle('d-block');
        overlayBgHeader.classList.toggle('actived');
        if (menuList.getAttribute('data-expanded') == 'false') {
            expandedMenu(menuList, menuClose);
            document.body.style.overflow = "hidden";
        } else if (menuList.getAttribute('data-expanded') == 'true') {
            narrowMenu(menuList, menuBtn);
            document.body.style.overflow = null;
        }
    });

    let nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1 && !nav.className.includes('actived')) {
            nav.classList.add('actived');
            setTimeout(() => {
                nav.style.transition = "all 0.3s";
                nav.style.transform = "scaleY(1)";
                nav.style.opacity = "1";
            }, 1);

        } else if (window.scrollY < 1) {
            nav.style.transform = null;
            nav.style.opacity = null;
            nav.style.transition = null;
            nav.classList.remove('actived');
        }
    });

    function expandedMenu(e, e2) {
        e.style.display = "block";
        e2.style.pointerEvents = "none";
        requestAnimationFrame(() => {
            e.style.height = "1px";
            e.style.transition = "all 0.2s";
            requestAnimationFrame(() => {
                e.style.height = e.scrollHeight + "px";
            });

        });
        e.addEventListener('transitionend', function() {
            e.removeEventListener('transitionend', arguments.callee);
            e.style.height = null;
            e2.style.pointerEvents = null;
        });
        e.setAttribute('data-expanded', 'true');
    }

    function narrowMenu(e, e2) {
        e2.style.pointerEvents = "none";
        requestAnimationFrame(() => {
            e.style.height = e.scrollHeight + "px";
            requestAnimationFrame(() => {
                e.style.height = "1px";
            });
        });
        e.addEventListener('transitionend', function() {
            e.removeEventListener('transitionend', arguments.callee);
            e.style.transition = null;
            e.style.height = null;
            e2.style.pointerEvents = null;
            e.style.display = null;
        });

        e.setAttribute('data-expanded', 'false');
    }


    //
    //mission
    //
    if (document.querySelector('.mission')) {

        let missionTitle = document.querySelectorAll('.mission-faq .title');
        let missionContent = document.querySelectorAll('.mission-faq .content');
        missionContent[0].style.maxHeight = missionContent[0].scrollHeight + "px";
        let missionIcon = document.querySelectorAll('.mission-faq .fas');
        missionTitle.forEach((e, i) => {
            e.addEventListener('click', () => {

                if (!e.className.includes('actived')) {
                    missionTitle.forEach(e => e.classList.remove('actived'));
                    missionIcon.forEach(e => e.classList.remove('actived'));
                    missionContent.forEach(e => e.style.maxHeight = "0");
                    e.classList.add('actived');
                    missionIcon[i].classList.add('actived');
                    missionContent[i].style.maxHeight = missionContent[i].scrollHeight + "px";
                } else {
                    e.classList.remove('actived');
                    missionIcon[i].classList.remove('actived');
                    missionContent[i].style.maxHeight = "0";
                }

            });
        });

    }


    //
    // filter image
    //
    if (document.querySelector('.project')) {
        let filterImage = document.querySelectorAll('.project__filter button');
        let gridImg = document.querySelector('.grid-img');
        let itemImgs = gridImg.querySelectorAll('.item-img');
        let objOldImgs = { changedData: itemImgs };
        let oldData = "";
        let noHasEnd = null;
        let sameEnd = null;
        let newEnd = null;

        setTimeout(() => {
            gridImg.style.position = "relative";
            itemImgs.forEach(e => e.style.position = "absolute");
            filter(gridImg, itemImgs);
        }, 1000);

        filterImage.forEach((e) => {
            e.addEventListener('click', () => {
                let data = "cat" + e.dataset.filter;
                let nextBtn = e.nextElementSibling;
                let previousBtn = e.previousElementSibling;
                while (nextBtn) {
                    if (nextBtn.className.includes('actived')) nextBtn.classList.remove('actived');
                    nextBtn = nextBtn.nextElementSibling;
                }
                while (previousBtn) {
                    if (previousBtn.className.includes('actived')) previousBtn.classList.remove('actived');
                    previousBtn = previousBtn.previousElementSibling;
                }
                e.classList.add('actived');

                clearTimeout(noHasEnd);
                clearTimeout(newEnd);
                clearTimeout(sameEnd);

                let imgs = Array.from(itemImgs).filter(e => e.className.includes(data));
                let sameImgs = Array.from(objOldImgs.changedData).filter(e => e.className.includes(data));
                let newImgs = Array.from(imgs).filter(e => !e.className.includes(oldData));
                let noHas = Array.from(objOldImgs.changedData).filter(e => !e.className.includes(data));

                noHas.forEach(e => {

                    Object.assign(e.style, { transition: "transform 0.4s" });
                    requestAnimationFrame(() => {
                        e.style.transform = "scale(0)";
                    });

                });

                noHasEnd = setTimeout(() => {
                    noHas.forEach(e => {
                        Object.assign(e.style, { transform: null, transition: null, display: "none" });
                    });
                }, 400);

                newImgs.forEach(e => {

                    Object.assign(e.style, { display: null, transform: "scale(0)" });
                    setTimeout(() => {
                        Object.assign(e.style, { transition: "transform 0.4s", transform: "scale(1)" });
                    }, 1);

                });

                newEnd = setTimeout(() => {
                    newImgs.forEach(e => {
                        Object.assign(e.style, { transform: null, transition: null });
                    });
                }, 400);

                sameImgs.forEach(e => {
                    Object.assign(e.style, { transition: "left 0.4s, top 0.4s" });
                });

                filter(gridImg, imgs);

                sameEnd = setTimeout(() => {
                    sameImgs.forEach(e => {
                        Object.assign(e.style, { transition: null });
                    });
                }, 400);

                objOldImgs.changedData = imgs;
                oldData = data;

            });
        });

        let imgsOnRow = gridImg.offsetWidth / objOldImgs.changedData[0].offsetWidth;
        let imgHeight = objOldImgs.changedData[0].offsetHeight;
        window.addEventListener('resize', () => {
            let itemsOnRow = gridImg.offsetWidth / objOldImgs.changedData[0].offsetWidth;
            let itemHeight = objOldImgs.changedData[0].offsetHeight;
            if (itemsOnRow != imgsOnRow || itemHeight != imgHeight) {
                objOldImgs.changedData.forEach(e => {
                    Object.assign(e.style, { transition: "left 0.4s, top 0.4s" });
                });

                filter(gridImg, objOldImgs.changedData);

                setTimeout(() => {
                    objOldImgs.changedData.forEach(e => {
                        Object.assign(e.style, { transition: null });
                    });
                }, 400);
            }
            imgsOnRow = itemsOnRow;
            imgHeight = itemHeight;
        });

        function filter(grid, items) {
            items[0].style.display = null;
            let itemsOnRow = grid.offsetWidth / items[0].offsetWidth;
            let ratio = (items[0].offsetWidth / grid.offsetWidth) * 100;
            let itemHeight = items[0].offsetHeight;
            items.forEach((e, i) => {
                requestAnimationFrame(() => {
                    e.style.left = ((i % itemsOnRow) * ratio) + "%";
                    e.style.top = (Math.floor(i / itemsOnRow) * itemHeight) + "px";
                });
            });
            grid.style.height = (Math.ceil(items.length / itemsOnRow) * itemHeight) + "px";
        }
        zoomImg(itemImgs, objOldImgs, "index-1");
    }

    //
    //overlay img (zoom img)
    //

    function zoomImg(element, data, index) {
        let overlayProjectimg = document.querySelector(`.overlay-project-img.${index}`);
        let overlayImg = overlayProjectimg.querySelector('.overlay-img');
        let overlayClose = overlayProjectimg.querySelector('.overlay-close');
        let overlayCounter = overlayProjectimg.querySelector('.overlay-counter');
        let overBgProject = overlayProjectimg.querySelector('.overlay');
        let previousBtn = overlayProjectimg.querySelector('.previous-btn');
        let nextBtn = overlayProjectimg.querySelector('.next-btn');
        let indexImg;
        element.forEach(e => e.addEventListener('click', () => {
            document.body.style.overflow = "hidden";
            overlayProjectimg.classList.add('actived');
            overlayImg.src = e.querySelector('img').src;

            for (indexImg = 0; indexImg < data.changedData.length; indexImg++) {
                if (e == data.changedData[indexImg]) break;
            }
            overlayCounter.innerText = `${indexImg+1} of ${data.changedData.length}`;
        }));

        overlayImg.addEventListener('click', nextImg);
        overlayCounter.addEventListener('click', nextImg);
        nextBtn.addEventListener('click', nextImg);
        previousBtn.addEventListener('click', previousImg);
        overlayClose.addEventListener('click', () => {
            overlayProjectimg.classList.remove('actived');
            document.body.style.overflow = null;
        });
        overBgProject.addEventListener('click', () => {
            overlayProjectimg.classList.remove('actived');
            document.body.style.overflow = null;
        });

        function nextImg() {
            if (indexImg == data.changedData.length - 1) indexImg = -1;
            overlayImg.src = data.changedData[++indexImg].querySelector('img').src;
            overlayCounter.innerText = `${indexImg+1} of ${data.changedData.length}`;
        }

        function previousImg() {
            if (indexImg == 0) indexImg = data.changedData.length;
            overlayImg.src = data.changedData[--indexImg].querySelector('img').src;
            overlayCounter.innerText = `${indexImg+1} of ${data.changedData.length}`;
        }
    }


    //
    //fanfact
    //
    if (document.querySelector('.fanfact')) {
        let fanFact = document.querySelector('.fanfact');
        let ffCounter = document.querySelectorAll('.fanfact-content .counter');
        let ffCounterAcvited = false;
        let innerFfCounter = [];
        ffCounter.forEach((e, i) => {
            innerFfCounter[i] = e.innerText;
        });
        window.addEventListener('scroll', () => {
            if (fanFact.getBoundingClientRect().top >= 0 && fanFact.getBoundingClientRect().bottom <= window.innerHeight && !ffCounterAcvited) {
                ffCounter.forEach((e, i) => {
                    let step = 1500 / Number(innerFfCounter[i]);
                    let j = 1;
                    let setCount = setInterval(() => {
                        e.innerText = j;
                        j++;
                        if (j > innerFfCounter[i]) clearInterval(setCount);
                    }, Math.floor(step));
                });
                ffCounterAcvited = true;
            } else if ((fanFact.getBoundingClientRect().bottom > window.innerHeight || fanFact.getBoundingClientRect().bottom < 0) && ffCounterAcvited) {
                ffCounterAcvited = false;
            }
        });
    }

    //
    //shopping cart
    //
    if (document.querySelector('.shop-details-area')) {
        let Imgview = document.querySelectorAll('.img-view');
        let detailsImg = document.querySelector('.details-img img');
        Imgview.forEach(e => e.addEventListener('click', () => {
            if (!e.className.includes('actived')) {
                Imgview.forEach(e => {
                    e.classList.remove('actived');
                    e.style.pointerEvents = null;
                });
                e.classList.add('actived');
                detailsImg.src = e.querySelector('img').src;
                e.style.pointerEvents = "none";
            }
        }));
    }


    //
    //address customer
    //
    let addressCustomer = document.querySelectorAll('.address__customers ul li');
    let dataCustomer = { changedData: addressCustomer };
    zoomImg(addressCustomer, dataCustomer, "index-2");

    //
    //Scroll top
    //
    let scrollTop = document.querySelector('.scroll-top');
    let html = document.documentElement;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= window.innerHeight && !scrollTop.className.includes('actived')) scrollTop.classList.add('actived');
        else if (window.pageYOffset < window.innerHeight && scrollTop.className.includes('actived')) scrollTop.classList.remove('actived');
    });

    scrollTop.addEventListener('click', () => {
        scrollToTop(300, 3);
    });

    function scrollToTop(totalTime, easingPower) {
        let timeInterval = 1;
        let scrollTop = Math.round(html.scrollTop);
        let timeLeft = totalTime;
        let scrollByPixel = setInterval(() => {
            let percentSpent = (totalTime - timeLeft) / totalTime;
            if (timeLeft >= 0) {
                let newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
                html.scrollTop = newScrollTop;
                timeLeft--;
            } else {
                clearInterval(scrollByPixel);
            }
        }, timeInterval);
    }

    function easeInOut(t, power) {
        if (t < 0.5) return 0.5 * Math.pow(2 * t, power);
        else return 0.5 * (2 - Math.pow(2 * (1 - t), power));

    }
    // end DOMContentLoaded
});