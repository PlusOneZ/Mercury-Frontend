<template>
    <div class="catbox">

        <table id="cartTable">
            <thead>
                <tr>
                    <th><label><input class="check-all check" type="checkbox"/> 全选</label></th>
                    <th>商品</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>小计</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品0</span></td>
                    <td class="price">5999.88</td>
                    <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">5999.88</td>
                    <td class="operation"><span class="delete">删除</span></td>
                </tr>
                <tr>
                    <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品1</span></td>
                    <td class="price">3888.50</td>
                    <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">3888.50</td>
                    <td class="operation"><span class="delete">删除</span></td>
                </tr>
                <tr>
                    <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品2</span></td>
                    <td class="price">1428.50</td>
                    <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">1428.50</td>
                    <td class="operation"><span class="delete">删除</span></td>
                </tr>
                <tr>
                    <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
                    <td class="goods"><img src="神超.jpg" alt="" /><span>商品3</span></td>
                    <td class="price">640.60</td>
                    <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1" /><span class="add">+</span></td>
                    <td class="subtotal">640.60</td>
                    <td class="operation"><span class="delete">删除</span></td>
                </tr>
            </tbody>
        </table>

        <div class="foot" id="foot">
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
        </div>

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

            var table = document.getElementById('cartTable'); // 购物车表格

            var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
            var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
            var tr = table.children[1].rows; //行
            var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
            var priceTotal = document.getElementById('priceTotal'); //总计
            var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
            var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
            var selected = document.getElementById('selected'); //已选商品
            var foot = document.getElementById('foot');

            // 更新总数和总价格，已选浮层
            function getTotal() {
                var seleted = 0;
                var price = 0;
                var HTMLstr = '';
                for (var i = 0, len = tr.length; i < len; i++) {
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].className = 'on';
                        seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                        price += parseFloat(tr[i].cells[4].innerHTML);
                        HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
                    } else {
                        tr[i].className = '';
                    }
                }

                selectedTotal.innerHTML = seleted;
                priceTotal.innerHTML = price.toFixed(2);
                selectedViewList.innerHTML = HTMLstr;

                if (seleted == 0) {
                    foot.className = 'foot';
                }
            }

            // 计算单行价格
            function getSubtotal(tr) {
                var cells = tr.cells;
                var price = cells[2]; //单价
                var subtotal = cells[4]; //小计td
                var countInput = tr.getElementsByTagName('input')[1]; //数目input
                var span = tr.getElementsByTagName('span')[1]; //-号
                //写入HTML
                subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
                //如果数目只有一个，把-号去掉
                if (countInput.value == 1) {
                    span.innerHTML = '';
                } else {
                    span.innerHTML = '-';
                }
            }

            // 点击选择框
            for (var i = 0; i < selectInputs.length; i++) {
                selectInputs[i].onclick = function() {
                    if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                        for (var j = 0; j < selectInputs.length; j++) {
                            selectInputs[j].checked = this.checked;
                        }
                    }
                    if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                        for (var i = 0; i < checkAllInputs.length; i++) {
                            checkAllInputs[i].checked = false;
                        }
                    }
                    getTotal(); //选完更新总计
                }
            }

            // 显示已选商品弹层
            selected.onclick = function() {
                if (selectedTotal.innerHTML != 0) {
                    foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
                }
            }

            //已选商品弹层中的取消选择按钮
            selectedViewList.onclick = function(e) {
                e = e || window.event;
                var el = e.srcElement;
                if (el.className == 'del') {
                    var input = tr[el.getAttribute('index')].getElementsByTagName('input')[0]
                    input.checked = false;
                    input.onclick();
                }
            }

            //为每行元素添加事件
            for (i = 0; i < tr.length; i++) {
                //将点击事件绑定到tr元素
                tr[i].onclick = function(e) {
                         e = e || window.event;
                        var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
                        var cls = el.className; //触发元素的class
                        var countInout = this.getElementsByTagName('input')[1]; // 数目input
                        var value = parseInt(countInout.value); //数目
                        //通过判断触发元素的class确定用户点击了哪个元素
                        switch (cls) {
                            case 'add': //点击了加号
                                countInout.value = value + 1;
                                getSubtotal(this);
                                break;
                            case 'reduce': //点击了减号
                                if (value > 1) {
                                    countInout.value = value - 1;
                                    getSubtotal(this);
                                }
                                break;
                            case 'delete': //点击了删除
                                var conf = confirm('确定删除此商品吗？');
                                if (conf) {
                                    this.parentNode.removeChild(this);
                                }
                                break;
                        }
                        getTotal();
                    }
                    // 给数目输入框绑定keyup事件
                tr[i].getElementsByTagName('input')[1].onkeyup = function() {
                    var val = parseInt(this.value);
                    if (isNaN(val) || val <= 0) {
                        val = 1;
                    }
                    if (this.value != val) {
                        this.value = val;
                    }
                    getSubtotal(this.parentNode.parentNode); //更新小计
                    getTotal(); //更新总数
                }
            }

            // 点击全部删除
            deleteAll.onclick = function() {
                if (selectedTotal.innerHTML != 0) {
                    var con = confirm('确定删除所选商品吗？'); //弹出确认框
                    if (con) {
                        for (var i = 0; i < tr.length; i++) {
                            // 如果被选中，就删除相应的行
                            if (tr[i].getElementsByTagName('input')[0].checked) {
                                tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                                i--; //回退下标位置
                            }
                        }
                    }
                } else {
                    alert('请选择商品！');
                }
                getTotal(); //更新总数
            }

            // 默认全选
            checkAllInputs[0].checked = true;
            checkAllInputs[0].onclick();
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
        width: 150px;
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
    