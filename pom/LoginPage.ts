import {expect, Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly pageLocator = {
        closeButton: (page: Page) => page.getByRole('link', {name: ''}),
        emailInput: (page: Page) => page.getByRole('textbox', {name: 'Email/Số điện thoại'}),
        continueButton: (page: Page) => page.getByRole('button', {name: 'Tiếp tục'}),
        signUpButton: (page: Page) => page.getByText('Tạo tài khoản'),
        pinInput: 'input[inputmode="numeric"]',
        forgetPin: (page: Page) => page.getByRole('button', {name: 'Quên mã PIN?'})
    }
    private listLocator = this.getLocator(this.pageLocator)
    async goToPage(){
        await this.page.goto('/sign-in/?returnTo=%2Faccount%2F')
    }
    async fillEmail(email: string){
        this.fillWithLog(this.listLocator('emailInput'), 'bpmtuan8@gmail.com')
    }
    async clickContinueButton(){
        this.clickWithLog(this.listLocator('continueButton'))
    }
    async fillPIN(PIN: string){
        this.listLocator('pinInput').pressSequentially('222222')
    }
    async expectedLoggedIn(){
        await expect(this.page).toHaveURL('https://dev-web.payd.vn/')
    }
    async isOnPage(){
        await expect(this.listLocator('emailInput')).toBeVisible()
        await expect(this.listLocator('closeButton')).toBeVisible()
        await expect(this.page).toHaveURL(/sign-in/)
    }

}