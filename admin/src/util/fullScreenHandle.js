function cancelFullScreen() { //退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    }
}
function showFullScreen() {//展示全屏
    const d_e = document.documentElement;
    if (d_e.requestFullscreen) {
        d_e.requestFullscreen();
    } else if (d_e.webkitRequestFullscreen) {
        d_e.webkitRequestFullscreen()
    } else if (d_e.mozCancelFullScreen) {
        d_e.mozRequestFullScreen();
    } else if (d_e.msRequestFullscreen) {
        d_e.msRequestFullscreen()
    }
}
export { showFullScreen, cancelFullScreen }