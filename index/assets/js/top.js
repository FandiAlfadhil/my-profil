var ww = $(window).innerWidth(),
	wh = $(window).innerHeight(),
	sct = $(window).scrollTop(),
	scl = $(window).scrollLeft();

var hs = location.hash,
	skiped = hs === '#skip'; //loading,スクロールアニメーションのスキップ


/*-----------------------------------------------
 * Loading
-------------------------------------------------*/
var $loading = $('.js-loading');

// スクロールを禁止にする関数
function disableScroll(event) {
	event.preventDefault();
}
document.addEventListener('touchmove', disableScroll, { passive: false });
document.addEventListener("mousewheel", disableScroll, { passive: false });

//スクロール禁止解除
function scrollok(){
	document.removeEventListener('touchmove', disableScroll, { passive: false });
	document.removeEventListener("mousewheel", disableScroll, { passive: false });
}

// hash(#skip)
if(skiped){

	$(function(){
		$loading.remove();
		$('.js-fani').addClass('is-on');
		topVsSwpier(); //swiper
		scrollok();
	});

// hash(#skip)以外
} else if(!(skiped) && $(hs)[0]){

	var contTarget;
	$(function(){
		$('body,html').animate({scrollTop:0}, 10);
	});

	$(window).on('load', function(){
		contTarget = $(hs).offset().top; //#hashセクションの位置
		setTimeout(() => {
			$('.js-fani').addClass('is-on');
			topVsSwpier(); //swiper
			$loading.fadeOut(500, function(){
				$loading.remove();
			});
			setTimeout(() => {
				$('body,html').animate({scrollTop:contTarget}, 1000, 'easeOutQuart', function(){
					scrollok();
				});
			}, 500);
		}, 500);
	});

// hash none
} else {
	$(window).on('load', function(){
		wh = $(window).innerHeight();
		var visualHeight = $('.js-vsimgPos').innerHeight(),
			visualHeightH = visualHeight / 10,
			firstPos = visualHeight - wh - visualHeightH;

		$loading.delay(500).fadeOut(500);

		// ブラウザ高さがビジュアルより高い場合の分岐
		if(wh > visualHeight) {
			$('body,html').animate({scrollTop:0}, 10);
			scrollok();
			firstAnimation();
			setTimeout(() => {
				$('.js-firstInfo').click();
			}, 2000);
		} else {
			$('body,html').animate({scrollTop:firstPos}, 10);
			setTimeout(() => {
				if(!(wh >= visualHeight)) {
					$('body,html').animate({scrollTop:0}, 2000, 'easeOutQuart', function(){
						scrollok();
					});
				}
				firstAnimation();
				setTimeout(() => {
					$('.js-firstInfo').click();
				}, 2500);
			}, 1500);
		}

		topVsSwpier(); //swiper
	});
}

function firstAnimation() {
	setTimeout(() => {
		$('.js-fani').addClass('is-on');
	}, 1000);
}


/*-----------------------------------------------
 * Visual
-------------------------------------------------*/
/**
 * swiper
 */
function topVsSwpier() {
	var visualSwiper = new Swiper ('.js-visualSwiper', {
		loop: 'true',
		slidesPerView: 1,
		centeredSlides: true,
		speed: 0,
		autoplay:{
			delay: 8000,
			disableOnInteraction: false,
		},
	});

	visualSwiper.on('slideChange', function () {
		var topVsNowNum = visualSwiper.realIndex + 1;
		$('.js-changeBtn').removeClass('is-active');
		$('#js-vsnum'+ topVsNowNum).addClass('is-active');
	});

	$('.js-changeBtn').on('click', function(){
		var swiperNum = $(this).data('swipernum');
		$(this).addClass('is-active');
		visualSwiper.slideTo(swiperNum);
	});
}


/*-----------------------------------------------
 * ブラウザリサイズ、スクロール時の各処理
-------------------------------------------------*/
function commonScrollResizeHandle() {

	ww = $(window).innerWidth();
	sct = $(window).scrollTop();
	scl = $(window).scrollLeft();

	// スクロールで.js-bottomAreaに到達した際、ロゴとcanvas表示
	var bottomAreaOT = $('.js-bottomArea').offset().top;
	if(bottomAreaOT <= sct) {
		$('.header__logo, .canvasWrap').addClass('is-active');
	} else {
		$('.header__logo, .canvasWrap').removeClass('is-active');
	}

}
$(window).on('load scroll resize', commonScrollResizeHandle);


