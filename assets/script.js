$(function () {
    let coinsVal = $('#coins');


    const coinsNamesArray = coinsArray.map(function (item) {
        return item.name;
    });

    //autocomplete form dropdown
    $("#coins").autocomplete({
        source: coinsNamesArray
    });

    //handle coin form submission
    $('#coin-select').submit((e) => {
        e.preventDefault();
        let coinId = findItemId(coinsVal.val());
        console.log(coinId);
        coinsVal.val('');
        coinObj = getCoinData(coinId)
        console.log(coinObj.val())
    });

    //handle currency form submission
    $('#currency-select').submit((e) => {
        e.preventDefault();
        let selectedCurrency = $('#currencies').val();
        saveVsCurrency(selectedCurrency);
    })

    //captures submission ID
    const findItemId = function (chosenItem) {
        const objectSelected = coinsArray.find(function (arrayItem) {
            return arrayItem.name === chosenItem;
        });
        return objectSelected.id;
    }

    //get coin market data
    function getCoinData(chosenCoinID) {
        let apiURL = `https://api.coingecko.com/api/v3/coins/${chosenCoinID}`
        fetch(apiURL)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    //get supported vs currencies
    function getCurrencyOptions() {
        let apiURL = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                $('#currencies').autocomplete({
                    source: data
                });
            });
    };

    //get seven trending currencies
    function getTrendingCurrency() {
        let apiURL = 'https://api.coingecko.com/api/v3/search/trending'
        fetch(apiURL)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    function saveVsCurrency(VsChoice) {
        localStorage.setItem('VsCurrency', VsChoice)
    }

    getTrendingCurrency();
    getCurrencyOptions();
});