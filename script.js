$(document).ready(function () {  
    var cert = $('.cert'),  
    cache_width = cert.width(),  
    a4 = [841.89, 595.28]; // for a4 size paper width and height  

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
        $('body').scrollTop(0);  
        createPDF();  
    });

    
    function createPDF() {  
        getCanvas().then(function (canvas) {  
            var  
             img = canvas.toDataURL("image/png"),  
             doc = new jsPDF({  
                orientation: "landscape",
                 unit: 'px',  
                 format: 'a4'
                
             });  
             doc.setProperties({
                title: 'MAO ACS - Certificate of Completion',
                subject: 'MAO ACS - Certificate of Completion',
                author: 'OSD MAO',
                keywords: 'certificate',
                creator: 'OSD MAO'
            });
            doc.addImage(img, 'JPEG', 20, 20);  
            doc.save('Bhavdip-html-to-pdf.pdf');  
            cert.width(cache_width);  
        });  
    }  
      
    function getCanvas() {  
        cert.width((a4[0] * 1.33333) - 80);//.css('max-width', 'none'); 
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

        today = mm + '/' + dd + '/' + yyyy;
        $("#date").html(today)
    }




});     