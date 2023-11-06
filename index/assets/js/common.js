/*-----------------------------------------------
 * Header, Footerインクルード
-------------------------------------------------*/
var nowHref = location.href; //現在のURL
var headerhtml = 'include/header.html'; //ヘッダーファイルパス

// Share
var shareURL = 'https://frieren-anime.jp/',
	shareText = 'アニメ『葬送のフリーレン』公式サイト',
	shareHashTag = 'フリーレン,frieren',
	twURL;

// shareHashTagの有無でURLを変更
if(shareHashTag) {
	twURL = 'https://twitter.com/intent/tweet?url='+shareURL+'&text='+shareText+'&hashtags='+shareHashTag;
} else {
	twURL = 'https://twitter.com/intent/tweet?url='+shareURL+'&text='+shareText;
}

var	fbURL = 'https://www.facebook.com/share.php?u='+shareURL,
	lineURL = 'https://line.me/R/msg/text/?'+shareText+' '+shareURL;

$(function(){
	$('.js-shareTwitter-header').attr('href',twURL);
	$('.js-shareFacebook-header').attr('href',fbURL);
	$('.js-shareLine-header').attr('href',lineURL);
	$('.js-shareTwitter-footer').attr('href',twURL);
	$('.js-shareFacebook-footer').attr('href',fbURL);
	$('.js-shareLine-footer').attr('href',lineURL);
});

//header.htmlの読み込み
// function headerInclude(directory){
// 	$.ajax({
// 		type: 'get',
// 		url: directory + headerhtml,
// 		dataType: 'html',
// 		success: function(data) {
// 			data = data.replace(/\{\$root\}/g, directory);
// 			$('.js-header').append(data);
// 		}
// 	}).done(function(data) {
// 		var pageName = $('.js-header').data('pagename');
// 		$('.js-navLink').each(function(){
// 			var $activeNavItem = $(this).attr('id');
// 			$activeNavItem = $activeNavItem.slice(4);

// 			// $activeNavItemとメニューのpageNameが合致
// 			if($activeNavItem == pageName) {
// 				$(this).addClass('is-active');

// 			} else {
// 				$(this).removeClass('is-active');
// 			}
// 		});
// 		$('.js-shareTwitter-header').attr('href',twURL);
// 		$('.js-shareFacebook-header').attr('href',fbURL);
// 		$('.js-shareLine-header').attr('href',lineURL);
// 	}).fail(function() {
// 		console.log('通信失敗');
// 	});
// }

// //フッターファイルパス
// var footerhtml = 'include/footer.html';
// //フッターの読み込み
// function footerInclude(directory){
// 	$.ajax({
// 		type: 'get',
// 		url: directory + footerhtml,
// 		dataType: 'html',
// 		success: function(data) {
// 			data = data.replace(/\{\$root\}/g, directory);
// 			$('.js-footer').append(data);
// 		}
// 	}).done(function(data) {
// 		$('.js-shareTwitter-footer').attr('href',twURL);
// 		$('.js-shareFacebook-footer').attr('href',fbURL);
// 		$('.js-shareLine-footer').attr('href',lineURL);
// 	}).fail(function() {
// 		console.log('通信失敗');
// 	});
// }


/*-----------------------------------------------
 * ブラウザリサイズ時の各処理
-------------------------------------------------*/
function commonResizeHandle() {

    var windowWidth = window.outerWidth;

	// iphone,ipod,androidの時、横幅375px以下でviewportを変更
	if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0){
		if(windowWidth < 375) {
			$("meta[name=viewport]").remove();
			$("head").append('<meta name="viewport" content="width=375">');
		} else {
			$("meta[name=viewport]").remove();
			$("head").append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">');
		}
	} else {
		$("meta[name=viewport]").remove();
		$("head").append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">');
	}
}
$(window).on('load resize', commonResizeHandle);


/*-----------------------------------------------
-------------------------------------------------*/
$(function(){

    // Anchor Smooth Scroll
    $('.js-anchor').on('click', function(){
        var speed = 1000;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({scrollTop:position}, speed, 'easeOutQuart');
        return false;
    });

    // pagetop
	$(document).on('click', '.js-pagetop', function(){
		var speed = 1000;
		$('body,html').animate({scrollTop:0}, speed, 'easeOutQuart');
		return false;
	});

    // Menu
    $(document).on('click', '.js-menu', function(){
        $(this).toggleClass('is-active');
        if($(this).hasClass('is-active')){
            $('.js-header').addClass('is-active');
			$('body, html').css({'overflow':'hidden'});
        } else {
            $('.js-header').removeClass('is-active');
			$('body, html').css({'overflow':''});
        }
    });

	// youtube thumbnail
	if($(".js-youtubeThumb")[0]){
		$(".js-youtubeThumb").each(function(){
			var ytID = $(this).data('ytid');
			$(this).css({'background-image':'url(https://img.youtube.com/vi/'+ytID+'/hqdefault.jpg)'})
		});
	}

	// Comment
	$('.js-commentModalOpen').on('click', function(){
		$('.js-commentModal').html('');
		const commentName = $(this).data('commentname');
		setTimeout(function(){
			$('.js-commentModal').load('./comment/'+commentName+'.html');
		},1);
	});


    /**
     * Modal open
     */
    // Common
	$(document).on('click', '.js-modalOpen', function(){
        var modalID = $(this).data('modal');
        $('#' + modalID).fadeIn(500);
        $('.js-modalBox').fadeIn(500);
        $('body').css({'overflow':'hidden'});
    });
	$('.js-modalOpen2').on('click', function(){
        var modalID = $(this).data('modal');
        $('#' + modalID).fadeIn(500);
        $('.js-modalBox2').fadeIn(500);
        $('body').css({'overflow':'hidden'});
    });

    // Youtube
	$(document).on('click', '.js-youtubePlay', function(){
        var ytID = $(this).data('ytid');
        var ytURL = 'https://www.youtube.com/embed/'+ytID+'?autoplay=1&rel=0';
        setTimeout(function(){
            $('.js-youtubeIframe').attr('src',ytURL);
        },100);
    });

	// img
    $('.js-imgModal').on('click', function(){
        var imgSrc = $(this).find('.js-imgModalImg').attr('src');
        $('.js-imgModalScale').attr('src',imgSrc);
    });


    /**
     * Modal close
     * iframeのsrcをcloseの際に消す
     */
    var $modalIF = $('.js-youtubeIframe');

    // Close処理
    function modalClose() {
        $('.modalBox, .oneModal').fadeOut(500);
        setTimeout(function(){
            $modalIF.attr('src','');
        },500);
        $('body').css({'overflow':''});
    }

    // Closeボタン
    $('.js-modalClose').on('click', function(){
        modalClose();
    });

    // Close エリア外
    $('.js-oneModalIn').on('click touchend', function(e) {
        if (!$(e.target).closest('.js-oneModalIn__cont').length) {
            modalClose();
        }
    });

});

var $subLoading = $('.js-s-loading');
if($subLoading[0]) {
	$(window).on('load', function(){
		setTimeout(() => {
			$subLoading.fadeOut(500, function(){
				$subLoading.remove();
			});
		}, 500);
	});
}
