import { Locator, expect, test as setup } from "@playwright/test";

setup('User đã login vào app', async({page, context}) => {
    await page.goto('https://dev-web.payd.vn/')
    await expect(page.getByRole('link', {name: 'Sign In Now'})).toBeVisible()
    await page.getByRole('link', {name: 'Sign In Now'}).click()
    await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible()
    await page.locator('input#_r_3n_').fill('bpmtuan8@gmail.com')
    await page.getByRole('button', {name: 'Continue'}).click()
    await expect(page.getByRole('heading', {name: 'Enter unlock code (PIN)'})).toBeVisible()
    await page.locator('//input[@inputmode="numeric"]').click()
    await page.locator('//input[@inputmode="numeric"]').pressSequentially('222222')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('button', {name: 'USDT'})).toBeVisible()

    // Lưu storageState
    await context.storageState({path: './auth/user.json'})
    console.log('User đăng nhập thành công');
} )