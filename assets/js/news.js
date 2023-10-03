$(function(){
	var $newsArchiveIframe = $('.newsDetail__textWrap iframe[src*="youtube"]');
	if($newsArchiveIframe[0]) {
		$newsArchiveIframe.each(function(){
			$(this).wrap('<span class="ytifWrap"></span>');
		});
	}
});
