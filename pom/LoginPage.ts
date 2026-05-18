import {expect, Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {
    private readonly pageLocator = {
        welcomeText: (page: Page) => page.getByRole('heading', {name: 'Chào mừng trở lại'}),
        emailInput: 'input[data-testid="login-input-username"]',
        passwordInput: 'input[data-testid="login-input-password"]',
        rememCheckBox: (page: Page) => page.getByRole('checkbox', {name: 'check Ghi nhớ tôi'}),
        forgetPassLink: (page: Page) => page.getByText('Quên mật khẩu?'),
        loginButton: 'button[data-testid="login-button-submit"]',
        signUpLink: (page: Page) => page.getByRole('link', {name: 'Đăng ký ngay'}),
        loginSuccessNoti: (page: Page) => page.getByRole('heading', {name: 'Thành công!'})
    }
    locatorList = this.getLocator(this.pageLocator)
    async gotoPage(){
        await this.page.goto('/login')
    }
    public async fillEmail(email: string){
        await this.fillWithLog(this.locatorList('emailInput'), email)
    }
    public async fillPassWord(password: string){
        await this.fillWithLog(this.locatorList('passwordInput'), password)
    }
    async clickRemember(){
        console.log('Checked remeber me')
        await this.locatorList('rememCheckBox').setChecked(true)
    }
    async clickForgetPass(){
        await this.clickWithLog(this.locatorList('forgetPassLink'))
    }
    async clickLoginButton(){
        await this.clickWithLog(this.locatorList('loginButton'))
    }
    async login(email: string, password: string){
        await this.fillEmail(process.env.ADMIN_EMAIL!)
        await this.fillPassWord(process.env.ADMIN_PASSWORD!)
        await this.clickLoginButton()
    }
    async loggedIn(){
        await expect(this.locatorList('loginSuccessNoti')).toBeVisible()
    }
    async isOnPage(){
        await expect(this.page).toHaveURL(/login/)
        await expect(this.locatorList('welcomeText')).toBeVisible()
        await expect(this.locatorList('loginButton')).toBeEnabled()
    }
}