/**
 * iframeSize
 */
var $ytIfWrap = $('.js-ytIfWrap');
var aspect = 16/9;

if($ytIfWrap[0]) {

	function iframeSize() {
		$ytIfWrap.each(function(){
			var $ytIf = $(this).find('.js-ytIf');
			var ytIfWrapWidth = $(this).width();
			var ytIfWrapHeight = $(this).height();
			var wrapAspect = ytIfWrapWidth / ytIfWrapHeight;

			if(aspect <= wrapAspect) {
				$ytIf.css({
					'width':ytIfWrapWidth + 'px',
					'height':ytIfWrapWidth / aspect + 'px'
				});
			} else {
				$ytIf.css({
					'width':ytIfWrapHeight*aspect + 'px',
					'height':ytIfWrapHeight + 'px'
				});
			}
		});
	}

	$(window).on('load resize',function(){
		iframeSize();
	});
}


/*-----------------------------------------------
 * Movie
-------------------------------------------------*/
/**
 * swiper
 */
$(function(){
	var movieItemLen = $('.js-movieItem').length;
	if(movieItemLen >= 2) {
		$('.js-c-swiperPagerWrap, .js-c-swiperNavWrap').show();

		var movieSwiper = new Swiper('.js-movieSwiper', {
			loop: true,
			direction: 'horizontal',
			autoHeight: false,
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: 10,
			speed: 800,
			navigation: {
				nextEl: '.js-movieSwiper-next',
				prevEl: '.js-movieSwiper-prev',
			},
			pagination: {
				el: '.js-movieSwiper-pagination',
				type: 'bullets',
				clickable: true,
			},
		});
	}
});


/*-----------------------------------------------
 * ナビゲーションアクティブ処理
-------------------------------------------------*/
var $navLink = $('.js-nanchor');
var contentsArr = [];
$(window).on('load resize', function(){
	$navLink = $('.js-nanchor');
	targetContents();
});
$(window).on('load resize scroll', function(){
	currentCheck();
});

function targetContents() {
	whh = $(window).innerHeight() / 2;

	for (var i = 0; i < $navLink.length; i++) {
		var targetContents = $navLink.eq(i).attr('href').replace('./', ''); //要素IDを取得
		var targetContentsTop = $(targetContents).offset().top - whh;
		var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
		contentsArr[i] = [targetContentsTop, targetContentsBottom] //配列に格納
	}
}

function currentCheck() {
	sct = $(window).scrollTop();
	ww = $(window).innerWidth();
	wh = $(window).innerHeight();

	// スクロールで.footerに到達した際にアクティブを消す
	var $footer = $('.js-footer');
	var footerOT = $footer.offset().top;

	for (let i = 0; i < contentsArr.length; i++) {
        // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
        if(contentsArr[i][0] <= sct && contentsArr[i][1] >= sct) {
            $navLink.removeClass('is-active');

            if(footerOT <= sct) {
            	$navLink.removeClass('is-active');
            } else {
            	$navLink.eq(i).addClass('is-active');
            }

            i == contentsArr.length;
        }
    }
}


/*-----------------------------------------------
-------------------------------------------------*/
$(function(){
	// ナビゲーションクリックイベント
	$(document).on('click', '.js-nanchor', function(){
		$('.js-menu, .js-header').removeClass('is-active');
		$('body, html').css({'overflow':''});
		var speed = 1000;
		var href= $(this).attr("href").replace('./', '');
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'easeOutQuart');
		return false;
	});

	// youtube thumbnail
	if($('.js-topYtThumb')[0]){
		$('.js-topYtThumb').each(function(){
			var ytID = $(this).data('ytid');
			$(this).find('.js-topYtThumb-cont').css({'background-image':'url(https://img.youtube.com/vi/'+ytID+'/maxresdefault.jpg)'})
		});
	}

});
