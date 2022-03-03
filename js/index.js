const loadData = (searchText) => {
    document.getElementById('error-message').style.display = 'none'
    document.getElementById('display-phone').style.display = 'flex'
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status !== false) {
                displayPhone(data.data)
            }
            else {
                document.getElementById('error-message').innerHTML = `Nothing found for your search <b>'${searchText}'</b>`
                document.getElementById('error-message').style.display = 'block'
                document.getElementById('display-phone').style.display = 'none'
            }
        })

}

const searchText = () => {
    const search = document.getElementById('search-text');
    const searchText = search.value;
    const searchLower = search.value.toLowerCase();
    document.getElementById('phone-info').textContent = '';

    if (searchText == '') {
        document.getElementById('error-message').innerText = 'Please search a phone model name'
        document.getElementById('error-message').style.display = 'block'
        document.getElementById('display-phone').style.display = 'none'
    }
    else {
        loadData(searchLower);
        search.value = ''
    }
}

document.getElementById('search-button').addEventListener('click', searchText)

const displayPhone = (phones) => {
    const display = document.getElementById('display-phone')
    display.textContent = "";
    const slicedPhones = phones.slice(0, 20);
    for (const phone of slicedPhones) {
        const col = document.createElement('div')
        col.classList.add('col-12', 'col-md-6', 'col-lg-4')
        col.innerHTML = `
        <div class="card mb-4 border-0 text-center shadow  mx-auto ">
            <img width="150" height="220" class=" mx-auto pt-3 rounded-2" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body pb-0 px-0">
                <h5 class="card-title">${phone.phone_name}</h5>
                <a href="#" onclick="loadDetails('${phone.slug}')" class=" text-decoration-none fw-bold btn w-100 py-3 fs-5">Details</a>

            </div>
        </div>
        `
        display.appendChild(col);
    }
}

const loadDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(callId => phoneDetails(callId.data))
}

const phoneDetails = id => {
    document.getElementById('phone-info').textContent = '';
    const sensorId = id.mainFeatures.sensors;
    console.log(sensorId)

    const phoneInfo = document.createElement('div');
    phoneInfo.classList.add('text-center', 'm-width', 'row', 'mb-5', 'mx-auto','align-items-center');
    phoneInfo.innerHTML = `
            <div class='col-12 col-md-6 col-lg-4 mb-3'>
                <img src="${id.image}" alt="" width = '250' height="300" class="mb-1">
                <h4 class="mt-2 mb-1">${id.name}</h4>
                <p class="mb-0">Release Date:</p><span>${id.releaseDate ? id.releaseDate : "Coming soon"}</span>
                <p class="mb-0"><b>${id.brand}</b></p>
            </div>
            <div class='text-start m-width mx-auto col-12 col-md-6 col-lg-4'>
                <b class="text-danger fs-5">Main Features:</b> <br>
                <b>SoC:</b> <span class="text-secondary">${id.mainFeatures.chipSet}</span><br>
                <b>Display:</b> <span class="text-secondary">${id.mainFeatures.displaySize}</span><br>
                <b>Memory:</b> <span class="text-secondary">${id.mainFeatures.memory}</span><br>
                <b>Storage:</b> <span class="text-secondary">${id.mainFeatures.storage}</span><br>
                <div class="sensor-width">
                <b>Sensors:</b> <p class="text-secondary ">${sensorId[0]?sensorId[0]:''}   ${sensorId[1]?sensorId[1]:''}   ${sensorId[2]?sensorId[2]:''}   ${sensorId[3]?sensorId[3]:''}   ${sensorId[4]?sensorId[4]:''}   ${sensorId[5]?sensorId[5]:''}   ${sensorId[6]?sensorId[6]:''}  </p>
                </div>
                <b class="text-danger fs-5">Others:</b> <br>
                <b>Bluetooth:</b> ${id.others ? id.others.Bluetooth : 'No Data Found'};<br>
                <b>GPS:</b> ${id.others ? id.others.GPS : 'No Data Found'};<br>
                <b>NFC:</b> ${id.others ? id.others.NFC : 'No Data Found'};<br>
                <b>Radio:</b> ${id.others ? id.others.Radio : 'No Data Found'};<br>
                <b>USB:</b> ${id.others ? id.others.USB : 'No Data Found'};<br>
                <b>WLAN:</b> ${id.others ? id.others.WLAN : 'No Data Found'};<br>
            </div>

    `

    document.getElementById('phone-info').appendChild(phoneInfo);
}


