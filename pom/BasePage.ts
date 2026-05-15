import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
    public page: Page
    constructor(Page: Page){
        this.page = Page
    }
    public async clickWithLog(locator: Locator, option?: Parameters<Locator['click']>[0]){
        const buttonName = await this.getNameButton(locator)
        console.log(`[Click] ${buttonName}`);
        await locator.click(option)
    }
    public async fillWithLog(locator: Locator, value: string, option?: {sensitive: boolean, fillOption: Parameters<Locator['fill']>[1]}){
        const valueInput:string = option?.sensitive ? '*****':value
        const nameFillBox = await this.getNameButton(locator)
        console.log(`[Fill] ${nameFillBox}: ${valueInput}`);
        await locator.fill(valueInput, option?.fillOption)
    }
    private async getNameButton(locator: Locator): Promise<string>{
        let text:string = ''
        try {
            text = await locator.innerText()
            text = text.trim()
        }
        catch{
            const textContent = await locator.textContent()
            text = textContent?.trim() || ''
        }
        text = text.charAt(0).toUpperCase() + text.slice(1)
        return text
    }
    private async getNameFillBox(locator: Locator): Promise<string>{
        let fillBoxName: string = ''
        try {
            const name = await locator.locator('xpath=./parent::div').getAttribute('name')
            fillBoxName = name?.trim() || ''
        }
        catch{
            const type = await locator.getAttribute('type')
            fillBoxName = type?.trim() || ''
        }
        fillBoxName = fillBoxName.charAt(0).toUpperCase() + fillBoxName.slice(1)
        return fillBoxName
    }
    public getLocator<T extends Record<string, string | ((page: Page) => Locator )>>(
        locatorList: T): (key: keyof T) => Locator{
            return (keyLocator: keyof T): Locator => {
                if (typeof locatorList[keyLocator] === 'string' ){
                    return this.page.locator(locatorList[keyLocator])
                }
                else {
                    return locatorList[keyLocator](this.page)
                }
            }
    }
    abstract isOnPage():Promise<void>
}