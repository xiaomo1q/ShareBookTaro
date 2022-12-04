# # -*- coding: UTF-8 -*-
# from ntpath import join
# import requests
# import re
# from bs4 import BeautifulSoup
# import datetime
# import time
# import pymysql

# # 伪装成浏览器获取网页文本
# # 接受URL/返回网页文本
# def get_html(url):
#     try:
#         send_headers = {
#             "Host": "book.douban.com",
#             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",
#             "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
#             "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
#             'Connection': 'close'
#         }
#         response = requests.get(url, headers=send_headers)
#         if response.status_code == 200:
#             return response.text
#     except Exception as e:
#         print(e)


# # 解析主页面提取链接属性
# # 接受主页面/返回书本链接
# def get_bookurl(html):
#     soup = BeautifulSoup(html, 'lxml')
#     # print(soup)
#     urllist = []
#     # 提取出图书的href属性
#     for x in soup.find_all('a'):
#         url = x['href']
#         if re.match(r'https://book.douban.com/subject/\d{8}/\Z', url):
#             urllist.append(url)
#     urllist = urllist[::2]
#     return urllist

# # 利用bs4解析书本页面
# # 接受书本页面/返回书本信息
# # get_text()是获取标签之间的文本
# def get_bookdata(html):
#     list = []
#     book_data = []
#     soup = BeautifulSoup(html, 'lxml')
#     # 提取书名
#     title = soup.find('h1').get_text(strip=True)
#     print(title)
#     if title is None:
#         return list
#     book_data.append(title)
#     # # 提取主要内容以字符串形式
#     i = soup.find('div', id='info').get_text(strip=True)
#     # 去掉空格
#     info = re.sub(r'\s+', '', i)
#     # 分组字符串，提取作者、ISBN
#     pattern = re.match(r'作者:(.*)出版社:(.*).*ISBN:(.*)', info)
#     print(pattern, '....pattern')
#     if pattern is None:
#         return list
#     book = pattern.groups()
#     book_data.extend(book)
#     related_info = soup.find('div', class_='related_info')
#     # indent_list = related_info.find_all(attrs={'class': 'indent'})
#     if related_info.find('div', class_='indent').find('span', class_='all'):
#         indent_list = related_info.find('div', class_='indent').find(
#             'span', class_='all').find('div', class_='intro')
#     else:
#         indent_list = related_info.find(
#             'div', class_='indent').find('div', class_='intro')
#     # 提取图片
#     imgUrl = soup.find(class_='nbg')['href']
#     book_data.append(imgUrl)
#     # 提取豆瓣评分
#     stars = soup.find(class_='ll rating_num').get_text(strip=True)
#     book_data.append(stars)

#     # 提取简介
#     # iro = indent_list[0].get_text('|', strip=True)
#     # intro = re.sub(r'\s+', '', iro)
#     iro = indent_list.get_text('|', strip=True)
#     desc = re.sub(r'\s+', '', iro)
#     if iro is None:
#         return list
#     book_data.append(desc)
#     for i in range(len(book_data)):
#         try:
#             list.append(book_data)
#         except Exception as e:
#              list.append(book_data)
#     return list

# # 插入数据到文本文档中
# def intofile(data, file):
#     file=open(file,'a',encoding='utf-8')
#     for i in data:
#         file.write(str(i))
#         file.write('\t')
#     file.write('\n')
#     file.close()

# # 连接数据库，存取数据
# def saveDate(lists,title):
#     db = pymysql.connect(
#         host='127.0.0.1',
#         port=3306,
#         user='root',
#         password='book',
#         database='book',
#         charset='utf8'
#     )
#     cursor = db.cursor()
#     for num in lists:
#         sql = "insert into db_book_list(title,author,press,isbn,imgUrl,stars,book_desc,tag,create_time)" \
#             "VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s')" % (
#                 num[0], num[1], num[2], num[3], num[4], num[5], num[6], title, datetime.datetime.now())
#         try:
#             cursor.execute(sql)
#             db.commit()
#         except Exception as e:
#             # print(e)
#             db.rollback()
#     print("保存成功！！！")

# def main(name):
#     # 第一步：构造出主页面的url，获得所有图书链接
#     book_url = []
#     for a in [0, 20, 40, 60, 80, 100]:
#         url = 'https://book.douban.com/tag/'+name+'?start=' + str(a)+'&type=T'
#         book_url.extend(get_bookurl(get_html(url)))
#         # 去除重复的链接
#     book_url = list(set(book_url))
#     # print(book_url)

# # 第二步：根据图书链接爬取图书信息
#     book_data = []
#     for u in book_url:
#         book_data = get_bookdata(get_html(u))
#         time.sleep(1)  # 定义时间间隔
#         saveDate(book_data,name)
#         # intofile(book_data, 'book.txt')

# if __name__ == '__main__':
#     main('互联网')
#     # book_type=['小说','编程','互联网','历史','艺术','社会学','建筑','经济学','管理','理财','程序','交互设计']
#     # for b in book_type:
#     #     main(b)
