var fixedSidebar = function() {

		/******************************** init **********************************/

		var _HTML,signin = "已签到",unsignin = "签到",signin1="今天已经签到",unsignin1="立即签到",boolSquare = true,signinDay = 0,sidebarHeight,footerOffset,winHeight,$text,$lilist,$sidebar,$gototop;
		var siginTip = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAPCAYAAADuxEEHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZDODJCNkVGODVFODExRTVBNzE3QTg0NEQyNTM4N0UzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZDODJCNkYwODVFODExRTVBNzE3QTg0NEQyNTM4N0UzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkM4MkI2RUQ4NUU4MTFFNUE3MTdBODQ0RDI1Mzg3RTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkM4MkI2RUU4NUU4MTFFNUE3MTdBODQ0RDI1Mzg3RTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5wSJJtAAAEMElEQVR42sxYvXLTQBBWwA0VomPSIJ4gyuQBIjo6Ox1Usp/AVkmlcUVpu6RSUqayXKbCqYAql44uSpfy0oUOaeZbZtm5P4WQyc3syJbu9na//b3bOTg4iJ74GLd0/Mh7xnjqe64ftVTjd9pS1tLyoYR71mNuBkp67nHRY00l5na/85bKlmYMTBvIvpEEyjIFzwwGKEFp4D5T8VtD/n8Zf7AfsJedUHMIpjCp+/0S389bOoQyjYFpCqY147HG/Cl46wBASckVAynG/trh2Xv4fgse77C+FnukBq9PsUf3fAPdSecIssQ9Im+L+QmeHRZDh94lw/QaMnSyHAkZu9Fwo13jQ6fwBMyWYBiB6VCAQICuoVAKw55D0G7ThXAGm+I5lF0xRSKAn3kAO2ayTLHvCA4n5VXifyffJfQjY84Y0BoOMfc4XM7+z6BHA6qEAeTaE+jO363EPE2Gfb67u8uV+dDSGYsY8rZXLX1r6aMBvDtsegrQPrX0E6B9Zh78AnvcWQR/i72nzPO/tHQDYW88Neg9M0ACg3VR972lr5AxYQ5I4wxyNayG3sEIE+ifsaizjR/glUHWU/D5heetJUOZZNICpzFwed3hKGvanmAkQc175OAa3nWE9QobVwb+5OUK4Gp4dh5YCxLIvmW8LvE/ZanFV89ilmabHrpqrK1YKqWUlkOXrWN9yurmGrRgmaDB+qKTb2AQWotoWsPjqM6UjlRBNUOLOkPRtjGkJzmG2EdDSEqVrrUK1O1zBaDO4TgLGDFDrWg8DQTV3oqVjZAOd8hwonpGOtAcZdCBeoQaMl6KlE7yHNILabQVqzsZrMsbCO0xGAk7BGgN5o+wVgUAkBnenYBHamn/qabEbE/FHGzKvF85vH3DdFUM8NIj87GQK4Gz77Nos+3N62UK7GLGjwJgA2w2A0PXQ8PVKZpGCaFq5imzgCZCdoEF+IxYrcmgRMacSRqaorNkkVIIh3OdvZTh/7jHcYIbbA45KjhvEbj2ENE6NbyvgedyYAE/FgD6BqVEmUqWrKkIGXuYG7NulHeEtad75JHKDTY3nJ98wGfw7m1ApFVwrlvR6emeFwOmWkrnxdiWHiOR/mpxjrG17LGjeCtLyjOlRapbFTzuAqBNAoEukUqPA6PJxavokSEmBscv2KHadRvCu9LCUmf/6iUGhlsC6qAS5kHX4nQfqtDIER2mBqRgkXbFaqzvjDdmtaGxOISK+g99jxSZIuIUc/yFI0UOWbrXFuMppEhNRsvFJsqThkaG2wHF8rcpClNPyxuja6KO88RwuKRvhSc92m4o+lwjLXCo1+x2IrQm5yLyqDGqAjOGdMaNaIqinQe8ME4sXl4a0q6pJkyi/zvogLofeF+6zxxqHHjhmzmcM2Zp01RagnHZeSK3/LPoAW/BHWPtuE56jNHn/tIaCL8FGABiwFIr1o/zOgAAAABJRU5ErkJggg=="
		var anchorList = ['index_classify_list','rec_courses','weizhuanti','hot-spot','community','cooperation']
		//fixedsidebar 高度控制
		var baseH = 49.4,liCount;
		var Tplsignin = $('#fixedsideBar').html();
        var pObj = {
            popup1: {
                html: '<div style="width: 168px;"><h3>学堂在线 APP</h3><img src="data:image/png;base64,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UmVhZHlxyWU8AAADc2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjgzY2QwZmNhLWUxMmYtNDRmZS05YmE3LTgxNWEzOTNmYTNhZiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowM0VBQjgwODNEOEYxMUU1QUQ2RkY3RDVCNENFMzk0OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowM0VBQjgwNzNEOEYxMUU1QUQ2RkY3RDVCNENFMzk0OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMzhkMDJiYy0wN2VjLTQ4ZjMtYmE4OS1jYmM3ZTdmMmY2M2UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODNjZDBmY2EtZTEyZi00NGZlLTliYTctODE1YTM5M2ZhM2FmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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" style="display: block;" /></div>',
                inline: true,
                position: 'left center',
                preserve: true,
                hoverable: true,
                bcolor:'#eee',
                delay: {
                    show: 50,
                    hide: 100
                },
            },
            popup2: {
                html: '<div class="signinTip" ><div class="signinTip_wrap"><p class="tip">每日签到</p><img id="imgTip" class="imgTip" style="position:relative;right:-37px;" src="' + siginTip + ' " /></div><p class="tip1">本月已坚持签到<em id="siginDay">' + signinDay + '</em>天</p><button id="btnSignin" class="ui button signin">立即签到</button><p class="rule"><a id="showRule" href="" target="blank">查看规则</a></p><p class="shareSquare"><input id="shareSquare" type="checkbox" name="shareSquare" value="" checked="checked" />分享到广场</p></div>',
                inline: true,
                position: 'left center',
                preserve: true,
                hoverable: true,
                delay: {
                    show: 50,
                    hide: 100
                },
            },
            popup3: {
                html: '<div class="share_box"><p class="title">分享到...</p><div class="icon"><a href="javascript:" class="weixin xt_fixed_sidebar_weixin" target="_blank">B</a><a href="javascript:" class="sina xt_fixed_sidebar_sina" target="_blank">r</a><a href="javascript:" class="zone xt_fixed_sidebar_zone" target="_blank">E</a><a href="javascript:" class="dou xt_fixed_sidebar_dou" target="_blank">D</a></div></div>',
                inline: true,
                position: 'left center',
                preserve: true,
                hoverable: true,
                delay: {
                    show: 50,
                    hide: 100
                },
            }
        }

		var init = function() {
			initEle()
			//setSidebarHeight()
			initEvent()
			isShowSideBar($(window).scrollTop());
			initPlugin()
			setAttr()
			initVisible()
			getSigninStatus()
		}

		// var setSidebarHeight = function() {
		// 	$sidebar.css({'height':baseH *  liCount})
		// }

		var initEle = function() {
			_HTML = _.template(Tplsignin)({
                isHomepage: location.pathname === '/',
                isCourseabout:!!$('#xt_september_newedition_courseabout').length
            })
			$sidebar = $(_HTML).appendTo('body')
			sidebarHeight = $sidebar.height()
			footerOffset = $('#footer_bootstrap').offset().top
			winHeight = $(window).height()
			$text = $sidebar.find('.text_description')
			$lilist = $sidebar.find('li')
			liCount = $lilist.length
			$gototop = $sidebar.find('.xt_fixed_sidebar_go_to_top')
			$downAppEle = $sidebar.find('.xt_fixed_sidebar_7_2x')
			$signinEle = $sidebar.find('.xt_fixed_sidebar_signin')
			$pContent = $signinEle.find('p')
			$rule = $('.rule')
			$share = $('#a_share')

		}
		var sharehttp =  function (platformName){
			return "http://www.jiathis.com/send/?webid="+platformName+"&url="+encodeURIComponent(location.href)+"&title="+$('#xt_september_newedition_courseabout').find('h3').text()+"&summary="+$('#course_data').find('.course_intro .text').text();
		}
		var setAttr = function(){
			$('.xt_fixed_sidebar_weixin').attr("href",sharehttp('weixin'));
			$('.xt_fixed_sidebar_zone').attr("href",sharehttp('qzone'));
			$('.xt_fixed_sidebar_sina').attr("href",sharehttp('tsina'));
			$('.xt_fixed_sidebar_dou').attr("href",sharehttp('douban'));
		}
		var initEvent = function() {

			$(document).on('click','#shareSquare', function(e) {shareSquare(e)})
			$(document).on('click','#a_index_classify_list,#a_rec_courses,#a_weizhuanti,#a_hot-spot,#a_community,#a_cooperation',function(e) {
				animateAnchorPoint(e)
			})

			$(window).on('resize', function() { winHeight = $(window).height() })
			$(window).on('scroll', function() { isShowSideBar($(window).scrollTop()) })
			$text.on('mouseout', function() { $(this).hide()})
			$lilist.on('mouseover', function() {$text.hide();$(this).children().show()})
			$gototop.on('click', function() {$('html, body').stop().animate({scrollTop: 0});});
		}

        var initPlugin = function() {
            $downAppEle.popup(pObj.popup1)
            $signinEle.popup(pObj.popup2)
            $share.popup(pObj.popup3)
        }

        var initVisible = function() {
        	for(var i = 0,l=anchorList.length;i < l;i++) {
        		if(!$('#' + anchorList[i]).length) {
        			$('#' + 'a_' +  anchorList[i]).css({display:'none'})
        		}

        	}
        }


        /******************************** handle **********************************/

		//action锚点
		var animateAnchorPoint = function(e) {
			var ele ,pos;
			ele = $(e.target).closest("li").attr('id').replace(/a_/,"")
			if(ele == 'index_classify_list') {
				pos = $('#' + ele).offset().top	- 170
			} else {
				pos = $('#' + ele).offset().top
			}
			$("html,body").stop().animate({scrollTop: pos}, 1000)
		}

        var isShowSideBar = function(scrollTop) {
            footerOffset = $('#footer_bootstrap').offset().top;
            if (scrollTop > 400) {
                $sidebar.show()
            } else {
                $sidebar.hide()
            }
            if (scrollTop > (footerOffset - winHeight)) {
                $sidebar.css({
                    position: 'absolute',
                    top: footerOffset - $sidebar.find('ul').height() - 50
                })
            } else {
                $sidebar.css({
                    position: 'fixed',
                    top: 'auto'
                });
            }
        };

		var ajaxData = function(url,type,data,cbk) {

            $.ajax({
                type: type,
                url: url,
                data : data,
                dataType: "json",
                success: function(res) {
                    cbk(res);
                },
                error: function(res) {
                    cbk(res)
                }
            });
		}

		var shareSquare = function(e) {
			boolSquare = $(e.target).is(':checked')
		}

		var tmpBool
		var notAllow = function() {
			tmpBool ? (function() {$('#btnSignin').removeClass('signin').addClass('unsignin').data('data-sign',false) })() : (function() {$('#btnSignin').removeClass('unsignin').addClass('signin').data('data-sign',true)})()
		}

		var getSigninStatus = function() {
			ajaxData('/api/web/signin/','GET', '', function(res) {
				if(res.status == 401) {
                    res = JSON.parse(res.responseText);
					$rule.css({'visibility':'hidden'});
					$pContent.empty().html(unsignin);
					$(document).on('click','#btnSignin',function(e) { $(document).trigger('goToLogin')});
                    $('#showRule').attr('href',res.post_url != "" ? res.post_url : $rule.css({'visibility':'hidden'}));
				} else {
					tmpBool = res.is_signed_today
					$pContent.empty().html(tmpBool == true ? signin : unsignin)
					$('#btnSignin').empty().html(tmpBool == true ? signin1 : unsignin1 )
					$('#showRule').attr('href',res.post_url != "" ? res.post_url : $rule.css({'visibility':'hidden'}))
					notAllow()
					// tmpBool ? (function() { $('.xt_fixed_sidebar_signin:after').css({borderTopColor:'#e3e3e3'}) ;$signinEle.css({backgroundColor:'#e3e3e3'})})() : ""
					$(document).on('click','#btnSignin',function(e) {
						if($(e.target).data("data-sign")) {
							btnSignin()
						}
					});
				}
				$('#siginDay').empty().html(res.signin_days || signinDay )
			})
		}

		var btnSignin = function(e) {
			ajaxData('/api/web/signin/', 'POST', {"comment": boolSquare}, function(res) {
				$('#siginDay').empty().html(res.signin_days)
				tmpBool = res.is_signed_today
				notAllow()
				$pContent.empty().html(tmpBool == true ? signin : unsignin)
				$('#btnSignin').empty().html(tmpBool == true ? signin1 : unsignin1 )
			})
		}

		init()
	}
	fixedSidebar();
	$(function() {
		var fn = function() {
            $.ajax({
                type: 'GET',
                url: '/repair/switch',
                dataType: "json",
                success: function(res) {
                    if (res.statusCode > 0 && res.switch == "1") {
						window.location.href= "/repair"
                    }
                    if(res.statusCode > 0 && res.switch == "0") {
                     	window.location.href= "/about#contact"
                    }
                },
                error: function(res) {
                	if(res.status == 401) {
                		$(document).trigger('goToLogin')
                		$(document).on('userDataForSend',function(event, param){
							param.next = "/repair";
						});
                	}
                }
            });
		}

		$($(".header_top_bar_text.fl").find("a[data-element=3]")[2]).click(function() {
			fn()
		})

		$("#a_feedback a").click(function() {
			fn()
		})
	})