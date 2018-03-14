
//Youtube endpoint URL
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//Get JSON
function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDlCfnWRmdQQ2sgX-UtBKfkdT5khJphkyo',
    q: `${searchTerm}`,
    maxResults: 5,
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


//Generate video thumbnail image
function renderResult(item){
  return `
  <div class='results_page'>
  <p class="videoTitle">${item.snippet.title}</p>
  <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
	<img src="${item.snippet.thumbnails.medium.url}" alt="video"></a>
	<p class="youtuber">More channels: <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target= "_blank">${item.snippet.channelTitle}</a>
	</p>
	</div>`;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map(item =>  
    renderResult(item));
  $('.js-search-results').html(results);
}


//Listen for when "search button" is clicked
function watchSubmitButton() {
  $('#youtube_mini_search').submit(event => {
    event.preventDefault();
    const queryTarget = $(this).find('#js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmitButton);