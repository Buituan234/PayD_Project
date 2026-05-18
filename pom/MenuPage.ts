import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './BasePage';

export class MenuPage extends BasePage {
    private readonly pageLocator = {
        arrageText: '//label[normalize-space()="Sắp xếp theo:"]',
        firstProduct: 'div[data-testid="products-grid"] > div:nth-child(1)'
    } as const
    readonly locatorList = this.getLocator(this.pageLocator)
    async hoverFirstProduct(){
        await this.locatorList('firstProduct').hover()
    }
    async isOnPage(){
        await expect(this.locatorList('arrageText')).toBeVisible()
    }
}