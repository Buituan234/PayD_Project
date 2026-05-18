import {PlaywrightTestArgs} from '@playwright/test'
import { HomePage } from '../pom/HomePage'
import { MenuPage } from '../pom/MenuPage'
import { AuthFixture } from './auth.fixture'

export type appFixture = {
    homePage: HomePage,
    menuPage: MenuPage
}

type AppDeps = PlaywrightTestArgs & AuthFixture
export const AppFixtureList = {
    homePage: async ({authedPage}: AppDeps, use: (r: HomePage) => Promise<void>) => {
        const homePage = new HomePage(authedPage)
        await use(homePage)
    },
    menuPage: async ({authedPage}: AppDeps, use: (r: MenuPage) => Promise<void>) => {
        const menuPage = new MenuPage(authedPage)
        await use(menuPage)
    }
}