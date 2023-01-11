// Declaration
let ddlcategorys= document.getElementById('ddlcategory');
let product= document.getElementById('product');
let quntity= document.getElementById('quntity');
let price= document.getElementById('price');
let discount= document.getElementById('discount');
let total= document.getElementById('total');

let btnSave =document.getElementById('btnSave');
let btnResetPro=document.getElementById('btnResetPro')
let bodyProduct=document.getElementById('bodyProduct')
let countpro=document.getElementById('countpro')

let UrlProducts = 'http://192.168.16.101/api/products'


let lbcate=document.getElementById('lbcate');
let lbProduct=document.getElementById('lbProduct');
let lbqutity=document.getElementById('lbqutity');
let lbPrice=document.getElementById('lbPrice');
let lbDescount=document.getElementById('lbDescount');


let btnStatue="Create";
let proId;


//GetTotal 

GetTotal=()=>{
    if (price.value!=0) {
        
        let getTotal = (quntity.value * price.value) - discount.value;
        total.value=getTotal;
        total.className.replace='form-control bg-danger text-center';
        total.className='form-control bg-success text-center';
    }
    else
    {
        total.value=0;
        total.className.replace='form-control bg-success text-center';
        total.className='form-control bg-danger text-center';

    }

 

};


//Save 
SaveProduct=()=>{
    let objProduct={
        categoryId: ddlcategorys.value,
        name:product.value,
        quntity: quntity.value,
        price:price.value,
        discount:discount.value,
        total: total.value
    };
let data = JSON.stringify(objProduct);

if (ValidationProduct()==false)
    return;

if(btnStatue=="Create"){
    Helper.AjaxCallPost(`${UrlProducts}/Save`, data, (data)=>{

        if(data!=null)
        {

            toastr.success('Saved New Product','Successfuly')
            RestProduct();
            // ShowTableProducts();
            showTableProducts.ajax.reload();
            CountProduct();

        }
        else{
            toastr.error('Not Save The Product' ,'ERROR')
        }

    });
}

else
{
    Helper.AjaxCallPut(`${UrlProducts}/Edit/${proId}`, data, (data)=>{

        if(data!=null)
        {

            toastr.warning('Saved Update Of Product','Successfuly')
            RestProduct();
            ShowTableProducts();
            CountProduct();
            btnSave.className.replace='btn btn-primary w-25';
            btnSave.className='btn btn-success w-25';

        }
        else{
            toastr.error('Not Save The Product' ,'ERROR')
        }

    });

}


  

};

//Reset
RestProduct =()=>{
    ddlcategorys.value='';
    product.value='';
    quntity.value='';
    price.value='';
    discount.value='';
    total.value='';

    total.className.replace='form-control bg-success text-center';
    total.className='form-control bg-danger text-center';

};




//Show TAble
{
// ShowTableProducts=()=>{
//     let Table ='';

//     Helper.AjaxCallGet(`${UrlProducts}/GetAll`, (data)=>{
//         data.forEach(element => {
//                 Table+=
//                         `<tr>
//                                 <td class="col-1">${element.id}</td>
//                                 <td class="col-2">${element.category.name}</td>
//                                 <td class="col-2">${element.name}</td>
//                                 <td class="col-2">${element.quntity}</td>
//                                 <td class="col-1">${element.price}</td>
//                                 <td class="col-1">${element.discount}</td>
//                                 <td class="col-1">${element.total}</td>
//                                 <td class="col-2">
                                
//                                 <button class="btn btn-info" onclick="EditProduct(${element.id})">
//                                     <i class="fas fa-edit"></i>
//                                 </button>

//                                 <button class="btn btn-danger" onclick="DeleteProduct(${element.id})">
//                                     <i class="fas fa-trash"></i>
//                                 </button>

//                                 </td>

//                         </tr>`
            
//         });

//         bodyProduct.innerHTML=Table;


//     });
// };
}




//Count

