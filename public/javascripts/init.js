function _g_(it) {
    var out = '<div class="collapsible-header collection-item active avatar"> <a href=\'' + (it.feedBaseUrl + it.entryLink) + '\' id=\'entryId\'> <i class="material-icons small">label_outline</i> </a> <a href=\'' + (it.authorUri) + '\' id="authorName" class="waves-effect waves-red btn-flat">' + (it.authorName) + '</a> <span class="badge" id="hideBadge">Hide</span><span id="categoryTerm" class="badge"> <a href=\'' + (it.categoryLabel) + '\' class="waves-effect waves-red btn-flat">' + (it.categoryTerm) + '</a> </span> <div class="entryTitle title">' + (it.entryTitle) + '</div> </div> <div id="content_body" class="collapsible-body contains_table"> ' + (it.contents_) + '</div>';
    return out;
}


console.log("hello from the other side");

function toggle_display(e) {
    if ($(this).html() == "Hide") {
        $(this).parent().find('.entryTitle').hide();
        $(this).parent().parent().find("div#content_body").removeClass('collapsible-body').hide();
        $(this).html("Show");
    } else {
        $(this).parent().find('.entryTitle').show();
        $(this).parent().parent().find("div#content_body").addClass('collapsible-body').show();
        $(this).html("Hide");
    }
    return false;
}

$(document).ready(function() {
    var start = new Date();
    $("#currentTimeDiv").html(start.toISOString());
    var timeoutID;
    // updateTime(start);

    $('#read').click(function() {
        var bogieURL = $('#rss_feed_url')[0].value || "https://www.reddit.com/r/unixporn/.rss";
        var ul = $('#data_ul')[0];
        var daLabelDiv = $("#daLabelDiv");
        var feedSubtitleDiv = $("#feedSubtitleDiv");

        $.get('/readFeed', {
            q: bogieURL
        }, (data) => {
            ul.innerHTML='';
            var secs = 0;
            var mins = 0;
            var hours = 0;
            if(typeof timeoutID != undefined)
                clearTimeout(timeoutID);

            timeoutID = window.setInterval(() => {
                secs++;
                if (secs >= 60) { secs = secs % 60; mins++; }
                if (mins >= 60) { mins = mins % 60; hours++;}
                var since = "Reading since " + (hours > 0 ? hours + 'h' : "") + (mins > 0 ? min + 'm' : "") + secs + 's';
                $("#timespent").html(since);
            }, 1000);

            if (data.err) {
                console.log(data.err);
                $('#message_text').html(data.err);
                $("#message_window").openModal();
                return;
            }

            var da = data.data.feed;
            var daLabel = da.category[0].$.label;
            var feedpageLink = $('<a/>').html(daLabel).attr('href', "https://reddit.com" + daLabel);
            daLabelDiv.html("reading from ");
            daLabelDiv.append(feedpageLink);
            // daTerm = da.category[0].$.term;
            // feedId = da.id[0];

            // only present in subreddits and comments
            var daIcon = (typeof da['icon'] != 'undefined') ? da.icon[0] : '';
            var daLogo = (typeof da['logo'] != 'undefined') ? da.logo[0] : '';
            var feedSubtitle = (typeof da['subtitle'] != 'undefined') ? da.subtitle[0] : '';
            feedSubtitleDiv.html(feedSubtitle);

            da.entry.forEach((entry) => {
                // 'author','category','content','id','link','title','updated'
                // console.log(entity);
                var details = {
                    'authorName': entry.author[0].name[0],
                    'authorUri': entry.author[0].uri[0],
                    'categoryTerm': entry.category[0].$.term,
                    'categoryLabel': entry.category[0].$.label,
                    'entryId': entry.id[0],
                    'entryLink': entry.link[0].$.href,
                    'entryTitle': entry.title[0],
                    'contents_': entry.content[0]._,
                    'feedBaseUrl': 'https://reddit.com'
                }
                var b = _g_(details);
                var ela = $('<li/>').html(b)[0];
                var hidebtn = $(ela).find("#hideBadge");
                $(hidebtn).on('click', toggle_display);
                ul.appendChild(ela);
            });
            $("#content_container").show();
        });
    });
});
