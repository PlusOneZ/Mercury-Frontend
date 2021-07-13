<template>
    <div class="catbox">

        <table id="FavoritesTable">
            <thead>
                <tr>

                    <th>商品</th>
                    <th>单价</th>

                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>

                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品0</span></td>
                    <td class="price">5999.88</td>
                    <!-- <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">5999.88</td> -->
                    <td class="operation"><span class="delete">删除\xa0\xa0</span><span class="shop">去店铺\xa0\xa0</span></td>
                </tr>
                <tr>

                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品1</span></td>
                    <td class="price">3888.50</td>
                    <!-- <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">3888.50</td> -->
                    <td class="operation"><span class="delete">删除\xa0\xa0</span><span class="shop">去店铺\xa0\xa0</span></td>
                </tr>
                <tr>

                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品2</span></td>
                    <td class="price">1428.50</td>
                    <!-- <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">1428.50</td> -->
                   <td class="operation"><span class="delete">删除\xa0\xa0</span><span class="shop">去店铺\xa0\xa0</span></td>
                </tr>
                <tr>

                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品3</span></td>
                    <td class="price">640.60</td>
                    <!-- <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">640.60</td> -->
                    <td class="operation"><span class="delete">删除\xa0\xa0</span><span class="shop">去店铺\xa0\xa0</span></td>
                </tr>
            </tbody>
        </table>

        <!-- <div class="foot" id="foot">
            <label class="fl select-all"><input type="checkbox" class="check-all check"/> 全选</label>
            <a class="fl delete" id="deleteAll" href="javascript:;">删除</a>
            <div class="fr closing">结 算</div>
            <div class="fr total">合计：￥<span id="priceTotal">0.00</span></div>
            <div class="fr selected" id="selected">已选商品<span id="selectedTotal">0</span>件<span class="arrow up">︽</span><span class="arrow down">︾</span></div>
            <div class="selected-view">
                <div id="selectedViewList" class="clearfix">
                    <div><img src="images/1.jpg"><span>取消选择</span></div>
                </div>
                <span class="arrow">◆<span>◆</span></span>
            </div>
        </div> -->

    </div>
</template>

  <script>
        window.onload = function() {
            if (!document.getElementsByClassName) {
                document.getElementsByClassName = function(cls) {
                    var ret = [];
                    var els = document.getElementsByTagName('*');
                    for (var i = 0, len = els.length; i < len; i++) {

                        if (els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
                            ret.push(els[i]);
                        }
                    }
                    return ret;
                }
            }

            var table = document.getElementById('FavoritesTable'); // 我的收藏表格
            console.log(table);

            var tr = table.children[1].rows; //行


            //为每行元素添加事件
            for (var i = 0; i < tr.length; i++) {
                //将点击事件绑定到tr元素
                tr[i].onclick = function(e) {
                        var e = e || window.event;
                        var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
                        var cls = el.className; //触发元素的class

                        console.log('1');
                        //通过判断触发元素的class确定用户点击了哪个元素
                        switch (cls) {
                            case 'delete': //点击了删除
                                var conf = confirm('确定删除此商品吗？');
                                if (conf) {
                                    this.parentNode.removeChild(this);
                                }
                                break;
                            case 'shop': //点击了去店铺
                                var conf = confirm('确定转到店铺吗？');
                                if (conf) {
                                    location.replace("https://www.xxx.cn"); //店铺网址
                                }
                                break;

                        }
                        getTotal();
                    }
                    // 给数目输入框绑定keyup事件

            }
        }
    </script>





