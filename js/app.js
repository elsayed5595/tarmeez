 
let postcontainer = document.querySelector('#posts');
let datPost = "";
let btnLogin = document.querySelector('#btn-login');
let btnRegister=document.querySelector('#btn-register');
let page=1;
let isFetching = false; 
let  Usertoken=JSON.parse(localStorage.getItem("user"))
let profile=document.querySelector('.Profile');
 
 // get Value scroll user 
window.addEventListener("scroll", async function (){
    const endPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
     if (endPage && !isFetching){
        isFetching = true;
        await fetchData(page += 2);
        isFetching = false;
    }
});


// get data
 
    async function fetchData(page) {
        const link = `https://tarmeezacademy.com/api/v1/posts?page=${page}&limit=100`; 
        try {
            const respons = await axios.get(link);
     
        datPost = respons.data.data;
       
        localStorage.setItem("datPostobj",JSON.stringify(datPost));
        let fragment = document.createDocumentFragment();
        postTitle = "";        
        let  Usertoken=localStorage.setItem("Usertoken",datPost)
        for (let i = 0; i < datPost.length; i++) {
        
             if (datPost[i].title == null) {
                datPost[i].title = postTitle;
            }
    // استرجاع بيانات المستخدم
const user = JSON.parse(localStorage.getItem("user"));

if (user && user.id === datPost[i].author.id) {
     buttonEdit = `<button class="btn btn-secondary btn-sm EditButton"  onclick="postclickid('${encodeURIComponent(JSON.stringify(datPost[i]))}')">Edit</button>`;
    deletBtn=`<button class="btn btn-danger  btn-sm deleteButton ms-2"onclick="deletepost(${datPost[i].id})" >Delete</button>`
} else {
    buttonEdit = "";
    deletBtn="";
}


                 let postHtml = `
    <div class="card shadow-sm my-4" style="cursor: pointer;" >
        <div class="card-header d-flex justify-content-between">
           
        <div class="author d-flex align-items-center"  onclick="getdataAuthor(${datPost[i].author.id})">
            <img src="${datPost[i].author.profile_image}" alt="" class="rounded-circle border border-2">
            <span class="author fw-bold">${datPost[i].author.name}</span>    
              </div>   
                   
                 <div class="d-flex ms-sm-2"> 
                ${buttonEdit}
                ${deletBtn}
                 </div>
        
        </div>
        <div class="card-body" data-post-id="${datPost[i].id}">
            <img src="${datPost[i].image}" alt="" class="w-100">en
            <h6 class="text-secondary mt-1">${datPost[i].created_at}</h6>
            <h5>${datPost[i].title}</h5>
            <p>${datPost[i].body}</p>
            <hr>
            <div>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg>
                    (${datPost[i].comments_count}) تعليقات
                </span>
            </div>
        </div>
    </div>
`;


            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = postHtml;
            fragment.appendChild(tempDiv.firstElementChild);
 
        }
 
        postcontainer.appendChild(fragment);
        
        
    } catch (error) {
        console.log(error);
        alert("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى لاحقًا.");
    }
}

 
fetchData();
 
const buttonLogin = document.getElementById('login');
const buttonRegister = document.getElementById('Register');
const  logout=document.getElementById('logout');
const newPost= document.querySelector('.newPost');
const imgeprofilediv=document.querySelector('.imgeprofilediv');
const imgeuserprofile=document.querySelector('.imgeuserprofile');

// checked user token and set up ui
  function  setupUI() {
    if (localStorage.getItem("token") == null) {
        buttonLogin.style.display = "block";
        buttonRegister.style.display = "block";
        logout.style.display = "none";
        imgeprofilediv.style.visibility ="hidden"; 
        newPost.style.display = "none";
    } else {
        buttonLogin.style.display = "none";
        buttonRegister.style.display = "none";
        logout.style.display= "inline-block";
        imgeprofilediv.style.visibility ="visible";
        newPost.style.display = "inline-block";
        //get data user on localStorage
         const user = JSON.parse(localStorage.getItem("user"));
         const userName=document.querySelector('.userName');
        if (user && user.profile_image ) {
            imgeuserprofile.src = user.profile_image;
            userName.innerHTML=user.username;
        } 
            
        
    }
  
}

 // login requset
btnLogin.addEventListener("click", () => {
    let user = document.querySelector('.username').value;
    let pass = document.querySelector('.password').value;
    const body = {
        "username": user,
        "password": pass
    }
    axios.post("https://tarmeezacademy.com/api/v1/login", body)
        .then((response) => {
        
            //push data to local  localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
         
  
                        
          
          //remove model 
            const modal = document.getElementById('exampleModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide(); 
       
                appendAlert("You have successfully logged ","success");
           // remove alert Msg  login
            setTimeout(() => {
                alertPlaceholder.innerHTML="";
            },1500);
           
            setupUI();
         
        })
        .catch((error) => {
            console.log(error.response.data);
            alert("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى لاحقًا.",alert);
        });
   
});

 setupUI();
 
  //alert login user 
 
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert ">`,
            `   <div class="text-center"><h5>${message}<h5/></div>`,
         
            '</div>'
        ].join('');
    
        alertPlaceholder.append(wrapper);
    }
 
 
 // logout user
