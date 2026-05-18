import { Locator, Page, expect } from "playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    private readonly pageLocator = {
        welcomeText: (page: Page) => page.getByRole('heading', {name: 'Đánh Thức Mọi Giác Quan'}),
        menuButton: (page: Page) => page.getByRole('link', {name: 'local_cafe Xem Thực Đơn'}),
        storyLink: (page: Page) => page.getByText('Câu Chuyện Của Chúng Tôi'),
        viewAllBeverageLink: (page: Page) => page.getByRole('link', {name: 'Xem tất cả arrow_forward'})
    } as const
    readonly locatorList = this.getLocator(this.pageLocator)
    async viewMenu(){
        await this.clickWithLog(this.locatorList('menuButton'))
    }
    async viewStory(){
        await this.clickWithLog(this.locatorList('storyLink'))
    }
    async isOnPage(){
        await expect(this.locatorList('welcomeText')).toBeVisible()
    }
}