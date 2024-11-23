
let postcontainer = document.querySelector('#posts');
let datPost = "";
let btnLogin = document.querySelector('#btn-login');
let btnRegister=document.querySelector('#btn-register');
let page=1;
let isFetching = false; 
const addCommentContainer=document.querySelector('.addCommentContainer');
const buttonLogin = document.getElementById('login');
const buttonRegister = document.getElementById('Register');
const  logout=document.getElementById('logout');
const imgeprofilediv=document.querySelector('.imgeprofilediv');
const imgeuserprofile=document.querySelector('.imgeuserprofile');

// checked user token and set up ui
function setupUI() {
    if (localStorage.getItem("token") == null) {
        buttonLogin.style.display = "block";
        buttonRegister.style.display = "block";
        logout.style.display = "none";
       
    } else {
        buttonLogin.style.display = "none";
        buttonRegister.style.display = "none";
        logout.style.display = "inline-block";

          //get data user on localStorage
          const user = JSON.parse(localStorage.getItem("user"));
          const userName=document.querySelector('.userName');
         if (user && user.profile_image ) {
             imgeuserprofile.src = user.profile_image;
             userName.innerHTML=user.username;
         } 
             
         
    }
}
 
               
function checktokenUsre(){
    if(localStorage.getItem("token") == null){
        document.querySelector('.addCommentContainer').style.display='none';

    }else{
        document.querySelector('.addCommentContainer').style.display='block';
    }
}
  //alert show
 
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
            },2000);
           
            setupUI();
         checktokenUsre();
        })
        .catch((error) => {
            console.log(error.response.data);
            alert(error.response.data.message,"success");
        });
   
});

 setupUI();


 
 
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
     checktokenUsre();
 })
 .catch((error) => {
   
   appendAlert(error.response.data.message)
 });
 
 });
 
  // remove all data 
 function removeValue() {
     document.querySelector('#title').value = "";   
     document.querySelector('.postbody').value = "";   
     document.querySelector('#file').value = "";   
 }
 

 // logout user
 const alertContainer=document.getElementById('alertContainer');
 logout.addEventListener("click", () => {
  //remove data to localStorage
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     checktokenUsre();
    
     setupUI();
      
     //Msg log Out 
     appendAlert("You have successfully logged out","success");
  // remove alert Msg  log Out 
     setTimeout(() => {
         alertPlaceholder.innerHTML = "";
     }, 2000);
 });
 
 document.addEventListener("DOMContentLoaded", async function() {
    const postId = localStorage.getItem('postid');
    const postUserContainer = document.getElementById('posts');

    if (postId) {
        try {
            const response = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`);
            const post = response.data.data;

            let commentsHtml = `
                <div class="userPost">
                    <h3><span>${post.author.name}/</span>Post</h3>
                </div>
                <div class="card shadow-sm">
                    <div class="card-header">
                        <img src="${post.author.profile_image}" alt="" class="rounded-circle border border-2">
                        <span class="fw-bold">${post.author.name}</span>
                    </div>
                    <div class="card-body">
                        <img src="${post.image}" alt="" class="w-100">
                        <h6 class="text-secondary mt-1">${post.created_at}</h6>
                        <h5>${post.title}</h5>
                        <p>${post.body}</p>
                        <hr>
                        <div>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg>
                                (${post.comments_count}) تعليقات
                            </span>
                        </div>
                    </div>
                </div>
                <div class="addCommentContainer py-4 align-items-center">
                    <input class="content-comment w-50 border-0 border-bottom border-black" type="text" placeholder="add comment">
                    <button class="btnAddcomment btn ms-2 bg-primary text-white">Add comment</button>
                </div>
            `;

            // إضافة التعليقات إلى HTML
            for (let i = 0; i < post.comments.length; i++) {
                commentsHtml += `
                    <div class="comment align-items-center pt-2 bg-body-secondary">
                        <div class="commentDetails ps-2">
                            <img class="image-comments rounded-circle" src="${post.comments[i].author.profile_image}" alt="">
                            <span class="fw-bold ps-2">${post.comments[i].author.name}</span>
                            <div class="content">${post.comments[i].body}</div>
                        </div>
                        <hr>
                    </div>
                `;
            }

            postUserContainer.innerHTML = commentsHtml;
            checktokenUsre();

            // التحقق من وجود الزر btnAddcomment بعد تحميل المحتوى
            const btnAddcomment = document.querySelector(".btnAddcomment");
            if (btnAddcomment) {
                btnAddcomment.addEventListener("click", async () => {
                    const bodyText = document.querySelector(".content-comment").value;
                    const tokenUsre = localStorage.getItem("token");

                    if (!bodyText) {
                        appendAlert("Please enter your comment", "warning");
                        setTimeout(() => {
                            alertPlaceholder.innerHTML="";
                        },1000);
                         
                        return;
                    }

                    try {
                        await axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`, { body: bodyText }, {
                            headers: {
                                "Authorization": `Bearer ${tokenUsre}`
                            }
                        });

                        // إعادة تحميل الصفحة
                        window.location.reload();
                    } catch (error) {
                        appendAlert(error.response.data.message, "danger");
                    }
                });
            } else {
                console.error("Button btnAddcomment not found");
            }

        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    } 
     
});

let navcontent = document.querySelector('.nav-content');
let themeIcon = document.querySelector('.theme-icon');  

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
        document.body.style.backgroundColor = "#343a40";
        document.body.style.color = "#f8f9fa";
        navcontent.classList.add('navbar-dark');
        navcontent.classList.remove('navbar-light');
        themeIcon.classList.add('fa-sun');  
        themeIcon.classList.remove('fa-moon');
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "#343a40";
        navcontent.classList.add('navbar-light');
        navcontent.classList.remove('navbar-dark');
        themeIcon.classList.add('fa-moon');  
        themeIcon.classList.remove('fa-sun');
    }
}

// Event listener to load the saved theme when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("mood") || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    // Apply the appropriate background and text colors based on the saved theme
    if (savedTheme === 'dark') {
        document.body.style.backgroundColor = "#343a40";
        document.body.style.color = "#f8f9fa";
        navcontent.classList.add('navbar-dark');
        navcontent.classList.remove('navbar-light');
        themeIcon.classList.add('fa-sun');  
        themeIcon.classList.remove('fa-moon');
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "#343a40";
        navcontent.classList.add('navbar-light');
        navcontent.classList.remove('navbar-dark');
        themeIcon.classList.add('fa-moon');  
        themeIcon.classList.remove('fa-sun');
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


 