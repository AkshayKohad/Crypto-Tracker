const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;


form.addEventListener('submit',(e)=>{

    // to prevent from doing default things
    // In this case we prevent default action of refreshing after submiting the form

    e.preventDefault();

    if(upd)
    {
        clearTimeout(upd);
    }

    // form is variable, elements present in form of name coinType having some value
    const ctype = form.elements.coinType.value;
    const currtype = form.elements.currencyType.value;
    console.log(ctype);

    fetchPrice(ctype,currtype);
})


fetchPrice = async(ctype,currtype)=>{


    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=${currtype}`);
    
    console.log(r);
    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const target = currtype;
    
    
    res.innerHTML = `<tr style = "background-color:blue; color:white; font-weight:700">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>

<tr>
    <td>
        ${base}
    </td>

    <td>
        ${price} ${target}
    </td>
</tr>

<tr>
    <td>
        Volume
    </td>

    <td>
        ${volume}
    </td>
</tr>

<tr>
    <td>
        Change
    </td>

    <td>
        ${change}
    </td>
</tr>`;


upd = setTimeout(()=>fetchPrice(ctype,currtype),10000)
}