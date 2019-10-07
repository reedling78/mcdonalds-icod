<template>
  <div class="p1d-automc-screen screen-type--dt">
    <div id="box-main">
      <div id="box-slides" class="slides">
        <div id="carousel-header" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner slides-header" role="listbox">
            <!-- items -->
            <!-- end items -->
          </div>
        </div>
      </div>
      <div id="box-menu" class="menu">
        <img class="imgs" src="@/assets/img/breakfast-menu.png">
      </div>
      <div id="box-slides" class="slides">
        <div id="carousel-footer" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner slides-footer" role="listbox">
            <!-- items -->
            <!-- end items -->
          </div>
        </div>
      </div>
    </div>

    <CodContainer/>
  </div>
</template>

<script>
import { CodContainer } from "@containers";
require("@/assets/libs/sb.all.min.js");
require("@/assets/libs/jquery.min.js");
require("@/assets/libs/popper.min.js");

export default {
  name: "p1d-automc-screen",
  components: {
    CodContainer
  },
  data() {
    return {};
  },
  methods: {
    isLocal: function() {
      return SB.local
        ? "https://gt.mcd.switchboardcms.com/file/productos-auto/"
        : "/file/productos-auto/";
    }
  },
  mounted() {
    //FUNCION PARA ARMAR EL SLIDER PARAM1: EL OBJETO Y PARAM2: LA CLASE

    var slider = function(slides, clase) {
      //INICIAMOS UNA VARIABLE VACIA
      var box_div = "";

      // CREAMOS LA FUNCION PARA SABER CUAL ES EL PRIMER SLIDE
      var first_slide = function(data) {
        if (data === 0) {
          return "active";
        } else {
          return "";
        }
      };

      //RECORREMOS EL PARAM1:SLIDE
      slides.forEach(function(data, index) {
        //verificamos que tipo de archivo es si es video o imagen
        switch (data.type) {
          case "video":
            box_div +=
              '<div class="carousel-item ' +
              first_slide(index) +
              '" data-slide="' +
              index +
              '">';
            box_div += '<video class="imgs" autoplay loop>';
            box_div += '<source src="' + data.url + '" type="video/mp4">';
            box_div += "</video>";
            box_div += "</div>";
            break;
          case "foto":
            box_div +=
              '<div class="carousel-item ' +
              first_slide(index) +
              '" data-slide="' +
              index +
              '">';
            box_div += '<img class="imgs" src="' + data.url + '" />';
            box_div += "</div>";
            break;
        }

        //Y LO INYECTAMOS AL DOM
        $(clase).html(box_div);
      });
    };

    // FUNCION PRINCIPAL QUE CONTROLA LOS SLIDERS
    var SlideInit = function(data) {
      var tiempo = data.tiempo;
      var id = data.id;
      var obj_slides = data.obj_slides;
      var clase_div = data.clase_div;

      slider(obj_slides, clase_div);

      var segundos = 0;
      var totalSeg = tiempo;
      var veces = 1;

      //INIDCAMOS CON PARAM1 A QUE ID VA DIRIGIDO
      // $(id).carousel({
      //   interval: false
      // });

      // //CONTROLA EL CAMBIO DE CADA SLIDE
      // setInterval(function() {
      //   $(id).carousel("next");
      //   //console.log('Tiempo: ', tiempo);
      // }, tiempo * 1000);

      //ESTE SOLO SIRVE PARA VER CADA CICLO DE LOS SLIDES
      setInterval(function() {
        if (segundos == totalSeg) {
          console.log(id, veces++);
          segundos = 0;
        }

        if (segundos < totalSeg) {
          segundos++;
        }
      }, 1000);
    };

    // **********************************************************************************************************

    //objeto slides header
    var slidesHeader = [
      {
        type: "video",
        nombre: "texas",
        url: this.isLocal() + "texasOmelette2019.mp4",
        tiempo: 15
      }
    ];

    var slidesFooter = [
      {
        type: "foto",
        nombre: "Ensaladas",
        url: this.isLocal() + "300Calorias.png",
        tiempo: 15
      }
    ];

    /*  
FUNCION PARA TEMPORIZAR LOS SLIDES "SlideInit"
    PARAM 1: EL TIEMPO DE CADA SLIDE 
    PARAM 2: EL ID DEL COMPONENTE 
    PARAM 4: EL OBJETO PARA CREAR LOS SLIDES
    PARAM 5: LA CLASE DEL DIV QUE CONTIENE LOS SLIDES   
*/

    SlideInit({
      tiempo: 10,
      id: "#carousel-header",
      obj_slides: slidesHeader,
      clase_div: ".slides-header"
    });

    SlideInit({
      tiempo: 10,
      id: "#carousel-footer",
      obj_slides: slidesFooter,
      clase_div: ".slides-footer"
    });
  }
};
</script>

<style lang="scss">
.p1d-automc-screen {
  @include box(1080px, 1920px);
  position: relative;
  display: flex;
  flex-direction: column;
  #box-menu {
    background: #fff;
  }
}
</style>
