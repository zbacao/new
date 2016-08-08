$(function(){
    function musicplay() {
        //音乐播放控制
        var playerTimer=null;
        var audio = $('#aud')[0];
        if (audio.paused) {
            audio.play();
            audio.loop = true;
            $("#playbutton").attr("src", "indexImg/pause.png");
        } else {
            audio.pause();
            clearInterval(playerTimer);
            $("#playbutton").attr("src", "indexImg/play-btn_03.png");
        }

        //播放时间显示
        /**********计时器1(用来快速更新时间显示)**********/

        playerTimer = setInterval(function () {
            var playTime_s = audio.currentTime;
            var mTime = parseInt(playTime_s / 60);
            var sTime = parseInt(playTime_s % 60);

            var totalTime = audio.duration;
            var mTime_total = parseInt(totalTime / 60);
            var sTime_total = parseInt(totalTime % 60);

            var remainTime = totalTime - playTime_s;

            function checkTime(m, s) {
                if (m < 10) {
                    m = "0" + m;
                } else {
                    m += "";
                }

                if (s < 10) {
                    s = "0" + s;
                } else {
                    s += "";
                }
                return m + ":" + s;
            }

            var pagePassTime = checkTime(mTime, sTime);
            var pageTotalTime = checkTime(mTime_total, sTime_total);

            $("#passTime").html(pagePassTime);
            $("#totalTime").html(pageTotalTime);

            //进度条
            var playedTimePercent = playTime_s / totalTime;
            var remainTimePercent = remainTime / totalTime;
            if ((totalTime - playTime_s) > 0) {
                $(".progressBar-remain").width(remainTimePercent * 100 + "%");
                $(".progressBar-passed").width(playedTimePercent * 100 + "%");
            } else if ((totalTime - playTime_s) === 0) {
                $(".progressBar-passed").width(0);
                $(".progressBar-remain").width(100 + "%");
                audio.play();
            }
        }, 950);

        //交叉显示歌手头像照片
        //$(".song-pic:eq(0)").css("opacity", 1);
        //$(".song-details ul li").on("click",function(){
        //        var n=$(this).index(".song-details ul li");
        //        $(".song-pic").eq(n).css("opacity", 1).siblings(".song-pic").css("opacity", 0);
        //});
    }

    //控制播放按钮
    $("#playbtn").on("click",function(){
        musicplay();
    });
    //弹出框内的回复div事件
    $(".ts-popcomment").on("click",function(){
        if($(this).next('.ts-popreplay').length===0){
            var n = $(this).index(".ts-popcomment");
            // var cloneReply = $(".ts-popreplay").eq(0).clone(ture);
            var cloneEle = $('<div class="ts-popreplay clearfix"><div class="tspop-tri"></div><div class="ts-replaycont"><input type="text"><a href="javascript:;">回复</a></div><i></i></div>');
            cloneEle.insertAfter($(this));
            $(this).next('.gs-popreplay').stop().slideDown(300);
        }
        $(".ts-popreplay i").on("click",function(){
            $(this).parent().stop().slideUp(300,function(){
                $(this).remove();
            });
        });
        $(".ts-popreplay .ts-replaycont a").on("click",function(){
            var n = $(this).index(".ts-popreplay a");
            var str = $('.ts-popreplay input').val();
            if(!(str)){
                //这里提交回复触发ajax事件和添加回复事件。
            }
            $('.ts-popreplay').eq(n).on("click",function(){
                $(this).stop().slideUp(300,function(){
                    $(this).remove();
                });
            });
        });
    });

    //数据获取
    $.getJSON("json/movement.json",function(data){
        console.log(data);
        if(data){
            //音乐模块 start
            $("#song_title").html(data.song_module.song_title);
            $("#play_num").html(data.song_module.play_num);
            $(".song-pic>img").attr("src",data.song_module.song_pic);
            $("audio").attr("src",data.song_module.song_source);
            //运行播放器
            musicplay();
            $(".song-intro-cont").html(data.song_module.song_intro_cont);
            //音乐模块 end

            //文章模块 start
            $(".yj-artical>h3").html(data.artical.artical_title);
            $("#eye_num").html(data.artical.eye_num);
            $("#wei_chat_num").html(data.artical.wei_chat_num);
            $(".currentDate").html(data.artical.artical_create_time);
            $(".user-pre-cont").html(decodeURI(data.artical.artical_cont));

            if(data.labels){
                $(data.labels).each(function(index,ele){
                    $(".blog-labels").append('<span class="label">'+ele+'</span>');
                });
            }
            //文章模块 end

            //相关阅读模块 start
            $(".related-read-cont-show").each(function(index,ele){
                $(".related-read-pic").eq(index).attr("src",data.related_read[index].related_read_pic);
                $(".related-read-summary").eq(index).html(data.related_read[index].related_read_summary);
            });
            $("#blog_zan_num").html(data.zan_num);
            //其他阅读模块 end

            //点赞列表start
            if(data.who_zan){
                $(data.who_zan).each(function(index,ele){
                    $(".who-zan-list").append('<div class="who-zan-people"><img class="who-zan-people-head" src="'+ele.zan_icon+'"/><span class="who-zan-people-name">'+ele.zan_name+'</span><div>');
                });
            }
            //点赞列表 end

            $(".theme-pic img").attr("src",data.ad_pic);

            //评论区 start
            if(data.comment){
                $(data.comment).each(function(index,ele){
                    $(".blog-comment").append('<div class="ts-popcomment"><span class="ts-popcomicon"><img src="'+ele.user_icon+'"  alt=""/></span><div class="ts-comcont"><b>'+ele.user_name+'</b><i>'+ele.comment_time+'</i><p>'+ele.comment_cont+'</p><span class="ts-cardfoot-icon"><b class="ts-cardicon1"></b><i>'+ele.comment_zan+'</i><b class="ts-cardicon2"></b><i>'+ele.comment_look+'</i></span></div></div>');
                });
            }

            //评论区 end

            $("#tiezi_num").html(data.tiezi_num);
            $("#comment_num").html(data.comment_num);
            $("#concern_num").html(data.concern_num);

            //作者的其他文章 start
            if(data.other_articals){
                $(data.other_articals).each(function(index,ele){
                    $(".other-blog ul").append('<li><a href="" class="other-blog-lists">'+ele+'</a></li>');
                });
            }
            //作者的其他文章 end

            //热门推荐 start
            if(data.hot_recomment){
                $(data.hot_recomment).each(function(index,ele){
                    $(".hot-recomment ul").append('<li><a href="" class="other-blog-lists">'+ele+'</a></li>');
                });
            }
            //热门推荐 end
        }
    },"json");

    //实际传输数据的ajax
    //$.ajax({
    //    url:"http://www.yuan.com/text.php",
    //    type:"get",
    //    dataType:"json",
    //    beforeSend:function(){
    //        console.log("发送之前");
    //    },
    //    success:function(data){
    //        console.log(data);
    //        $(".user-pre-cont").html(decodeURI(data.content));
    //    },
    //    complete:function(){
    //        console.log("发送之后");
    //    },
    //    error:function(error){
    //        console.log(error);
    //    }
    //
    //});
});


