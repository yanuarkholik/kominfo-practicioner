# Template automation
Dalam pengujian perangkat lunak, otomatisasi pengujian adalah penggunaan perangkat lunak yang terpisah dari perangkat lunak yang diuji untuk mengontrol pelaksanaan pengujian dan perbandingan hasil aktual dengan hasil pengujian yang diharapkan.

```
```
## Project Architecture
Berikut adalah arsitektur project:
project-root/
├── config/                     # Configuration files
│   ├── config.json             # General project configuration
│   ├── browserConfig.js        # Browser-specific setup
├── tests/                      # Test scripts
│   ├── loginTests/             # Tests for login functionality
│   │   └── loginTest.js
│   ├── dashboardTests/         # Tests for dashboard functionality
│   │   └── dashboardTest.js
├── pages/                      # Page Object Model files
│   ├── loginPage.js            # Login page object
│   ├── dashboardPage.js        # Dashboard page object
├── utils/                      # Utility functions
│   ├── waitUtils.js            # Utilities for waiting for elements
│   ├── screenshotUtils.js      # Utilities for taking screenshots 
│   ├── dateUtils.js            # Utilities for getting date 
│   ├── elementUtils.js         # Utilities for using web elements
├── drivers/                    # WebDriver binaries (if required)
├── node_modules/               # Dependencies
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Dependency lock file
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```
```

- **config/**: Stores configuration files such as browser configurations and general project settings.
- **tests/**: Contains test scripts, organized by modules (e.g., login tests, dashboard tests).
- **pages/**: Implements the Page Object Model pattern with page objects for different pages (e.g., login page, dashboard page).
- **utils/**: Contains utility functions for waiting for elements, taking screenshots, and other helper tasks.
- **drivers/**: Includes WebDriver binaries if necessary for cross-browser testing.
- **node_modules/**: Automatically generated when installing dependencies.
- **.env**: Stores environment variables for the project.
- **package.json**: Contains project metadata and dependency information.

This architecture will help keep the project modular and organized, making it easier to maintain and scale as more tests are added. Each module is isolated, and utility functions can be reused across different test scripts.

---

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

---
## Eksport Issue Allure-Report
- Setelah menjalankan `npm run start` dan `npm run report` maka halaman Allure-Report akan muncul. ![allure-start](template-automation/data/source/allure-start.png)
- Untuk mengunduh dokumen hasil menjalankan automation maka klik menu Suite dan klik icon download. ![allure-export](https://gitlab.javan.co.id/automation-test/template-automation/-/blob/main/data/source/allure-export-button.PNG)
- Dokumen eksport berekstensi `.csv`, agar tampilan terlihat lebih baik maka block cell baris paling awal. ![block-line-csv](https://gitlab.javan.co.id/automation-test/template-automation/-/blob/main/data/source/block-semualine.png)
- Kemudian klik menu Data pada excel dan klik Text-to-Column. Pilih radio button 'Delimiter' kemudian klik tombol Next. Pilih 'comma' kemudian klik tombol Next dan klik tombol Finish. ![data-text-t-column](https://gitlab.javan.co.id/automation-test/template-automation/-/blob/main/data/source/klik-data-text-to-column.png)
- Data akan terlihat lebih rapih dan mudah dibaca. ![allure-save](https://gitlab.javan.co.id/automation-test/template-automation/-/blob/main/data/source/save.JPG)
