const IMAGE_NUM = 14;

function paintImage(src) {
    const bgImage = new Image();
    bgImage.src = src;
    bgImage.classList.add("bg");
    bgImage.addEventListener("load", function() {
        document.body.prepend(bgImage);
    })
}
function pickImage() {
    return `images\\${Math.floor(Math.random() * IMAGE_NUM)+1}.jpg`
}
function init() {
    const src = pickImage();
    paintImage(src);
}

init();