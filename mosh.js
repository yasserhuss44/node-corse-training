
var sectionList = [];
function getPageContents(callback, url, params) {
    http = new XMLHttpRequest();
    if (params != null) {
        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    } else {
        http.open("GET", url, true);
    }
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    }
    http.send(params);
}

function downloadFile(url) {
    var link = document.createElement('a');

    link.setAttribute('download', null);
    link.style.display = 'none';
    document.body.appendChild(link);

    link.setAttribute('href', url);
    link.click();

    document.body.removeChild(link);
}
function getDownloadUrl(pageurl, callback) {
    getPageContents((resp) => {
        var el = document.createElement('html');
        el.innerHTML = resp;
        const download = el.getElementsByClassName('download')[0].href;
        section - title
        callback(download);

        // resp.indexOf('<div class='row attachment'><a class='download'
        //   href='')
        // videosUrl.push(download) ;
    }, pageurl)
}


$('.course-section').each(function (index, item) {
    const sectionTitle = $(item).find('.section-title')[0].innerText.replace(/(?:\r\n|\r|\n)/g, '').trim();
    let section = { SectionTitle: sectionTitle, lecturesList: [] };
    $(item).find('.section-list').find('li.section-item').each(function (index2, video) {
        const name = $(video).find('.lecture-name')[0].innerText.replace(/(?:\r\n|\r|\n)/g, '').trim()
        let trimmedName = '';
        if (name.indexOf('(') != -1)
            trimmedName = name.slice(0, name.length - 10).trim();
        else
            trimmedName = name.trim();

        const videourl = video.attributes['data-lecture-url'].value;
        const fullurl = `https://codewithmosh.com/${videourl}`;
        section.lecturesList.push({ videoUrl: fullurl, name: trimmedName });
    })
    sectionList.push(section);


})
var i = 0;                     //  set your counter to 1

function myLoop() {           //  create a loop function
    setTimeout(function () {    //  call a 3s setTimeout when the loop is called
        getDownloadUrl(sectionList[i], function (videourl) {
            console.log(videourl);
        })
        i++;                     //  increment the counter
        if (i < sectionList.length) {            //  if the counter < 10, call the loop function
            myLoop();             //  ..  again which will trigger another 
        }                        //  ..  setTimeout()
    }, 30000)
}

// setTimeout(function () {
//     myLoop();
// }, 10000)





