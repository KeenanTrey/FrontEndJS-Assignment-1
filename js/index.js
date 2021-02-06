window.addEventListener("load", function(e) {
    const baseURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&apikey=6OW78JBH84PRLQDP&symbol='

    

    async function getData(symbol)
    {
        let url = baseURL + symbol
        const req = await fetch(url)
        const res = await req.json()
        return res
    }

     document.forms.search.addEventListener('submit', function(e) {
         e.preventDefault()
         const res = getData(e.currentTarget.elements.searchTerm.value)
         

         res.then(res => {
             
             
             //pull out data for list
             
             if(res['Error Message'])
             {
                const errTemplate =   `<p>Can't find stock quote</p>`
                document.querySelector('.results').innerHTML = errTemplate
             }
             else
             {
                let data = Object.values(res['Time Series (Daily)'])[0]
                const successTemplate =   `
                <ul>
                    <li>${res['Meta Data']['2. Symbol']}</li>
                    <li>Date: ${res['Meta Data']['3. Last Refreshed']}</li>
                    <li>High Price: <span>$${data['1. open']}</span></li>
                    <li>Low Price: <span>$${data['3. low']}</span></li>
                    <li>Closing Price: <span>$${data['4. close']}</span></li>
                    <li>Split Coefficient: <span>$${data['8. split coefficient']}</span></li>
                </ul>`
                document.querySelector('.results').innerHTML = successTemplate

                console.log(successTemplate)

                
             }
         })
     })
    

    
})