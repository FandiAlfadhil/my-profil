// Set PageChange Num
let number = 30; //初回ロード時に表示したい件数（推奨：6の倍数）
let number_set = 30; //moreをクリックしたら表示する件数（推奨：6の倍数）

const goodsAll = $(".goodsList").length;

// loaded
$(function(){
	if(goodsAll < number){
		$(".js-goodsmore").fadeOut(300);
	}
	$(".js-goodsListsWrap").each(function(){
		$(this).find(".goodsList:not(:lt("+ number +"))").addClass('-hide').hide();
	});
});

// GoodsMore
function goodsmore(){
	number += number_set;
	$(".js-goodsListsWrap").find(".goodsList:lt(" + number + ")").fadeIn(300).removeClass("-hide");

	//fadeIn後
	var hidenum = $(".goodsList.-hide").length;
	if(hidenum < 0 || hidenum == 0){
		$(".js-goodsmore").fadeOut(300);
		console.log(hidenum);
	}else{
		console.log(hidenum);
	}
	return false;
}