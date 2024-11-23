 
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
        imgeprofilediv.innerHTML="";
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
   
    
     setupUI();
      
     //Msg log Out 
     appendAlert("You have successfully logged out","success");
  // remove alert Msg  log Out 
     setTimeout(() => {
         alertPlaceholder.innerHTML = "";
     }, 2000);
 });
 
 

let navcontent = document.querySelector('.nav-content');
let themeIcon = document.querySelector('.theme-icon'); // عنصر الأيقونة

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
        themeIcon.classList.add('fa-sun'); // تغيير الأيقونة لأيقونة الشمس
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
 
 
const profileImge=document.querySelector('.imgeuser img');
const UserEmail=document.getElementById('UserEmail');
const userName=document.getElementById('userName');
const postnumber=document.getElementById('postNumber');
const commentNumber=document.getElementById('commentNumber');
const postsContainer=document.getElementById('post');

let  profileId=localStorage.getItem("idAuthor");
//get data user 
async  function getdataUser(){
     await axios.get(`https://tarmeezacademy.com/api/v1/users/${profileId}`)
    .then((response) => {
    let data=response.data.data;
    console.log(data)
    profileImge.src=data.profile_image;
    UserEmail.innerHTML=data.email;
    userName.innerHTML=data.name;
    postnumber.innerHTML=`${data.posts_count}<span>post</span>`;
    commentNumber.innerHTML=`${data.comments_count}<span>comment</span>`;
    })
    .catch((error) => {
        console.log(error)
    });
}

function getUserPosts() {
    const postsContainer = document.getElementById('post'); 
    
    axios.get(`https://tarmeezacademy.com/api/v1/users/${profileId}/posts`)
        .then((response) => {
            let data = response.data.data;
            if (data.length === 0) {
                postsContainer.innerHTML = '<p class="text-center">No posts available for this user.</p>';
            } else {
                postsContainer.innerHTML = data.map(post => `
                    <div class="card shadow-sm mt-2">
                        <div class="card-header">
                            <img src="${post.author.profile_image || 'default-profile.png'}" alt="" class="rounded-circle border border-2">
                            <span class="fw-bold">${post.author.name}</span>
                        </div>
                        <div class="card-body">
                            <img id="postImage" src="${post.image || 'default-post.png'}" alt="" class="w-100">
                            <h6 class="text-secondary mt-1 created_at">${post.created_at}</h6>
                            <h5 id="postTitle">${post.title}</h5>
                            <p id="postBody">${post.body}</p>
                            <hr>
                        </div>
                    </div>
                `).join('');
            }
        })
        .catch((error) => {
            console.log('Error fetching posts:', error);
            postsContainer.innerHTML = '<p class="text-center text-danger">Error loading posts. Please try again later.</p>';
        });
}
getdataUser();
getUserPosts();

// close model overFlow
document.addEventListener('hidden.bs.modal', function (event) {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.remove();
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
});

  
 