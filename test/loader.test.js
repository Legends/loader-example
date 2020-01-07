import compiler from './compiler';

 

// to execute only this test, replace the function name "test" to "test.only"
// this skips only tests in this file not others!
test('Inserts name and outputs JavaScript', async () => {
    const options = { name: 'Alice!' };
    const stats = await compiler('example.txt', options);
    const output = stats.toJson().modules[0].source;

    expect(output).toBe(`export default "Hey ${options.name}"`);
});

test('Inserts custom options', async () => {
    const options = { name: 'was geht ab' };
    const stats = await compiler('example.txt', options);
    const output = stats.toJson().modules[0].source;

    expect(output).toBe(`export default "Hey ${options.name}"`);
});