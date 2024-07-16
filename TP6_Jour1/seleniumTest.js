const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Test form submission
        console.log('Navigating to formulaire.html');
        await driver.get('http://localhost:3000/formulaire.html');
        await driver.findElement(By.id('name')).sendKeys('John Doe');
        await driver.findElement(By.id('email')).sendKeys('john@example.com');
        await driver.findElement(By.id('phone')).sendKeys('0123456789');
        await driver.sleep(2000);
        await driver.findElement(By.id('submit')).click();

        // Wait for the redirect to enroll page
        console.log('Navigating to enroll.html');
        await driver.wait(until.urlIs('http://localhost:3000/enroll.html'), 10000);
        await driver.sleep(2000);

        // Test course enrollment
        console.log('Filling out the course enrollment form');
        await driver.findElement(By.id('mathsDay')).sendKeys("Jour 1");
        await driver.findElement(By.id('mathsTime')).sendKeys("9h - 12h30");
        await driver.findElement(By.id('physicsDay')).sendKeys('Jour 2');
        await driver.findElement(By.id('physicsTime')).sendKeys('12h30 - 17h');
        await driver.findElement(By.id('submit')).click();
        // await driver.findElement(By.id('submit')).click();
        await driver.sleep(2000);

        // Wait for the redirect to courses page
        console.log('Navigating to courses.html');
        await driver.get('http://localhost:3000/courses.html');
        // await driver.wait(until.urlIs('http://localhost:3000/courses.html'), 10000);

        await driver.sleep(1000);

        // Verify the enrolled courses
        console.log('Verifying the enrolled courses');
        let coursesContainer = await driver.findElement(By.id('coursesContainer'));
        let text = await coursesContainer.getText();
        console.log('Courses text:', text);

        // Assert the enrolled courses
        if (!text.includes('maths: Jour 1,Heure: morning', 'physics: Jour 2,Heure: afternoon')) {
            throw new Error(`Expected enrolled course to be 'Maths: Jour 1,Heure: 9h - 12h30', but was '${text}'`);
        }
        console.log('Test passed!');

    } finally {
        await driver.quit();
    }
})();
