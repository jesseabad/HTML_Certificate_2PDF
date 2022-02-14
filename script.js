$(document).ready(function () {  
    var cert = $('.cert'),  
    cache_width = cert.width(),
    a4=[1054, 816]
    console.log("cache_width:"+cache_width);
    addDate();

    $('#name').focus(function(){
        $(this).val("");
        $(this).removeClass("small-font");
        $(this).addClass("big-font");
    })

    $('#name').change(function(){
        $(this).addClass('no-border')
    });


    $('#create_pdf').on('click', function () {  
  
       if( checkName()){
        $(window).scrollTop(0).ready(
            function(){createPDF();  }
        );  
       };
    });

    
    function createPDF() {  
        
        getCanvas().then(function (canvas) {  
            var  
             img = canvas.toDataURL("image/png"),  
             doc = new jsPDF({  
                orientation: "landscape",
                 unit: 'px',  
                 format: 'letter'
                
             });  
             doc.setProperties({
                title: 'MAO ACS - Certificate of Completion',
                subject: 'MAO ACS - Certificate of Completion',
                author: 'OSD MAO',
                keywords: 'Certificate',
                creator: 'OSD MAO'
            });
            doc.addImage(img, 'PNG',0, 0,612,474);  //8.5in x 11in 120ppi
            doc.save('acs-certificate.pdf');  
            cert.width(cache_width);  
           
        });  
    }  
      
    function getCanvas() {  
     // cert.width((a4[0] * 1.333) - 80).css('max-width', 'none'); 
      
        return html2canvas(cert, {  
            imageTimeout: 1000,  
            removeContainer: true  
        });  


    }

    function addDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = today.toLocaleString('default',{month:'short'}) //String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var str = "DATE: ";
        today = mm + '/' + dd + '/' + yyyy;
        $("#date").html(str+today)
    }

    function checkName(){
        var name= ($("#name").val())
       if(name=="Type your name here"){
         confirm("Alert: Please type your name.") ;
         return false;
       }else {
           return true;
       }
    }
});     