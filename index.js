
const cities = bikeCompanies.networks.reduce((cityName, bikeCompany) => {
    const { location, company } = bikeCompany
    const { city } = location
    const oldCity = cityName[city] || []
    return { ...cityName, [city]: [...oldCity, company] }
}, {})


const countryCode = bikeCompanies.networks.reduce((countries, bikeCompanies) => {
    const { company, location } = bikeCompanies
    const { country, latitude, city, longitude } = location
    const existingCountry = countries[country] || []  /// if country exists, add to it, if not new array
    return { ...countries, [country]: [...existingCountry, { company, city, latitude, longitude, }] }
}, {})

//// city write 
$("#citySelect").html(citySelect(Object.keys(cities))) /// only keys to print
/// write city list
function citySelect(data) {
    return data.map(city => `<option value="${city}"> ${city} </option>`)
}

//// country write 
$("#countryList").html(countriesSelect(Object.keys(countryCode)))
// write country code
function countriesSelect(data) {
    return data.map(country => `<li class="list-group-item list-group-item-action list-group-item-warning" id="${country}"> ${country} </li>`)
}

//// on click of country list
$("#countryList").on("click", function (e) {
    $("#countryInfo").html("")
    countryId = e.target.id
    const newArray = countryCode[countryId]
    newArray.map((country) => {
        $("#countryInfo").append(`<li class='list-group-item list-group-item-action list-group-item-success'> <b>company:</b> ${country.company} <b>city:</b> ${country.city}  <b>latitude:</b> ${country.latitude} <b>longitude:</b> ${country.longitude} </li>`)
    }, [])
})




$("#companies").html(companyList(cities[Object.keys(cities)[0]])) ///  first load, city from cities in place:[Object.keys(cities)[0]] example - companyList(cities["Moscow"])

//// on change of city list, search company
$("#citySelect").on("change", function () {
    $("#companies").html(companyList(cities[this.value]))
})

//// list of companies on change of select
function companyList(city) {
    if (!Array.isArray(city[0])) return `<li> Eroor with city data </li>`
    return city.reduce((list, companyData) => {
        const result = companyData.map(company => `<li> ${company} </li>`)
        // return result.toString("")
        return result.join("")
    }, [])
}
