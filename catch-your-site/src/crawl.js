const webpage = require('webpage');

const page = webpage.create();

page.onConsoleMessage = function() {
    console.log.apply(console, arguments);
}
page.onResourceReceived = function(response){
    console.info(response.id, response.stage, JSON.stringify(response));
};
page.open('http://v.bootstrapmb.com/2019/10/kra866472/');
