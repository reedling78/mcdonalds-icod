<template>
	<div class="arrow-animation">
		  <div class="arrowSliding arrowSliding1 delay1">
		    <div class="arrow"></div>
		  </div>
		  <div class="arrowSliding arrowSliding2 delay2">
		    <div class="arrow"></div>
		  </div>
		  <div class="arrowSliding arrowSliding3 delay3">
		    <div class="arrow"></div>
		  </div>
		  <div class="arrowSliding arrowSliding4 delay4">
		    <div class="arrow"></div>
		  </div>
		  <div class="arrowSliding arrowSliding5 delay5">
		    <div class="arrow"></div>
		  </div>
		  <div class="arrowSliding arrowSliding6 delay6">
		    <div class="arrow"></div>
		  </div>
		  <div class="arrowSliding arrowSliding7 delay7">
		    <div class="arrow"></div>
			</div>
	</div>
</template>

<script>
export default {
    name: 'animated-arrows'
}
</script>

<style lang="scss" scoped>
	.arrow-animation {
		width: 400px;
		height: 60px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}
	
	.arrow {
		width: 78px;
		height: 72px;
		border: 17px solid;
		border-color: black transparent transparent black;
		transform: rotate(-45deg);
	}

	.arrowSliding {
		position: absolute;
		left: 60px;
		height: 59px;
		width: 143px;
		overflow: hidden;
			display: flex;
		justify-content: center;
		align-items: center;
		.arrow {
			transform: rotate(-45deg);
		}
	}

	.arrowSliding1 {
			left: 60px;
			animation: leftAndSmall1 1s linear infinite; 
	}
	.arrowSliding2 {
		left: 135px;
			animation: leftAndSmall2 1s linear infinite;
	}
	.arrowSliding3 {
		left: 197px;
			animation: leftAndSmall3 1s linear infinite;
	}
	.arrowSliding4 {
		left: 259px;
			animation: leftAndSmall4 1s linear infinite;
	}
	.arrowSliding5 {
		left: 321px;
			animation: leftAndSmall5 1s linear infinite;
	}
	.arrowSliding6 {
		left: 383px;
			animation: leftAndSmall6 1s linear infinite;
	}
	.arrowSliding7 {
		left: 445px;
			animation: leftAndSmall7 1s linear infinite; 
	}

	// change into a mixin so we can pass parameters
	@keyframes leftAndSmall1 {
			0% { opacity: 0.5; transform: translateX(98px) scale(1);} 
		20% { opacity: 0; transform: translateX(0px) scale(0.5);}
		100% { opacity: 0; transform: translateX(0px) scale(0.5);}
	}
	@keyframes leftAndSmall2 {
			0% { opacity: 0.8; transform: translateX(98px);} 
		20% { opacity: 0.5; transform: translateX(0);}
		100% { opacity: 0.5; transform: translateX(0);} 
	}
	@keyframes leftAndSmall3 {
			0% { opacity: 1; transform: translateX(98px);} 
		20% { opacity: 0.8; transform: translateX(0);}
		100% { opacity: 0.8; transform: translateX(0);} 
	}
	@keyframes leftAndSmall4 {
			0% { opacity: 1; transform: translateX(98px);} 
		20% { opacity: 1; transform: translateX(0);}
		100% { opacity: 1; transform: translateX(0);}  
	}
	@keyframes leftAndSmall5 {
			0% { opacity: 0.8; transform: translateX(98px);} 
		20% { opacity: 1; transform: translateX(0) ;}
		100% { opacity: 1; transform: translateX(0);} 
	}
	@keyframes leftAndSmall6 {
			0% { opacity: 0.5; transform: translateX(98px) ;} 
		20% { opacity: 0.8; transform: translateX(0);}
		100% { opacity: 0.8; transform: translateX(0);}
	}
	@keyframes leftAndSmall7 {
			0% { opacity: 0; transform: translateX(98px)  scale(0.5); } 
		20% { opacity: 0.5; transform: translateX(0)  scale(1); }
		100% { opacity: 0.5; transform: translateX(0)  scale(1); } 
	}

	// @mixin keyframesMixin($name, $from, $to) {
	//     @keyframes #{$name} {
	//         0% {
	//             @each $prop, $val in $0 {
	//               #{$prop}: $val;
	//             }
	//         }
	//         20% {
	//             @each $prop, $val in $to {
	//               #{$prop}: $val;
	//             }
	//         }
	//         100% {
	//             @each $prop, $val in $to {
	//                 #{$prop}: $val;
	//             }
	//         }
	//     }
	// }
</style>