<style>
    * {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    a {
        color: #666;
        text-decoration: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
        border: 0;
    }

    body {
        color: #666;
        font: 12px/180% Arial, Helvetica, sans-serif, "新宋体";
    }

    clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
    }

    .clearfix {
        display: inline-table
    }

    *html .clearfix {
        height: 1%
    }

    .clearfix {
        display: block
    }

    *+html .clearfix {
        min-height: 1%
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .catbox {
        width: 940px;
        margin: 0 auto;
    }

    .catbox table {
        text-align: center;
        width: 100%;
    }

    .catbox table th,
    .catbox table td {
        border: 1px solid #CADEFF;
    }

    .catbox table th {
        background: #e2f2ff;
        border-top: 3px solid #a7cbff;
        height: 30px;
    }

    .catbox table td {
        padding: 10px;
        color: #444;
    }

    .catbox table tbody tr:hover {
        background: RGB(238, 246, 255);
    }

    .checkbox {
        width: 60px;
    }

    .goods {
        width: 300px;
    }

    .goods span {
        width: 180px;
        margin-top: 20px;
        text-align: left;
        float: left;
    }

    .goods img {
        width: 100px;
        height: 80px;
        margin-right: 10px;
        float: left;
    }

    .price {
        width: 130px;
    }

    .count {
        width: 90px;
    }

    .count .add,
    .count input,
    .count .reduce {
        float: left;
        margin-right: -1px;
        position: relative;
        z-index: 0;
    }

    .count .add,
    .count .reduce {
        height: 23px;
        width: 17px;
        border: 1px solid #e5e5e5;
        background: #f0f0f0;
        text-align: center;
        line-height: 23px;
        color: #444;
    }

    .count .add:hover,
    .count .reduce:hover {
        color: #f50;
        z-index: 3;
        border-color: #f60;
        cursor: pointer;
    }

    .count input {
        width: 50px;
        height: 15px;
        line-height: 15px;
        border: 1px solid #aaa;
        color: #343434;
        text-align: center;
        padding: 4px 0;
        background-color: #fff;
        z-index: 2;
    }

    .subtotal {
        width: 150px;
        color: red;
        font-weight: bold;
    }

    .operation span:hover,
    a:hover {
        cursor: pointer;
        color: red;
        text-decoration: underline;
    }

    .foot {
        margin-top: 10px;
        color: #666;
        height: 48px;
        border: 1px solid #c8c8c8;
        background-color: #eaeaea;
        background-image: linear-gradient(RGB(241, 241, 241), RGB(226, 226, 226));
        position: relative;
        z-index: 8;
    }

    .foot div,
    .foot a {
        line-height: 48px;
        height: 48px;
    }

    .foot .select-all {
        width: 100px;
        height: 48px;
        line-height: 48px;
        padding-left: 5px;
        color: #666;
    }

    .foot .closing {
        border-left: 1px solid #c8c8c8;
        width: 100px;
        text-align: center;
        color: #000;
        font-weight: bold;
        background: RGB(238, 238, 238);
        cursor: pointer;
    }

    .foot .total {
        margin: 0 20px;
        cursor: pointer;
    }

    .foot #priceTotal,
    .foot #selectedTotal {
        color: red;
        font-family: "Microsoft Yahei";
        font-weight: bold;
    }

    .foot .selected {
        cursor: pointer;
    }

    .foot .selected .arrow {
        position: relative;
        top: -3px;
        margin-left: 3px;
    }

    .foot .selected .down {
        position: relative;
        top: 3px;
        display: none;
    }

    .show .selected .down {
        display: inline;
    }

    .show .selected .up {
        display: none;
    }

    .foot .selected:hover .arrow {
        color: red;
    }

    .foot .selected-view {
        width: 935px;
        border: 1px solid #c8c8c8;
        position: absolute;
        height: auto;
        background: #ffffff;
        z-index: 9;
        bottom: 48px;
        left: -1px;
        display: none;
    }

    .show .selected-view {
        display: block;
    }

    .foot .selected-view div {
        height: auto;
    }

    .foot .selected-view .arrow {
        font-size: 16px;
        line-height: 100%;
        color: #c8c8c8;
        position: absolute;
        right: 330px;
        bottom: -9px;
    }

    .foot .selected-view .arrow span {
        color: #ffffff;
        position: absolute;
        left: 0px;
        bottom: 1px;
    }

    #selectedViewList {
        padding: 10px 20px 10px 20px;
    }

    #selectedViewList div {
        display: inline-block;
        position: relative;
        width: 100px;
        height: 80px;
        border: 1px solid #ccc;
        margin: 10px;
        float: left;
    }

    #selectedViewList div img {
        width: 100px;
        height: 80px;
        margin-right: 10px;
        float: left;
    }

    #selectedViewList div span {
        display: none;
        color: #ffffff;
        font-size: 12px;
        position: absolute;
        top: 0px;
        right: 0px;
        width: 60px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        background: #000;
        cursor: pointer;
    }

    #selectedViewList div:hover span {
        display: block;
    }
</style>