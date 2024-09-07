document.getElementById('fetch-videos').addEventListener('click', function() {
    const playlistUrl = document.getElementById('playlist-url').value;
    if (playlistUrl) {
        fetchVideos(playlistUrl);
    } else {
        alert("Please enter a valid YouTube playlist link. ");
    }
});

function fetchVideos(playlistUrl) {
    const apiKey = "AIzaSyAf2bBskRDGUb6GdlZtD044lZlYDFSA_0Y";
    const playlistId = extractPlaylistId(playlistUrl);

    fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}')
    .then(response => response.json())
    .then(data => {
        displayVideos(data.items);
    })
    .catch(error => console.error ('Error fetching videos: ', error))
}

function extractPlaylistId(url) {
    const regex = /[&?]list=([^&]+)/;
    const matches = url.match(regex);
    return matches [1];
}

function displayVideos(videos) {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    videos.forEach(video => {
        const videoList = getElementById('video-list');
        videoList.innerHTML = '';
        videos.forEach(video => {
            const videoId = video.snippet.resourceId.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.default.url;


            const videoItem = `
            <div>
                <input type="checkbox" class="video-checkbox" data-video-id="${videoId}">
                <img src="${thumbnail}" alt="${title}">
                <span>${title}</span>
            </div>
            `;
            videoList.innerHTML += videoItem
        });

          document.getElementById('download-selected').addEventListener('click', function() {
     const selectedVideos = document.querySelectorAll('.video-checkbox:checked');
     const format = document.querySelector('input[name="format"]:checked').value;
    
     if (selectedVideos.length === 0) {
         alert("Please select at least one video");
         return;
     }

     selectedVideos.forEach(video => {
         const videoId = video.getAttribute('data-video-id');
         convertAndDownload(videoId, format);
     });
 });

        function convertAndDownload(videoId, format) {
            const downloadUrl = `https://api.netlify.com/api/v1/badges/97475495-b2c0-46c6-a895-026b5fbc7992/deploy-status`;
            window.open(downloadUrl, '_blank');
        }
    })
}
