// 搜索板块  所需参数sign_str、user_id、friend_user_id
var btn = document.querySelector('.btn');
var id = localStorage.getItem('user_id');
var sign_str = localStorage.getItem('sign_str');
var friend_text = document.querySelector('.friend_text');

var chatList = document.querySelector('.chatList')

btn.onclick = function () {
    chatList.innerHTML = "";
    // console.log(friend_text.value)
    var search_text = friend_text.value;

    var data = {
        search_text: search_text,
        sign_str: sign_str,
        user_id: id
    }
    // console.log('1',sign_str)
    $.ajax({
        type: "get",
        url: "http://118.24.25.7/chat_api/interface/getSearchUsers.php",
        data: data,
        success: function (res) {
            // console.log(res)
            if (res.code == 0) {
                
                for (var i = 0; i < res.data.length; i++) {
                chatList.innerHTML += ` 
                    <div class="listW">
                        <div class="result">
                            <div class="addId">ID:${res.data[i].id}</div>
                            <div class="addNickname">昵称：${res.data[i].nickname}</div>
                        </div>
                        <div class="add1"><button class ="add">添加</button></div>
                    </div>`;
                }
                var add = document.querySelectorAll('.add')
                // console.log(add)
                $('.add').click( function(){
                    // 结构冗杂，需要精简
                    var pp = $(this).parent().parent().children().children(".addId")
                    // console.log(pp)
                    var strI = pp[0].innerHTML
                    var friend_user_id = strI.slice(3)
                    console.log(friend_user_id)
                    var data = {
                        friend_user_id: friend_user_id,
                        sign_str: sign_str,
                        user_id: id
                    }
                    $.ajax({
                        type: "post",
                        url: "http://118.24.25.7/chat_api/interface/addFriend.php",
                        data: data,
                        success: function (res) {
                            if (res.code == 0) {
                                // console.log('3',res.data.sign_str)
                                console.log(res.msg)
                            }
                        }
                    })
                })
            }
        }
    })
};