const alertContainer=document.getElementById('alertContainer');
logout.addEventListener("click", () => {
 //remove data to localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setupUI()
    //Msg log Out 
    appendAlert("You have successfully logged out","success");
 // remove alert Msg  log Out 
    setTimeout(() => {
        alertPlaceholder.innerHTML = "";
    }, 2000);
});



// request Register
btnRegister.addEventListener("click", () => {
    const imgProfile=document.getElementById('img-profile').files[0];
    const  userName = document.querySelector('#register-username').value;
    const   password=document.querySelector('#register-password').value
    const  registerName=document.querySelector('#register-name').value
 
    if (!userName || !password || !registerName) {
        alert("يرجى ملء جميع الحقول.");
        return;
    }
const formDataRegister=new FormData();
formDataRegister.append("image",imgProfile); 
formDataRegister.append("username",userName);
formDataRegister.append( "password",password);
formDataRegister.append("name",registerName);
  

axios.post("https://tarmeezacademy.com/api/v1/register",formDataRegister)
.then((response) => {
 
    //push data to local  localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  //remove model 
    const  registerModal = document.getElementById('registerModal');
    const modalInstanceRegister = bootstrap.Modal.getInstance(registerModal);
    modalInstanceRegister.hide(); 
    appendAlert("New user registered successfully","success");
setTimeout(() => {
    alertPlaceholder.innerHTML="";
},2000);
 
    setupUI();
})
.catch((error) => {
 alert(error.response.data.message )
});

});

 // remove all data 
function removeValue() {
    document.querySelector('.title').value = "";   
    document.querySelector('.postbody').value = "";   
    document.querySelector('#file').value = "";   
}

// create new post
let BtnNewPost=document.querySelector('.BtnNewPost');

if(BtnNewPost ){
BtnNewPost.addEventListener("click", () => {
    let idPostEdit=document.getElementById('idPostEdit').value;
     statuIdPost=idPostEdit==null ||idPostEdit=="" ;
 
    // get values for the new post
    const title = document.querySelector('.title').value;
    const postbody = document.querySelector('.postbody').value;
    const image = document.querySelector('#file').files[0];
    const tokenUsre = localStorage.getItem("token");

    // new form data
    let formData = new FormData();

    // append values to form data
    formData.append("title", title);
    formData.append("body", postbody);
    formData.append("image", image);
    link="";
      if(statuIdPost){
        link=`https://tarmeezacademy.com/api/v1/posts`;
        axios.post(link, formData, {
            headers: {
                "Authorization": `Bearer ${tokenUsre}`,
                "Content-Type": "multipart/form-data",
            }
        })
        .then(function (response) {
           
            
            // Close modal after creating post
            const moadelCreatPost = document.getElementById('postModal');
            const postModal = bootstrap.Modal.getInstance(moadelCreatPost);
            postModal.hide();
            document.querySelector('.modal-backdrop').remove(); // إزالة الطبقة الخلفية
            // Alert for successful post creation
            appendAlert("New Post Has Been Created", "success");
    
            // Remove alert message after 2 seconds and update the UI
            setTimeout(() => {
                alertPlaceholder.innerHTML = "";
                setupUI();
                 window.location.reload();
                // Empty the form fields after success
                removeValue();
            }, 2000);
        })
        .catch(function (error) {
          
            alert(error.response.data.message,"danger");
        });
      }else{
        formData.append("_method","put")
        link=`https://tarmeezacademy.com/api/v1/posts/${idPostEdit}`;
        axios.post(link, formData, {
            headers: {
                "Authorization": `Bearer ${tokenUsre}`,
                "Content-Type": "multipart/form-data",
            }
        })
        .then(function (response) {
            // Close modal after creating post
            const moadelCreatPost = document.getElementById('postModal');
            const postModal = bootstrap.Modal.getInstance(moadelCreatPost);
            postModal.hide();
    
            // Alert for successful post creation
            appendAlert("Edit Post Has Been Created", "success");
    
            // Remove alert message after 2 seconds and update the UI
            setTimeout(() => {
                alertPlaceholder.innerHTML = "";
                setupUI();
                
                // Fetch new posts
                fetchData();
    
                // Empty the form fields after success
                removeValue();
            }, 2000);
           window.location.reload();
        })
        .catch(function (error) {
          
            alert(error.response.data.message,"danger");
        });
      }

});
}
 
//clicked now go to postDetails location
const postUserContainer = document.querySelector('#posts');

if (postUserContainer) {
    postUserContainer.addEventListener("click", function(event) { 
        let card = event.target.closest('.card-body');   
        
        if (card) {  
            let postId = card.getAttribute("data-post-id");
            localStorage.setItem("postid", postId);

            if (localStorage.getItem("postid") != null)  {
                window.location.href = '../html/post Details.html';
            }
        }
    });
}

// click btn edit post 

newPost.addEventListener('click',()=>{
    openModal("create")
})



