document.addEventListener('DOMContentLoaded', () => {
    const ageGate = document.getElementById('age-gate');
    const btnOver18 = document.getElementById('btn-over-18');
    const btnUnder18 = document.getElementById('btn-under-18');

    const videoContainerOver = document.getElementById('video-container-over');
    const videoOver18 = document.getElementById('video-over-18');

    const videoContainerUnder = document.getElementById('video-container-under');
    const videoUnder18 = document.getElementById('video-under-18');

    // Function to request fullscreen - Targets the CONTAINER
    function requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
        // Note: Some older mobile browsers might need fullscreen requested on the video element itself
        // but targeting the container is generally better for background coverage.
    }

    // --- Event Listeners ---

    // Click "已满18岁"
    btnOver18.addEventListener('click', () => {
        ageGate.style.display = 'none';
        videoContainerOver.classList.add('active'); // Show container
        videoOver18.muted = false;                  // Unmute before play
        videoOver18.play().then(() => {
            // Attempt fullscreen AFTER play starts
            requestFullscreen(videoContainerOver);
        }).catch(error => {
            console.error("Video play failed (Over 18):", error);
            // Fallback or error message if play fails
            alert("无法播放视频。请检查浏览器设置。");
            videoContainerOver.classList.remove('active'); // Hide container again
            ageGate.style.display = 'flex'; // Show gate again
        });
    });

    // Click "未满18岁"
    btnUnder18.addEventListener('click', () => {
        ageGate.style.display = 'none';
        videoContainerUnder.classList.add('active'); // Show container
        videoUnder18.muted = false;                   // Unmute before play
        videoUnder18.play().then(() => {
            // Attempt fullscreen AFTER play starts
            requestFullscreen(videoContainerUnder);
        }).catch(error => {
            console.error("Video play failed (Under 18):", error);
            alert("无法播放视频。请检查浏览器设置。");
            videoContainerUnder.classList.remove('active'); // Hide container again
            ageGate.style.display = 'flex'; // Show gate again
        });
    });

    // Optional: Listener to handle exiting fullscreen (e.g., press Esc)
    function handleFullscreenChange() {
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (!isFullscreen) {
            // User exited fullscreen
            console.log("Exited fullscreen.");
            // Optional: Pause video when exiting fullscreen
            if (!videoOver18.paused) videoOver18.pause();
            if (!videoUnder18.paused) videoUnder18.pause();

            // Optional: Hide video containers and show age gate again?
             // videoContainerOver.classList.remove('active');
             // videoContainerUnder.classList.remove('active');
             // ageGate.style.display = 'flex';
        }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari, Chrome
    document.addEventListener('msfullscreenchange', handleFullscreenChange);     // IE11
});