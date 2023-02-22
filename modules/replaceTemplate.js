module.exports = (temp, product) =>{
    let output = temp.replace('{%PRODUCTNAME%}', product.productName)
    output = output.replace('{%FROM%}', product.from);
    output = output.replace('{%IMAGE%}', product.image);
    output = output.replace('{%PRICE%}', product.price);
    output = output.replace('{%NUTRIENTS%}', product.nutrients);
    output = output.replace('{%QUANTITY%}', product.quantity);
    output = output.replace('{%DESCRIPTION%}', product.description);
    output = output.replace('{%ID%}', product.id);
    
    if(!product.organic) output = output.replace('{%NOT_ORGANIC%}', 'not-organic');
    return output;
}