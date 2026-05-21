import { Page } from 'playwright';
import { test, expect } from '../fixture/gatekeeper.fixture'
import * as allure from 'allure-js-commons'
import { log } from 'node:console';

test('Thử chức năng của allure report', async({page, loginPage}) => {
    await allure.epic('Coffe neko test')
    await allure.feature('Đăng nhập')
    await allure.owner('Tuấn test auto')
    await allure.severity('Critical')
    await allure.description('Nhập chuẩn pass và email')

    await allure.step('Vào màn đăng nhập', async() => {
        await loginPage.gotoPage()
        const screenShot =  await page.screenshot()
        await allure.attachment('Ảnh màn login', screenShot, 'image/png')
    })

    await allure.step('Điền email và password', async(stepContext)=>{
        await stepContext.parameter('email', 'admin')
        await stepContext.parameter('password', '*****')

        await loginPage.fillEmail('admin')
        await loginPage.fillPassWord('Admin@1231')

        const screenShot = await page.screenshot()
        await allure.attachment('Ảnh điền email/pass', screenShot, 'image/png')
    })

    await allure.step('Đăng nhập vào home' ,async() => {
        await loginPage.clickLoginButton()
        await loginPage.loggedIn()

        const screenShot = await page.screenshot()
        await allure.attachment('Ảnh đăng nhập thành công', screenShot, 'image/png')
    })
})