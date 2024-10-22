<script setup>

</script>

<template>
<main class="homemain py-14">
   <section class="section banner banner-section">
      <div class="container banner-column">
         <img class="banner-image" src="https://i.ibb.co/vB5LTFG/Headphone.png" alt="banner">
         <div class="banner-inner">
            <h1 class="heading-xl">Experience Media Like Never Before</h1>
            <p class="paragraph">
               Enjoy award-winning stereo beats with wireless listening freedom and sleek,
               streamlined with premium padded and delivering first-rate playback.
            </p>
            <router-link to="/products" class="btn btn-darken btn-inline bg-[#101419]">
               Our Products<i class="bx bx-right-arrow-alt"></i>
            </router-link>
         </div>
         <div class="banner-links">
            <router-link to="#" title=""><i class="bx bxl-facebook"></i></router-link>
            <router-link to="#" title=""><i class="bx bxl-instagram"></i></router-link>
            <router-link to="#" title=""><i class="bx bxl-twitter"></i></router-link>
            <router-link to="#" title=""><i class="bx bxl-youtube"></i></router-link>
         </div>
      </div>
   </section>
</main>

</template>
<style scoped>
.homemain{
  background-color: #080a0c;
  color: #fff;
}
.banner-section {
	 margin: 0 auto;
	 /* background-color: #080a0c; */

}
 .heading-lg {
	 font-family: inherit;
	 font-size: clamp(2.179rem, 5vw, 3.176rem);
	 font-weight: 700;
	 line-height: 1.15;
	 letter-spacing: -1px;
}
.heading-xl {
	 font-family: inherit;
	 font-size: clamp(2.648rem, 6vw, 4.241rem);
	 font-weight: 700;
	 line-height: 1.15;
	 letter-spacing: -1px;
}
.paragraph {
	 font-family: inherit;
	 font-size: clamp(1rem, 2vw, 1.125rem);
	 text-wrap: balance;
	 color: #e4e6e7;
}
.btn {
	 display: inline-block;
	 font-family: inherit;
	 font-size: 1rem;
	 font-weight: 500;
	 line-height: 1.5;
	 text-align: center;
	 vertical-align: middle;
	 white-space: nowrap;
	 user-select: none;
	 outline: none;
   border: 1px solid transparent;
	 border-radius: 0.25rem;
	 text-transform: unset;
	 transition: all 0.3s ease-in-out;
}
.btn:hover{
   color: #fff;
   border: 1px solid #2463eb;
}
 .btn-inline {
	 display: inline-flex;
	 align-items: center;
	 justify-content: center;
	 column-gap: 0.5rem;
}
 .btn-darken {
	 padding: 0.75rem 2rem;
	 color: #fff;
	 /* background-color: #101419; */
	 box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
 .banner-column {
	 position: relative;
	 display: grid;
	 align-items: center;
	 /* row-gap: 3rem; */
}
 @media only screen and (min-width: 48rem) {
	 .banner-column {
		 grid-template-columns: repeat(2, minmax(0, 1fr));
		 justify-content: center;
	}
}
 @media only screen and (min-width: 64rem) {
	 .banner-column {
		 grid-template-columns: 1fr max-content;
		 column-gap: 4rem;
		 /* margin-top: 3rem; */
	}
}
 .banner-image {
	 display: block;
	 max-width: 18rem;
	 height: auto;
	 margin-top: 2rem;
	 object-fit: cover;
	 justify-self: center;
}
 @media only screen and (min-width: 48rem) {
	 .banner-image {
		 order: 1;
		 max-width: 20rem;
		 height: auto;
	}
}
 @media only screen and (min-width: 64rem) {
	 .banner-image {
		 max-width: 25rem;
		 height: auto;
		 margin-right: 5rem;
	}
}
 .banner-inner {
	 display: flex;
	 flex-direction: column;
	 align-items: flex-start;
	 row-gap: 1.75rem;
}
 .banner-links {
	 position: absolute;
	 top: 30%;
	 right: 1.5rem;
	 display: grid;
	 justify-items: center;
	 row-gap: 0.5rem;
	 opacity: 0;
	 visibility: hidden;
}
.banner-links:hover {
  color: dodgerblue;
}
 @media only screen and (min-width: 64rem) {
	 .banner-links {
		 opacity: 1;
		 visibility: visible;
	}
}
 .banner-links > * {
	 font-size: 1.25rem;
	 line-height: 1.25;
	 color: #fff;
	 transition: all 0.3s ease-in-out;

}
.banner-links>*:hover {
  color: #2463eb;
}
 .banner-links::before {
	 position: absolute;
	 content: "";
	 top: -3rem;
	 width: 4rem;
	 height: 1.5px;
	 transform: rotate(90deg);
	 background: #fff;
}
 .banner-links::after {
	 position: absolute;
	 content: "";
	 bottom: -3rem;
	 width: 4rem;
	 height: 2px;
	 transform: rotate(90deg);
	 background: #fff;
}

</style>
