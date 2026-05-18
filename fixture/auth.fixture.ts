import {test as base, Page, request} from '@playwright/test'
import { LoginPage } from '../pom/LoginPage'
export type AuthFixture = {
    loginPage: LoginPage,
    authedPage: Page
}

export const auth = base.extend<AuthFixture>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.gotoPage()
        await use(loginPage)
    },
    authedPage: async ({loginPage, page, storageState}, use) => {
        console.log(typeof storageState);
        console.log(storageState);
        
        const haveStorageState = typeof storageState === 'object' && storageState.origins.length !== 0
        let expiredStorage = true
        if(haveStorageState){
            // Request được cài storageState do chúng ta setup
            const apiContext = await request.newContext({storageState})
            const response = await apiContext.get('https://api-neko-coffee.autoneko.com/api/products/1')
            if (response.ok()){
                expiredStorage = false
            }
        }
        console.log(`Storage expired status: ${expiredStorage}`);
        
        if(expiredStorage){
            console.log('Phiên cũ đã quá hạn > lưu storage mới');
            await loginPage.gotoPage()
            await loginPage.fillEmail(process.env.ADMIN_EMAIL!)
            await loginPage.fillPassWord(process.env.ADMIN_PASSWORD!)
            await loginPage.clickLoginButton()
            await loginPage.loggedIn()
            await page.context().storageState({path: './auth/user.json'})
        }
        await use(page)
    }
}) 