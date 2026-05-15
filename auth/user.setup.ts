import { Locator, expect, test as setup } from "@playwright/test";

setup('User đã login vào app', async({page, context}) => {
    await page.goto('https://dev-web.payd.vn/')
    await expect(page.getByRole('link', {name: 'Tạo tài khoản'})).toBeVisible()
    await page.getByRole('link', {name: 'Đăng nhập ngay'}).click()
    await expect(page.getByRole('heading', {name: 'Đăng nhập'})).toBeVisible()
    await page.locator('input#_r_3n_').fill('bpmtuan8@gmail.com')
    await expect(page.getByRole('heading', {name: 'Nhập mã mở khóa (PIN)'})).toBeVisible()
    await page.locator('//input[@inputmode="numeric"]').click()
    await page.locator('//input[@inputmode="numeric"]').pressSequentially('222222')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('button', {name: 'USDT'})).toBeVisible()

    // Lưu storageState
    await context.storageState({path: './auth/user.json'})
    console.log('User đăng nhập thành công');
} )