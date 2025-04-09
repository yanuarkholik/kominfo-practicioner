const loginModule = require('../pages/loginPage.js')
const elementUtils = require('../utils/elementUtils.js')
const createDriver = require('../config/configDriver.js')


describe('Buat Assignment Practicioner', function() {
    let driver;
    let loginPage;
    let text, text2, text3;
    describe('Buat Assignment Practicioner', function() {
        describe('sub-Buat Assignment Practicioner', function() {
            before(async function() {
                // before parameters
                driver = createDriver.createDriver({headless: false});
                loginPage = new loginModule(driver);
                await loginPage.login("000permanamerta@gmail.com", "Asdf1234!")
            })
            after(async function() {
                // after parameters
                await driver.sleep(5000)
                await driver.quit()
            })

            // LMS Moodle
            it('Berhasil akses halaman LMS Dignas', async function() {
                await driver.get("https://lms.merapi.javan.id/course/view.php?&id=224")
                await elementUtils.expectElementInPage(driver, "//span[text()='LMS']")
            })
            it('Berhasil akses halaman Course LMS', async function() {
                await elementUtils.clickButtonXpath(driver, "(//a[normalize-space()= 'Login Keycloak'])[2]")
                await elementUtils.expectElementInPage(driver, "//h4[text()='Course Content']")
                text = await elementUtils.getTextXpath(driver, "//li[@class='breadcrumb-item'][last()]")

                // console.log(text)

                await elementUtils.clickButtonXpath(driver, "//label[normalize-space(text())='Edit mode']")
            })
            it('Berhasil akses modal Create Activity', async function() {
                text2 = await elementUtils.getTextXpath(driver, "(//li[@data-for='section']//a[@title='Edit topic name'])[last()]")
                await elementUtils.clickButtonXpath(driver, "(//li[@data-for='section']//span[text()='Add an activity or resource'])[last()]")
                await elementUtils.clickButtonXpath(driver, "//div[text()='Assignment']")
            })
            it('Berhasil akses halaman Adding a new Assignment to Cek assignment', async function() {
                await elementUtils.expectElementInPage(driver, `//h2[normalize-space()='Adding a new Assignment to ${text2}']`)
            })
            it('Berhasil input data Assignment', async function() {
                text3 = new Date().toLocaleString().replace(',','')
                await elementUtils.fillFilledXpath(driver, "//input[@name='name']", `Assignment ${text3}`)

                // await elementUtils.clickButtonXpath(driver, `(//select[not (@disabled='disabled')]/ancestor::div/label/input)[1]`)
                // await elementUtils.clickButtonXpath(driver, `(//select[not (@disabled='disabled')]/ancestor::div/label/input)[2]`)
                // await elementUtils.clickButtonXpath(driver, `(//select[not (@disabled='disabled')]/ancestor::div/label/input)[3]`)

                await elementUtils.clickButtonXpath(driver, "//label[normalize-space()='Online text']//input")
                await elementUtils.scrollByXpath(driver, "//h3[normalize-space()='Restrict access']/preceding-sibling::a")
                await elementUtils.clickButtonXpath(driver, "//h3[normalize-space()='Restrict access']/preceding-sibling::a")
                await elementUtils.clickButtonUntilFindXpath(driver, "//button[text() ='Add restriction...']")
            })
            it('Berhasil mengakses modal Add Restriction Grouping', async function() {
                await elementUtils.expectElementInPage(driver, "//h5[normalize-space()='Add restriction...']")
                await elementUtils.clickButtonXpath(driver, "//button[normalize-space()='Grouping']")
                await elementUtils.clickButtonXpath(driver, "//select[@name = 'id']")
                await elementUtils.clickButtonXpath(driver, "//select[@name = 'id']//option[contains(text(), '5909')]")

            })
            it('Berhasil mengakses modal Add Restriction Date1', async function() {
                await elementUtils.clickButtonXpath(driver, "//button[text() ='Add restriction...']")

                await elementUtils.expectElementInPage(driver, "//h5[normalize-space()='Add restriction...']")
                await elementUtils.clickButtonXpath(driver, "//button[normalize-space()='Date']")
            })
            it('Berhasil mengakses modal Add Restriction Date2', async function() {
                await elementUtils.clickButtonXpath(driver, "//button[text() ='Add restriction...']")

                await elementUtils.expectElementInPage(driver, "//h5[normalize-space()='Add restriction...']")
                await elementUtils.clickButtonXpath(driver, "//button[normalize-space()='Date']")

                // scroll kebawah
                await elementUtils.scrollByXpath(driver, "//div[@class='copyright-widget text-center']")

                
                await elementUtils.clickButtonXpath(driver, "(//select[@name = 'direction'])[2]")
                await elementUtils.clickButtonXpath(driver, "(//select[@name = 'direction'])[2]//option[normalize-space()='until']")

                // memilih tahun until
                await elementUtils.clickButtonXpath(driver, "(//select[@name = 'x[year]'])[2]")
                await elementUtils.pressKeyArrowDown(driver, "(//select[@name = 'x[year]'])[2]")
                
            })
            it('Berhasil simpan Assignment', async function() {
                await elementUtils.clickButtonXpath(driver, "//input[@id='id_submitbutton2']")
                await elementUtils.expectElementInPage(driver, `//h1[normalize-space()='Assignment ${text3}']`)
            })

            // Practioner 
            it('Berhasil mengakses halaman Tambah Soal', async function() {
                await driver.get("https://practitioner.merapi.javan.id/crud/manage-pelatihan/224/soal_pelatihan/tambah")

                await elementUtils.clickButtonUntilFindXpath(driver, "//select[@id='input-section_id']")
                await elementUtils.clickButtonXpath(driver, `//option[normalize-space()='${text2}']`)

                await elementUtils.clickButtonUntilFindXpath(driver, "//select[@id='input-cocoon_assign_id']")
                await elementUtils.clickButtonXpath(driver, `//option[normalize-space()='Assignment ${text3}']`)

                await elementUtils.clickButtonUntilFindXpath(driver, "//select[@id='input-assignment_type']")
                await elementUtils.clickButtonXpath(driver, `//option[normalize-space()='Jupyter Space']`)

                await elementUtils.clickButtonXpath(driver, "//button[@type='submit']")
            })
        })
    })
})
