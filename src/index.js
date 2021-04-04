import React from "react";
import ReactDOM from "react-dom";
import jsSHA from "jssha";
import axios from "axios";

const getAuthorizationHeader = function () {
    var AppID = '074a161350e14f9799c1a8bcf708cff4';
    var AppKey = 'At3KeoDpHZ8hLfG2eULtUULEjoU';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

    return { 'Authorization': Authorization, 'X-Date': GMTString };
}

const fetchTime = async () =>{
    const response = await axios.get(`https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/0990/to/1010/2021-04-05?&$format=JSON`,
        {
            headers: getAuthorizationHeader()
        })
        console.log(response)
}

const fetchPrice = async () => {
    const response = await axios.get(`https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/0990/to/1010`,
        {
            headers: getAuthorizationHeader()
        })

        console.log(response);
}

fetchTime();
fetchPrice();


ReactDOM.render(
    <div>hello world</div>,
    document.querySelector("#root")
)