const theme = document.querySelector('#theme-input')

theme.addEventListener('change', () => {

    if(!theme.checked) {

        document.querySelector('body').classList = "";
        document.querySelector('body').classList.add('dark-mode');
    } 
    else {
        document.querySelector('body').classList = "";
        document.querySelector('body').classList.add('light-mode');
    }
});

const host = "https://hodlinfo-achitj.herokuapp.com";

const updateData = async () => {

    const data = await (await fetch(`${host}/api/v1`)).json();

    let newTable = "";

    data.forEach((element, index) => {

        newTable += 
`       <tr>
            <td>${index + 1}</td>
            <td>${element.name}</td>
            <td>₹${element.last}</td>
            <td>₹${element.buy} / ₹${element.sell}</td>
            <td>${element.volume}</td>
            <td>${element.base_unit}</td>
        </tr>
`;
    });

    document.querySelector('#table-data').innerHTML = newTable;
}

const updateTimer = async (wait, index) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve();
        }, wait);

    })
}

const timerClock = async () => {

    const timer = document.querySelector('#timer-clock');

    let time = 60;

    for(let index = 0; index < 60; index++) {

        timer.innerText = time;
        await updateTimer(1000, time);

        time--;
    }

    updateDB();
    updateData();
};

const updateDB = async () => {

    const data = await fetch(`${host}/api/v1/updateDatabase`, { method: 'PATCH' });
}

timerClock();
setInterval(timerClock, 61000);
updateData();