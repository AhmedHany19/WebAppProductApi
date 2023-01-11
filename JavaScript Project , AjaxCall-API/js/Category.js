// Declaration


let ddlcategory= document.getElementById('ddlcategory');
let category = document.getElementById('category');
let saveCategory=document.getElementById('saveCategory');
let bodyCategory=document.getElementById('bodyCate');
let countCategory=document.getElementById('countCategory');
let Url = 'http://192.168.16.101/api/categories'

//Save Category

SaveCategory =() => { 

let objCategory ={

    name :category.value

};

if (validation()==false) {
    return ;
}

let data = JSON.stringify(objCategory);

$.ajax({
  url: `${Url}/save`,
  method: "POST",
  contentType: "application/json",
  data: data,
  caches: false,
  success: function (data) {
    RestCategory();
    showCategory();
    showTableCategory();
    countCategories();
toastr.success('Saved New Row Category','Successfuly')
    //alert("Success");
  },
  error: function (err) {
    alert(err);
  },
});

 };


// Rest Categoty

RestCategory =()=>{
    category.value='';
}


// Show Category list

showCategory =()=>{
    let item='';
    item+='<option value="">Select Category ..... </option>';

    $.ajax({
        url:`${Url}/GetAll`,
        method:'GET',
        caches:false,
        success:function(data){
            for(let x in data)
            {
                item+=`<option value="${data[x].id}">${data[x].name} </option>`
            }
            ddlcategory.innerHTML=item;
        }
    })
};



// Show Table Category

showTableCategory=()=>{
  let Table ='';

    $.ajax({
        url:`${Url}/GetAll`,
        method:'GET',
        caches:false,
        success:function(data){
            data.forEach(function(item){
                Table+=
                `
               <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td >
                        <button class="btn btn-danger" onclick="deleteCategory(${item.id})">
                            <i class="fas fa-trash"> </i>
                        </button>
                    </td>
    
                </tr>`
            });

            bodyCategory.innerHTML=Table;

        }
    })

};



// Delete Category

deleteCategory=(id)=>{

    if(confirm('Are You Sure From Deleted .......? ')==true)
    {
        $.ajax({
            url:`${Url}/DeleteCategory/${id}`,
            method:'DELETE',
            caches:false,
            success:function(data){
                showTableCategory();
                showCategory();
                countCategories();
                toastr.error('Success Delete Row Category','Deleted Successfully');
            }
        });
    }


};




//count category 

countCategories=()=>{
    $.ajax({
        url:`${Url}/GetAll`,
        method:'GET',
        caches:false,
        success:function(data){
            countCategory.innerHTML=`Total : (${data.length})`

        }
    })
}



// validation category 
validation=()=>{
let isValid=true;
if (category.value==''|| category.value==null) {
    toastr.warning('Please Enter Category Name ','ERROR VALIDATION');
    return isValid=false;
}
return isValid;
};



// RunTime

saveCategory.addEventListener('click',SaveCategory);
showCategory();
showTableCategory();
countCategories();