const axios = require("axios");
const cheerio = require("cheerio");
const pDAO = require("../database/project_dao")

const getHtml = async(num)=>{
    const cadd = await pDAO.getHtml(num);
    const addr = 'https://www.accuweather.com/ko/${cadd}';
    console.log(addr);
    /*try{
        return await axios.get(addr);
    }catch(err){
        console.log(err);
    }*/
};
/*getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.two-column-page-content div div a.card-module div div div").children("div.temp-container");

        $bodyList.each(function(i, elem) {
        ulList[i] = {
            temp: $(this).find('temp').text() + "C"
        };
        });

        const data = ulList.filter(n => n.temp);
        return data;
    })
    .then(res => log(res));*/

module.exports = {getHtml}