function postclickid(data) {
 
    try {
        let postDetails = JSON.parse(decodeURIComponent(data));
        let EditButton = document.querySelector('.EditButton');
   
        if (EditButton) {
 
            openModal("edit",  postDetails);
            let postModel = new bootstrap.Modal(document.getElementById('postModal'));
            postModel.show(); 
          let idPostEdit=document.getElementById('idPostEdit').value=postDetails.id;
     
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }

};
 
//test mode Button moadel
function openModal(mode, postData) {
    let modalTitle = document.getElementById('createPostModalLabel');

    if (mode === "create") {
        modalTitle.innerText = "Create New Post";
        document.querySelector('.title').value = "";
        document.querySelector('.postbody').value = "";
        document.querySelector('.BtnNewPost').textContent = "Create New Post";
    } else if (mode === "edit" && postData) {
        modalTitle.innerText = "Edit Post";
        document.querySelector('.title').value = postData.title;
        document.querySelector('.postbody').value = postData.body;
        document.querySelector('.BtnNewPost').textContent = "Edit Post";
    }

    const postModal = new bootstrap.Modal(document.getElementById('postModal'));
    postModal.show();
};

//remove over lay Background in close modal
function closeModal() {
    const postModal = bootstrap.Modal.getInstance(document.getElementById('postModal'));
    postModal.hide();
};

 function deletepost(id){
let idPost=id;
const tokenUsre=localStorage.getItem("token");
if(idPost){
    link=`https://tarmeezacademy.com/api/v1/posts/${idPost}`;
    axios.delete(link,{
        headers: {
            "Authorization": `Bearer ${tokenUsre}`,
            
        }
    })
    .then((response)=> {
   window.location.reload();
    })
    .catch((error)=> {
      console.log(error);
        appendAlert(error.response.data.message,"danger");
    });
    }
    
};
let navcontent = document.querySelector('.nav-content');
let themeIcon = document.querySelector('.theme-icon'); 
let newpost = document.querySelector('.newPost');
let svg = document.querySelector('.newPost svg');

// Function to toggle between light and dark themes
function toggleTheme() {
    let currentTheme = document.documentElement.getAttribute('data-bs-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Update the theme attribute on the HTML element
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    // Save the new theme in localStorage
    localStorage.setItem("mood", newTheme);

    // Apply the appropriate background and text colors based on the new theme
    if (newTheme === 'dark') {
        document.body.classList.add('dark-mode');
        navcontent.classList.add('navbar-dark-mode');
        navcontent.classList.remove('navbar-light');
        themeIcon.classList.add('fa-sun');  
        themeIcon.classList.remove('fa-moon');
        newpost.classList.add('newPostDrak');
    } else {
        document.body.classList.remove('dark-mode');
        navcontent.classList.add('navbar-light');
        navcontent.classList.remove('navbar-dark-mode');
        themeIcon.classList.add('fa-moon');  
        themeIcon.classList.remove('fa-sun');
        newpost.classList.remove('newPostDrak');
    }
}

// Event listener to load the saved theme when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.Home').classList.add('active');
    const savedTheme = localStorage.getItem("mood") || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    // Apply the appropriate background and text colors based on the saved theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        navcontent.classList.add('navbar-dark-mode');
        navcontent.classList.remove('navbar-light');
        themeIcon.classList.add('fa-sun');  
        themeIcon.classList.remove('fa-moon');
        newpost.classList.add('newPostDrak');
    } else {
        document.body.classList.remove('dark-mode');
        navcontent.classList.add('navbar-light');
        navcontent.classList.remove('navbar-dark-mode');
        themeIcon.classList.add('fa-moon');  
        themeIcon.classList.remove('fa-sun');
        newpost.classList.remove('newPostDrak'); 
    }
});

// close model overFlow
document.addEventListener('hidden.bs.modal', function (event) {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.remove();
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
});

// get data author

let user = JSON.parse(localStorage.getItem("user"));  
profile.addEventListener('click', () => {
    profile.classList.add('active');
    document.querySelector('.Home').classList.remove('active');
    localStorage.setItem("idAuthor",user.id);
     window.location.href="../html/profile.html"
});

 
   function getdataAuthor(id){
    localStorage.setItem("idAuthor",id);
    if(localStorage.getItem("idAuthor")!=null){
      window.location.href="../html/profile.html"
     }
    }
 
 
    function showLoader() {
        document.getElementById('loader').style.display = 'block';
      }
      function hideLoader() {
        document.getElementById('loader').style.display = 'none';
      };
      
      // Example: Show loader when Create Post button is clicked
      postUserContainer.addEventListener('click', () => {
        showLoader();
        setTimeout(hideLoader, 2000); // Simulate a delay for demonstration
      });
      
      document.querySelector('.Profile').addEventListener('click', () => {
        showLoader();
        setTimeout(hideLoader, 2000); // Simulate a delay for demonstration
      });
      
      document.querySelector('.Home').addEventListener('click', () => {
        showLoader();
        homeLocation()
        setTimeout(hideLoader, 2000); // Simulate a delay for demonstration
      });
      
       