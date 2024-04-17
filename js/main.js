function scroll_effect() {
    var element = document.getElementsByClassName('scroll-up');
    if(!element) return;
                        
    var scrollY = window.pageYOffset;
    var windowH = window.innerHeight;
    var showTiming = 200;
    for(var i = 0; i < element.length; i++) { 
        var elemClientRect = element[i].getBoundingClientRect(); 
        var elemY = scrollY + elemClientRect.top; 
        if(scrollY > elemY - windowH + showTiming) {
        element[i].classList.add('is-show');
        }
    }
}
window.addEventListener('scroll', scroll_effect);

var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
    labels: ["2年", "3年", "4年"],                            datasets: [{
        backgroundColor: [
            "#BB5179",
            "#FAFF67",
            "#58A27C"
        ],
        data: [43, 14, 1]
    }]
    },
    options: {
        title: {
            display: true,
            text: 'メンバー割合'
        },
          legend: {
            display: false
        }
      }
    });
