/**
 * Created by Administrator on 2016-08-03.
 */
$(function(){

    /**
     * Created by Administrator on 2016-07-27.
     */
    $(function() {

        //点击输入框后默认文本消失 start
        //var inputBlogTitle = $("#input_blog_title");
        //inputBlogTitle.on("click", function () {
        //    if (inputBlogTitle.get(0).placeholder === "请输入标题（必填）") {
        //        $(this).css("color", "#000");
        //        $(this).get(0).placeholder = "";
        //    }
        //});
        //点击输入框后默认文本消失 end

        //添加和移除标签  start
        (function(){
            var labelInput = $(".disp");
            var ipva=$(".ipva");
            var iInp=$(".i_inp");

            //按下回车键生成标签
            $(ipva).on("keypress", function () {
                if (window.event) {
                    oEvent = window.event;		//处理兼容性，获得事件对象
                    //设置IE的charCode值
                    oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
                }
                if (oEvent.keyCode == 13) {
                    var rds = $(this).val();
                    var parten = /^\s*$/;
                    if (parten.test(rds)) {
                    } else {
                        //var sortable = $(".ui-sortable");

                        $(this).parent().find(".disp").append('<span id="dc" class="sort"  style="  background: rgb(16,157,89);  white-space: nowrap; border-radius:3px; float: left;  display: block; padding-left: 5px; margin: 8px;  height: 22px;  font-size: 14px;  color: #fff;  text-indent: 0; "><div  id="dart"  style="padding:0px 6px; cursor:pointer; height:22px; display:block; float:left;   line-height:22px;">' + rds + '</div><img  class="close"  src="indexImg/close2.png" style="float:left; display:block; cursor:pointer; " /></span>');
                        $(this).val("");

                        again();
                    }
                }
            });


            function again(){
                //如果标签个数大于2个则移除输入框
                if ((labelInput.children().length - 1) > 2) {
                    $(".ipva").remove();
                }

                //点击关闭图标时移除当前标签，并加回输入框
                $(".close").on("click",function(){
                    console.log("haha");
                    $(this).parent().remove();
                    if((labelInput.children().length - 1) <3  &&  $(".ipva").length===0){
                        $(".i_inp").append("    <input class='ipva'   name=''    type='text'   />");
                    }
                });
            }

            $(iInp).on("click",function(){
                $(this).find(".ipva").css("display","block");
                $(this).find(".ipva").focus();
            });

        })();
        //添加和移除标签  end

    });


    //评论的回复框弹出事件
    $(".gs-comwhole").on("click",function(){
        if($(this).next('.gs-popreplay').length===0){
            var n = $(this).index(".gs-comwhole");
            // var cloneReply = $(".ts-popreplay").eq(0).clone(ture);
            var cloneEle = $('<div class="gs-popreplay"><div class="gspop-tri"></div><div class="gs-replaycont"><input type="text"><a href="javascript:;">回复</a></div><i></i></div>');
            cloneEle.insertAfter($(this));
            $(this).next('.gs-popreplay').stop().slideDown(300);
        }
        $(".gs-popreplay i").on("click",function(){
            $(this).parent().stop().slideUp(300,function(){
                $(this).remove();
            });
        });
        $(".gs-popreplay .gs-replaycont a").on("click",function(){
            var n = $(this).index(".gs-popreplay a");
            var str = $('.gs-popreplay input').val();
            if(!(str)){
                //这里提交回复触发ajax事件和添加回复事件。
            }
            $('.gs-popreplay').eq(n).on("click",function(){
                $(this).stop().slideUp(300,function(){
                    $(this).remove();
                });
            });
        });
    });

    //模拟点击音乐和图片上传 start
    $("#musicBtn").on("click",function(){
        $("#uploadMusic").trigger("click");
    });
    $("#picBtn").on("click",function(){
        $("#uploadPic").trigger("click");
    });
    $(".input-of-btn").on("change",function() {
        var fileName = $(this).val().substring(12);
        $("#txtEditor").get(0).value += fileName + " ";
    });
    //模拟点击音乐和图片上传 end
});