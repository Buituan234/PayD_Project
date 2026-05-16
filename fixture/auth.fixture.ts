import {test as base, Page} from '@playwright/test'
import { LoginPage } from '../pom/LoginPage'
export type AuthFixture = {
    loginPage: LoginPage,
    authedPage: Page
}

export const auth = base.extend<AuthFixture>({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goToPage()
        await use(loginPage)
    },
    authedPage: async({loginPage, page, storageState}, use) => {
        const isGuestMode = typeof storageState === 'object' && storageState.cookies?.length !== 0
        if (isGuestMode){
            console.log('⚠️ Token hết hạn. Đang đăng nhập lại...');
            await loginPage.goToPage()
            await loginPage.fillEmail('bpmtuan8@gmail.com')
            await loginPage.clickContinueButton()
            await loginPage.fillPIN('222222')
            await loginPage.expectedLoggedIn()
        }
        await use(page)
})