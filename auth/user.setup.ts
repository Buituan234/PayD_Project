import { Locator, expect, test as setup } from "@playwright/test";

setup('User đã login vào app', async({page, context}) => {
    await page.goto('https://coffee.autoneko.com/login')
    await expect(page.getByRole('heading', {name: 'Chào mừng trở lại'})).toBeVisible()
    await page.getByRole('textbox', {name: 'Email hoặc Tên đăng nhập person'}).fill('admin')
    await page.locator('input[data-testid="login-input-password"]').fill('Admin@123')
    await page.locator('button[data-testid="login-button-submit"]').click()
    await expect(page.getByRole('heading', {name: 'Thành công!'})).toBeVisible()

    await page.context().storageState({path: './auth/user.json'})
    console.log('Cookie đã được lưu vào admin json');
} )