import { appFixture, AppFixtureList } from './app.fixture'
import { AuthFixture, auth } from './auth.fixture'

export const test = auth.extend<appFixture>({
    ...AppFixtureList
})

export {expect} from '@playwright/test'