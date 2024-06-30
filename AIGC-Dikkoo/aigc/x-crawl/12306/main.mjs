import { createCrawl } from 'x-crawl'

const crawlApp = createCrawl({ intervalTime: { max: 3000, min: 1000 } })

let queryData = {
    'leftTicketDTO.train_date': '2024-06-12',
    'leftTicketDTO.from_station': 'GZQ',
    'leftTicketDTO.to_station': 'NUG',
    'purpose_codes': '0X00'
}

let queryHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Cookie': '_uab_collina=169890007311186177236914; JSESSIONID=6BB7398EB80A953FA59317843FB5F654; _jc_save_wfdc_flag=dc; BIGipServerotn=2731999498.24610.0000; BIGipServerpassport=786956554.50215.0000; guidesStatus=off; highContrastMode=defaltMode; cursorStatus=off; route=9036359bb8a8a461c164a04f8f50b252; _jc_save_fromStation=%u5E7F%u5DDE%2CGZQ; _jc_save_toStation=%u5357%u660C%u4E1C%2CNUG; _jc_save_fromDate=2024-06-12; _jc_save_toDate=2024-06-12'
}

const targets = [
    'https://kyfw.12306.cn/otn/leftTicket/query',
    {
        url: 'https://www.example.com/api-3',
        method: 'GET',
        params: queryData,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    }
]

crawlApp.crawlData({ targets }).then((res) => {
    // 处理
    console.log(res);
})