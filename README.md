# Template automation
Dalam pengujian perangkat lunak, otomatisasi pengujian adalah penggunaan perangkat lunak yang terpisah dari perangkat lunak yang diuji untuk mengontrol pelaksanaan pengujian dan perbandingan hasil aktual dengan hasil pengujian yang diharapkan.

## Initiate Automation Project
Project automation menggunakan [Node.js](https://nodejs.org/en/download) sebagai package manager
```
{
  "name": "nama_project-automation",
  "version": "1.0.0",
  "description": "deskripsi project",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "author": "nama_qa",
  "license": "ISC"
}
```
Untuk meringankan QA dalam melakukan regresi maka diterapkan automation menggunakan Selenium (javascript). Install [selenium](https://www.selenium.dev/) run command berikut pada terminal:
```
npm install selenium-webdriver
npm install chromedriver // pastikan versi chromedriver sama dengan versi browser
npm install dotenv
```
---
### Setup Allure Report
- Kemudian install dependencies yaitu allure-report run command berikut:
```
npm install allure-commandline
npm install allure-mocha
```

---

### Run Selenium dan Allure Report
- Setelah setup selenium dan allure-report pastikan `scripts` pada `package.json` seperti dibawah
```
  "scripts": {
    "generate": "mocha -r dotenv/config --no-timeouts --reporter allure-mocha",
    "start": "allure open allure-report --port 8080",
    "report": "allure generate allure-results --clean",
    "test": "mocha -r dotenv/config --no-timeouts"
  },
```
- Pertama command untuk menjalankan test tanpa generate file `.json` gunakan `npm test` atau `npm test <path>`.
- Jalankan `npm run report` untuk generate folder `allure-report` 
- Kemudian jalankan `npm run start` pada terminal untuk meluncurkan allure-report pada browser dengan port `8080` (jangan stop/close/ctrl+c terminal)
- Kemudian run selenium test yang diinginkan pada terminal lain dan akan generate folder `allure-results` secara otomatis.
```
npm run generate
npm run generate <path> // untuk path spesifik
```
- Dan jalankan `npm run report` dan klik tombol refresh halaman port 8080.

