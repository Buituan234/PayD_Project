import { Page } from 'playwright';
import { test, expect } from '../fixture/gatekeeper.fixture'


test.describe('Check đăng nhập Happy case', () => {
    test('Đăng nhập với tài khoản Admin', async ({ loginPage, homePage }) => {
        await loginPage.gotoPage()
        await loginPage.isOnPage()
        await loginPage.fillEmail('admin')
        await loginPage.fillPassWord('Admin@123')
        await loginPage.clickLoginButton()
        await loginPage.loggedIn()
    }
    )
})