CountProduct=()=>{
    Helper.AjaxCallGet(`${UrlProducts}/GetAll`,(data)=>{
        if (data!=null) {
            countpro.innerHTML=`- Total Of Products (${data.length})`
        }
    })
}


// Edit

EditProduct=(id)=>{

    Helper.AjaxCallGet(`${UrlProducts}/GetById/${id}`,(data)=>{

        if(data!=null){

        ddlcategorys.value= data.categoryId;
        product.value=data.name;
        quntity.value=data.quntity;
        price.value=data.price;
        discount.value=data.discount;
        total.value=data.total;

        btnSave.className.replace='btn btn-success w-25';
        btnSave.className='btn btn-primary w-25';
        btnStatue="Edit";
        proId=id;

        }
    })

};








// Delete
DeleteProduct=(id)=>{

    if(confirm(`Are You Sure From Deleted This Product .......? `)==true)
    {
    Helper.AjaxCallDelete(`${UrlProducts}/DeleteProduct/${id}`,(data)=>{
        if (data!=null) {
            // ShowTableProducts();
            showTableProducts.ajax.reload();
            CountProduct();

            toastr.error('Success Delete For The Product ','Deleted Successfully');
            
        }




    });
};

};



//Validation 

ValidationProduct=()=>{
    let isValid=true;
    //Category
if (ddlcategorys.value=="")
{
        lbcate.innerHTML='Category : [Required]';
        lbcate.style.color='red';
        isValid=false;
}
else{
    lbcate.innerHTML='Category :';
        lbcate.style.color='white';
        isValid=true;
}

//product

if (product.value=='') 
{
    lbProduct.innerHTML='Product Name : [Required]';
    lbProduct.style.color='red';
    isValid=false;
}
else if (!isNaN(product.value))
 {
    lbProduct.innerHTML='Product Name: [Not Number]';
    lbProduct.style.color='red';
    isValid=false;
} 
else
{
    lbProduct.innerHTML='Product Name : ';
    lbProduct.style.color='white';
    isValid=true;
}

// Qauntity

if ( quntity.value == ''|| quntity.value==0 ) 
{
    lbqutity.innerHTML='Quantity:[Required]';
    lbqutity.style.color='red';
    isValid=false;
}
else if (isNaN(quntity.value))
 {
    lbqutity.innerHTML='Quantity:[Only Numbers]';
    lbqutity.style.color='red';
    isValid=false;
 } 
else
{
    lbqutity.innerHTML='Quantity: ';
    lbqutity.style.color='white';
    isValid=true;
}

// Price
if ( price.value=='' || price.value==0 ) 
{
    lbPrice.innerHTML='Price:[Required]';
    lbPrice.style.color='red';
    isValid=false;
}
else if (isNaN(price.value))
 {
    lbPrice.innerHTML='Price:[Only Numbers]';
    lbPrice.style.color='red';
    isValid=false;
 } 
else
{
    lbPrice.innerHTML='Price: ';
    lbPrice.style.color='white';
    isValid=true;
}

//Discount
if ( discount.value=='' ) 
{
    lbDescount.innerHTML='discount:[Enter 0]';
    lbDescount.style.color='red';
    isValid=false;
}
else if (isNaN(discount.value))
 {
    lbDescount.innerHTML='discount:[Only Numbers]';
    lbDescount.style.color='red';
    isValid=false;
 } 
else
{
    lbDescount.innerHTML='discount:';
    lbDescount.style.color='white';
    isValid=true;
}

return isValid;


};





// Print











// RunTime
price.addEventListener('keyup',GetTotal);
discount.addEventListener('keyup',GetTotal);
quntity.addEventListener('keyup',GetTotal);
btnSave.addEventListener('click',SaveProduct)
btnResetPro.addEventListener('click',RestProduct)
RestProduct();
// ShowTableProducts();

$(document).ready(()=>{
    CountProduct();
    showTableProducts.ajax.reload();
})