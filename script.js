// Click and Keydown event on Search button

$('#search-btn').on('click', function(e) {
    e.preventDefault();
    $('#results').empty();
    getWikiData();
    
});

$('#search-input').keydown(function(evt) {
    if (evt.keyCode === 13) {
        evt.preventDefault();
        $('#results').empty();
        getWikiData();
    }
});



// Retrieve wikipedia data in jsonp format based on 'search'

var getWikiData = function() {
    
    var searchInput = $("#search-input").val();
    
    var wikiURL = "https://en.wikipedia.org/w/api.php";
    wikiURL += '?' + $.param({
        'action' : 'opensearch',
        'search' : searchInput,
        'prop'  : 'revisions',
        'rvprop' : 'content',
        'format' : 'json',
        'limit' : 10
    });

    $.ajax( {
        url: wikiURL,
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            renderHtml(data);
            $('#search-input').val('');
            $('#search-input').blur();
        }
    } );
}


// Add cards into HTML

var renderHtml = function(wikiData) {
    var searchData = [];
        for (var i = 1; i < wikiData.length; i++) {
            searchData.push(wikiData[i]);    
        }
    console.log(searchData);
    
    
    var card;
    
    for (i = 0; i < searchData[0].length; i++) {
        card = '<div class="col-sm-6 cards"><div class="card fadeIn"><div class="card-block"><h3 class="card-title" id="title-' + i + '"></h3><p class="card-text" id="text-' + i + '">With supporting text below as a natural lead-in to additional content.</p><a id="link-' + i + '" href="#" class="btn btn-outline-info" target="_blank">Read more</a></div></div></div>';
        $('#results').append(card);
        $('#title-' + i).text(searchData[0][i]);
    }
    
    for (i = 0; i < searchData[1].length; i++) {
        $('#text-' + i).text(searchData[1][i]);
    }
    
    for (i = 0; i < searchData[2].length; i++) {
        $('#link-' + i).attr('href', searchData[2][i]);
    }
    
}



 




