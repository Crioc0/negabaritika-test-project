function task1() {
    const { name, ...details } = { name: "Alex", age: 30, city: "Berlin" };
    console.log(name);
    console.log(details)
}
function task2() {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const mergedObj = { ...obj1, ...obj2 }
    console.log(mergedObj)
}

function task3() {
    const data = 'Промис'
    function fetchData(data) {
        return new Promise((resolve, reject) => {
            if (true) {
                resolve(data)
            } else {
                reject(new Error('Ошибка'))
            }
        })
    }
    fetchData(data)
        .then(data => console.log(data))
        .catch(err => console.error(err)).finally(() => console.log('done'))
}

function task4() {
    const url1 = "https://jsonplaceholder.typicode.com/posts/1";
    const url2 = "https://jsonplaceholder.typicode.com/posts/2";
    const promises = [fetch(url1), fetch(url2)];

    async function processPromises(promises) {
        for await (const response of promises) {
            try {
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Ошибка при обработке промиса:", error);
            }
        }
    }
    processPromises(promises);
}

function task5() {
    const dateStr = "2023-05-15";
    const { year, month, day } = dateStr.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/).groups;
    console.log(year, month, day);
}
function task6() {
    const text = "Price: $200";
    const match = text.match(/\$(\d+)/)[1]
    console.log(match);
}


function task7() {
    const text = "Start\nLine1\nLine2\nEnd";
    const match = text.match(/Start([\s\S]*?)End/s);
    console.log('Задание ', match[1])
}

function task8() {
    const name = "alex";
    function upper(string, ...values) {
        return string.map((str, i) => str + (values[i] ? values[i].toUpperCase() : '')).join('')
    }
    console.log(upper`Hello ${name}`);
}


function task9() {
    const src = { get id() { return 1 } };
    const target = {};
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(src))
    console.log(target.id)
}


function task10() {
    const str = " Hello???";
    const match = str.trim().replace(/\?+/g, '');
    console.log(match)
}
task1()
task2()
task3()
task4()
task5()
task6()
task7()
task8()
task9()
task10()