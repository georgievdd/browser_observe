const state = {}
function getSrcList(video) {
    const srcList = [video.src]
    video.querySelectorAll('source')
        .forEach(source => srcList.push(source.src))
    return srcList.filter(Boolean)
}
function getVideoInfo(video) {
    return {
        methods: {
            play: video.play,
            pause: video.pause,
            load: video.load,
            canPlayType: video.canPlayType,
            fastSeek: video.fastSeek,
            getVideoPlaybackQuality: video.getVideoPlaybackQuality,
            requestPictureInPicture: video.requestPictureInPicture,
            setMediaKeys: video.setMediaKeys
        },
        state: () => ({
            paused: video.paused,
            currentTime: video.currentTime,
            duration: video.duration,
            volume: video.volume,
            playbackRate: video.playbackRate,
            muted: video.muted,
            readyState: video.readyState,
            networkState: video.networkState,
            buffered: video.buffered,
            seekable: video.seekable,
            ended: video.ended,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
        })
    }
}
function getVideoApi(video) {
    return {
        video,
        src: getSrcList(video),
        info: getVideoInfo(video)
    }
}
function addVideoToState(state, video) {
    const id = video.id || Math.random().toString()
    if (!video.id) {
        video.id = `video_${id}`
    }
    state[id] = getVideoApi(video)
}
function observeForVideo(node) {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(addedNode => {
                    if (addedNode.tagName === 'VIDEO') {
                        addVideoToState(state, addedNode)
                    }
                })
            }
        }
    })
    observer.observe(node, {
        childList: true,
        subtree: true
    })
    return observer
}
function recursiveCheck(root) {
    root.childNodes.forEach(node => {
        if (node.tagName === 'VIDEO') {
            addVideoToState(state, node);
        }
        if (node.childNodes.length > 0) {
            recursiveCheck(node);
        }
    });
    if (root.shadowRoot) {
        recursiveCheck(root.shadowRoot);
    }
    if (root instanceof ShadowRoot || root instanceof Document) {
        observeForVideo(root);
    }
}

window.addEventListener('load', () => {
    recursiveCheck(document)
})

document.state = state
