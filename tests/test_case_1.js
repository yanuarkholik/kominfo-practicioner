const loginModule = require('../pages/loginPage.js');
const elementUtils = require('../utils/elementUtils.js');
const createDriver = require('../config/configDriver.js');
const { Browser } = require('selenium-webdriver');

// Konfigurasi untuk test runs
const config = {
  numberOfRuns: 24,  // Ubah nilai ini untuk menentukan berapa kali tes akan dijalankan
  browser: 'chrome',
  headless: false,
  credentials: {
    email: "nahriputra@gmail.com",
    password: "Javan123@"
  },
  lmsUrl: "https://lms.sdm.stag.sdmdigital.id/course/view.php?&id=397",
  practitionerUrl: "https://practitioner.stag.sdmdigital.id/crud/manage-pelatihan/397/soal_pelatihan/tambah",
  // Tambahkan waktu tunggu untuk memastikan elemen muncul
  waitTime: 5000 
};

describe('Buat Assignment Practicioner Tests', function() {
  // Jalankan test suite beberapa kali
  for (let runCount = 1; runCount <= config.numberOfRuns; runCount++) {
    describe(`Run #${runCount} - Buat Assignment Practicioner`, function() {
      let driver;
      let loginPage;
      let text, text2, text3;
      
      before(async function() {
        console.log(`Memulai pengujian ke-${runCount} dari ${config.numberOfRuns}`);
        // Tambahkan opsi untuk mengatasi error TensorFlow
        const driverOptions = {
          browser: config.browser, 
          headless: config.headless
        };
        
        // Jika browser adalah Chrome, tambahkan argumen untuk menonaktifkan accelerated features
        if (config.browser.toLowerCase() === 'chrome') {
          driverOptions.args = ['--disable-gpu', '--disable-software-rasterizer'];
        }
        
        driver = createDriver.createDriver(driverOptions);
        loginPage = new loginModule(driver);
        await loginPage.login(config.credentials.email, config.credentials.password);
      });
      
      after(async function() {
        console.log(`Menyelesaikan pengujian ke-${runCount} dari ${config.numberOfRuns}`);
        await driver.quit();
      });

      describe('Alur Pembuatan Assignment', function() {
        // LMS Moodle
        it('Berhasil akses halaman LMS Dignas', async function() {
          await driver.get(config.lmsUrl);
          await elementUtils.expectElementInPage(driver, "//span[text()='LMS']");
        });
        
        it('Berhasil akses halaman Course LMS', async function() {
          await elementUtils.clickButtonXpath(driver, "(//a[normalize-space()= 'Masuk Dengan Akun DTS'])[2]");
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu
          await elementUtils.expectElementInPage(driver, "//h4[text()='Course Content']");
          text = await elementUtils.getTextXpath(driver, "//li[@class='breadcrumb-item'][last()]");
          await elementUtils.clickButtonXpath(driver, "//label[normalize-space(text())='Edit mode']");
        });
        
        it('Berhasil akses modal Create Activity', async function() {
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu
          text2 = await elementUtils.getTextXpath(driver, "(//li[@data-for='section']//a[@title='Edit topic name'])[last()]");
          await elementUtils.clickButtonXpath(driver, "(//li[@data-for='section']//span[text()='Add an activity or resource'])[last()]");
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu
          await elementUtils.clickButtonXpath(driver, "//div[text()='Assignment']");
        });
        
        it('Berhasil akses halaman Adding a new Assignment to Cek assignment', async function() {
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu
          await elementUtils.expectElementInPage(driver, `//h2[normalize-space()='Adding a new Assignment to ${text2}']`);
        });
        
        it('Berhasil input data Assignment', async function() {
            text3 = new Date().toLocaleString().replace(',','')
            await elementUtils.fillFilledXpath(driver, "//input[@name='name']", `Assignment ${text3}`)

          await elementUtils.clickButtonXpath(driver, `(//div[@id='id_availabilitycontainer']//input)[1]`);
          await elementUtils.clickButtonXpath(driver, `(//div[@id='id_availabilitycontainer']//input)[2]`);
          await elementUtils.clickButtonXpath(driver, `(//div[@id='id_availabilitycontainer']//input)[4]`);

          await elementUtils.clickButtonXpath(driver, "//label[normalize-space()='Online text']//input");
          await elementUtils.scrollByXpath(driver, "//h3[normalize-space()='Restrict access']/preceding-sibling::a");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "//h3[normalize-space()='Restrict access']/preceding-sibling::a");
          await driver.sleep(500); // Tambahkan delay singkat
          
          try {
            await elementUtils.clickButtonUntilFindXpath(driver, "//button[text() ='Add restriction...']");
          } catch (error) {
            console.log("Tombol 'Add restriction...' tidak ditemukan, mencoba alternatif");
            await elementUtils.clickButtonXpath(driver, "//button[contains(text(), 'Add restriction')]");
          }
        });
        
        it('Berhasil mengakses modal Add Restriction Grouping', async function() {
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu panjang
          
          // Ubah pendekatan untuk mencari modal
          try {
            await elementUtils.expectElementInPage(driver, "//h5[normalize-space()='Add restriction...']");
          } catch (error) {
            console.log("Modal dengan h5 tidak ditemukan, mencoba alternatif");
            await elementUtils.expectElementInPage(driver, "//div[contains(@class, 'modal') and contains(., 'Add restriction')]");
          }
          
          await elementUtils.clickButtonXpath(driver, "//button[normalize-space()='Grouping']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "//select[@name = 'id']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "//select[@name = 'id']//option[contains(text(), 'Batch')]");
        });
        
        it('Berhasil mengakses modal Add Restriction Date1', async function() {
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "//button[text() ='Add restriction...']");
          await driver.sleep(500); // Tambahkan delay singkat
          
          try {
            await elementUtils.expectElementInPage(driver, "//h5[normalize-space()='Add restriction...']");
          } catch (error) {
            console.log("Modal dengan h5 tidak ditemukan, mencoba alternatif");
            await elementUtils.expectElementInPage(driver, "//div[contains(@class, 'modal') and contains(., 'Add restriction')]");
          }
          
          await elementUtils.clickButtonXpath(driver, "//button[normalize-space()='Date']");
        });
        
        it('Berhasil mengakses modal Add Restriction Date2', async function() {
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.scrollByXpath(driver, "//div[@class='copyright-widget text-center']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "//button[text() ='Add restriction...']");
          await driver.sleep(500); // Tambahkan delay singkat
          
          try {
            await elementUtils.expectElementInPage(driver, "//h5[normalize-space()='Add restriction...']");
          } catch (error) {
            console.log("Modal dengan h5 tidak ditemukan, mencoba alternatif");
            await elementUtils.expectElementInPage(driver, "//div[contains(@class, 'modal') and contains(., 'Add restriction')]");
          }
          
          await elementUtils.clickButtonXpath(driver, "//button[normalize-space()='Date']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "(//select[@name = 'direction'])[2]");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "(//select[@name = 'direction'])[2]//option[normalize-space()='until']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "(//select[@name = 'x[year]'])[2]");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.pressKeyArrowDown(driver, "(//select[@name = 'x[year]'])[2]");
        });
        
        it('Berhasil simpan Assignment', async function() {
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "//input[@id='id_submitbutton2']");
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu
          await elementUtils.expectElementInPage(driver, `//span[@data-value='Assignment ${text3}']`);
        });

        // Practioner 
        it('Berhasil mengakses halaman Tambah Soal', async function() {
          await driver.get(config.practitionerUrl);
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu
          
          await elementUtils.clickButtonUntilFindXpath(driver, "//select[@id='input-section_id']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, `//option[normalize-space()='${text2}']`);
          await driver.sleep(500); // Tambahkan delay singkat
          
          await elementUtils.clickButtonUntilFindXpath(driver, "//select[@id='input-cocoon_assign_id']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, `//option[normalize-space()='Assignment ${text3}']`);
          await driver.sleep(500); // Tambahkan delay singkat
          
          await elementUtils.clickButtonUntilFindXpath(driver, "//select[@id='input-assignment_type']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, `//option[normalize-space()='Jupyter Space']`);
          await driver.sleep(500); // Tambahkan delay singkat
          
          await elementUtils.scrollByXpath(driver, "//button[@type='submit']");
          await driver.sleep(500); // Tambahkan delay singkat
          await elementUtils.clickButtonXpath(driver, "//button[@type='submit']");
          await driver.sleep(config.waitTime); // Tambahkan waktu tunggu
          
          await elementUtils.expectElementInPage(driver, `//p[normalize-space()='Assignment ${text3}']`);
        });
      });
    });
  }
});