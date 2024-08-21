
export function disableScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

export function enableScroll() {
    window.onscroll = function() {};
}