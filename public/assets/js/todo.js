$("#switch").on('click', function () {
        if ($("body").hasClass("dark")) {
            $("body").removeClass("dark");
            $("#switch").removeClass("switched");
        } else {
            $("body").addClass("dark");
            $("#switch").addClass("switched");
            }
        })

// function darkLight() {
//     if (localStorage.toggled != 'body.dark') {
//        $('#main, #container').toggleClass('dark', true);
//        $('#main, div').toggleClass('dark', true);
//        $('#main, h1').toggleClass('dark', true);
//        $('#main, input').toggleClass('dark', true);
//        $('#main, ul').toggleClass('dark', true);
//        localStorage.toggled = "dark";
//     } else {
//        $('#main, div').toggleClass('dark', false);
//        localStorage.toggled = "";
//     }

//     if ($('main').hasClass('dark')) {
//         $( '#switch' ).prop( "checked", true )
//   } else {
//         $( '#switch' ).prop( "checked", false )
//   }
//  }


//dark mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
        var currentTheme = localStorage.getItem('dark-mode', darkMode);
        console.log(currentTheme);
        var darkMode;
if (localStorage.getItem('dark-mode')) { 
  // if dark mode is in storage, set variable with that value
  darkMode = localStorage.getItem('dark-mode');
}else { 
  // if dark mode is not in storage, set variable to 'light'
  darkMode ='light';
}
// set new localStorage value
localStorage.setItem('dark-mode', darkMode);
if (localStorage.getItem('dark-mode') =='dark') {
  // if the above is 'dark' then apply .dark to the body
  $('body').addClass('dark');
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    } else {
        toggleSwitch.checked = false;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('dark-mode', 'dark');
        $('body').addClass('dark');
    } else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('dark-mode', 'light');
          $('body').removeClass('dark');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

//the li style
$("#element").on("click", "li", function() {
    $(this).toggleClass("completed")
})

//delete button
$("ul").on("click", "span", function(event) {
    event.stopPropagation()
    $(this).parent().fadeOut(500, function() {
        $(this).remove()
    })
})

//toggle the input text
$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle()
})