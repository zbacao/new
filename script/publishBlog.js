/**
 * Created by Administrator on 2016-07-27.
 */
$(function() {

    //这里是富文本框里面的内容接口
    $("#backPrevPage").on("click",function(){
    //$("#publicBlog").on("click",function(){
        //获取富文本框里面的内容
        var articalData=encodeURI($("#Editor_Editor").html());
        console.log(articalData);
        $.ajax({
            url:"http://www.yuan.com/text.php",
            type:"POST",
            dataType:"json",
            data:{
                sendData:articalData
            },
            beforeSend:function(){
                console.log("发送之前");
            },
            success:function(data){
                console.log(data);
            },
            complete:function(){
                console.log("发送之后");
            },
            error:function(error){
                console.log(error);
            }
        });
    });


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

        //点击推荐标签后生成标签并显示
        $(".recommend-label a").on("click", function () {
            $(ipva).parent().find(".disp").append('<span id="dc" class="sort"  style="  background: rgb(16,157,89);  white-space: nowrap; border-radius:3px; float: left;  display: block; padding-left: 5px; margin: 8px;  height: 22px;  font-size: 14px;  color: #fff;  text-indent: 0; "><div  id="dart"  style="padding:0px 6px; cursor:pointer; height:22px; display:block; float:left;   line-height:22px;">' + $(this).html() + '</div><img class="close" src="indexImg/close2.png" style="float:left; display:block; cursor:pointer; " /></span>');
            $(ipva).val("");

            again();
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
                    console.log($(".ipva"));
                }
            });
        }

        $(iInp).on("click",function(){
            $(this).find(".ipva").css("display","block");
            $(this).find(".ipva").focus();
        });

    })();
    //添加和移除标签  end

    //上传音乐按钮的模拟点击  start
    $(".upload-music i").on("click",function(){
        $(".input-of-btn").trigger("click");
    });

    $(".input-of-btn").on("change",function(){
        var fileName = $(".input-of-btn").val().substring(12);
        $(".music-name").html(fileName).val();
    });
    //上传音乐按钮的模拟点击  end

    //右上角分类菜单  start
    $(".pb-header .cate").on("mouseover",function(){
        $(".cate-nav").css({
            display:"block"
        });
    });

    var cateNav=$(".cate-nav");
    $(cateNav).on("mouseover",function(){
        $(this).css({
            display:"block"
        });
    });
    $(cateNav).on("mouseout",function(){
        $(this).css({
            display:"none"
        });
    });
    //右上角分类菜单  end

});



