// console.log('编程实现爬虫爬取豆瓣电影');
import { createCrawl } from 'x-crawl' // 创建爬虫

// 创建爬虫应用
const crawlApp = createCrawl() // 

// crawlPage 用于爬取页面
crawlApp.crawlPage('https://movie.douban.com/chart').then(async (res) => {
    
  const { page, browser } = res.data
  
  // 等待元素出现在页面中
  await page.waitForSelector('#wrapper #content .article')
  const filmHandleList = await page.$$('#wrapper #content .article table')
  const pendingTask = []
  for (const filmHandle of filmHandleList) {
    // 封面链接(picture)
    const picturePending = filmHandle.$eval('td img', (img) => img.src)
    // console.log(picturePending, '////')
    // 电影名(name)
    const namePending = filmHandle.$eval(
      'td:nth-child(2) a',
      (el) => el.innerText.split(' / ')[0]
    )
    // 简介(info)
    const infoPending = filmHandle.$eval(
      'td:nth-child(2) .pl',
      (el) => el.textContent
    )
    // 评分(score)
    // const scorePending = filmHandle.$eval(
    //   'td:nth-child(2) .star .rating_nums',
    //   (el) => el.textContent
    // )
    // 评论人数(commentsNumber)
    const commentsNumberPending = filmHandle.$eval(
      'td:nth-child(2) .star .pl',
      (el) => el.textContent?.replace(/\(|\)/g, '')
    )

    pendingTask.push([
      namePending,
      picturePending,
      infoPending,
    //   scorePending,
      commentsNumberPending
    ])
  }

  const filmInfoResult = []
  let i = 0
  for (const item of pendingTask) {
    Promise.all(item).then((res) => {
      // filmInfo 是一个电影信息对象，顺序在前面就决定好了
      const filmInfo = [
        'name',
        'picture',
        'info',
        // 'score',
        'commentsNumber'
      ].reduce((pre, key, i) => {
        pre[key] = res[i]
        return pre
      }, {})

      // 保存每个电影信息
      filmInfoResult.push(filmInfo)

      // 最后一次的处理
      if (pendingTask.length === ++i) {
        browser.close()

        // 整理，根据数量决定是多还是单
        const filmResult = {
          element: filmInfoResult,
          type: filmInfoResult.length > 1 ? 'multiple' : 'single'
        }

        console.log(filmResult)
      }
    })
  }
})