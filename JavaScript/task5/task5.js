/**
 * Created by zeng on 2017/3/21.
 */
var myArr=[];
var count=0;//用于计算数列中数字的个数
//var sortOk=false;
var txt=document.getElementById("input");


//初始化
function initial(){
    //获取元素节点

    var btnLeftIn=document.getElementById("btn-left-in");
    var btnRightIn=document.getElementById("btn-right-in");
    var btnLeftOut=document.getElementById("btn-left-out");
    var btnRightOut=document.getElementById("btn-right-out");

    initInput();

    //"左侧入"绑定单击事件
    btnLeftIn.addEventListener("click",function(){
        //左侧插入并显示
        leftIn(txt.value);
        render(myArr);
        initInput();
    },false);

    //"右侧入"绑定单击事件
    btnRightIn.addEventListener("click",function(){
        rightIn(txt.value);
        render(myArr);
        initInput();
    },false);

    //"左侧出"绑定单击事件
    btnLeftOut.addEventListener("click",function(){
        myArr.shift();
        count--;
        render(myArr);
        initInput();
    },false);

    //"右侧出"绑定单击事件
    btnRightOut.addEventListener("click",function(){
        myArr.pop();
        count--;
        render(myArr);
        initInput();
    },false);

    //1 冒泡排序
    var btnBubble=document.getElementById("btnBubble");
    btnBubble.addEventListener("click",function(){
        sortAnimation(bubbleSort,stateBubble);

    },false);

    //2 插入排序
    var btnInsert=document.getElementById("btnInsert");
    btnInsert.addEventListener("click",function(){
        sortAnimation(insertSort,stateInsert);
    },false);

    //3 选择排序
    var btnSelect=document.getElementById("btnSelect");
    btnSelect.addEventListener("click",function(){
        sortAnimation(selectSort,stateSelect);
    },false);

    //4 快速排序
    var btnQuick=document.getElementById("btnQuick");
    btnQuick.addEventListener("click", function () {
        //sortAnimation(quickSort,stateQuick);该过程目前还没想出如何展示出可视化的过程
        var copyArr=myArr.slice();
        var resultQuick=quickSort(copyArr);
        render(resultQuick);
    });

    //5 归并排序
    var btnMerge=document.getElementById("btnMerge");
    btnMerge.addEventListener("click",function(){
        var resultMerge=mergeSort(myArr);
        render(resultMerge);
    },false);

    //6 希尔排序
    var btnShell=document.getElementById("btnShell");
    btnShell.addEventListener("click",function(){
        var copyArr3=myArr.slice();//将myArr数组赋值给copyArr3,避免直接在myArr上进行希尔排序
        var resultShell=shellSort(copyArr3);
        render(resultShell);
    },false);
}


function leftIn(num){
    var flag=vertify(num);
    if(flag==true){
        if(count<60){
            myArr.unshift(num);
            count++;
        }else{
            alert("队列元素超出60个，不能再添加");
        }
    }
}

function rightIn(num){
    var flag=vertify(num);
    if(flag==true){
        if(count<60){
            myArr.push(num);
            count++;
        }else{
            alert("队列元素超出60个，不能再添加");
        }
    }
}

//验证文本框中的值
function vertify(str){
    if(str==""){
        alert("请输入要插入的值");
        return false;
    }else if(isNaN(str)){
        alert("请输入数字！");
        return false;
    }else if(Number(str)<10||Number(str)>100){
        alert("请输入10-100以内的整数");
        return false;
    }else{
        return true;
    }

}

//input初始化
function initInput(){
    txt.value="";
    txt.focus();
}

//创建要显示的li列表,并追加到ul中
function render(arr){
    ul=document.getElementById("showArray");
    //应先将ul的innerHTML内容清除；
    ul.innerHTML="";

    for(var i=0;i<arr.length;i++){
        var li=document.createElement("li");
        li.innerHTML = arr[i];
        li.id="item-"+i;//设置li的id值
        li.style.height=arr[i]*2+"px";
        li.setAttribute("class", "liStyle");
        ul.appendChild(li);

        //执行li单击删除操作
        deleteSelected(arr,i);
    }
}


//给每一个添加的li添加点击事件(点击即删除)
function deleteSelected(arr,i){
    var temp=document.getElementById("item-"+i);
    temp.addEventListener("click",function(){
        var index=temp.id.substr(5);//获取删除元素的起始索引位置,i
        arr.splice(index,1);//删除arr数组索引值为index的元素
        render(arr);
        initInput();
    },false);
}


//冒泡排序
var stateBubble=[];//存储冒泡排序的每一步状态的数组
function bubbleSort(arr){
    for(var n=0;n<arr.length-1;n++){
        for(var j=0;j<arr.length-1-n;j++){
            if(arr[j+1]<arr[j]){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
            //每交换一次相邻的数字，就将该对应的数组和交换的j值存储在状态数组中
            stateBubble.push(JSON.parse(JSON.stringify(arr)));
        }
        stateInsert.push(JSON.parse(JSON.stringify(arr)));
    }
    stateInsert.push(JSON.parse(JSON.stringify(arr)));
}

//插入排序
var stateInsert=[];
function insertSort(arr){
    //假设第0个元素是一个有序的数列，第0个以后的是无序的序列
    //所以从第1个元素开始将无序数列的元素插入到有序数列中
    for(var i=1;i<arr.length;i++){
        if(arr[i]<arr[i-1]){
            var guard=arr[i];//取出第i个元素，作为被插入有序数列的元素
            var j=i-1;//记住有序数列的最后一个位置
            //比大小，找到被插入元素应该插入的位置:j+1
            while(j>=0 && guard<arr[j]){
                arr[j+1]=arr[j];
                j--;
            }
            arr[j+1]=guard;
        }
        stateInsert.push(JSON.parse(JSON.stringify(arr)));
    }
    stateInsert.push(JSON.parse(JSON.stringify(arr)));
}

//选择排序
var stateSelect=[];
function selectSort(arr){
    for(var i=0;i<arr.length-1;i++){
        var minIndex=i;//将i作为未排序数列中最小值的索引
        for(var j=i+1;j<arr.length;j++){//寻找最小的数
            if(arr[j]<arr[minIndex]){
                minIndex=j;      //将最小值的索引保存在minIndex中
            }
        }
        var temp=arr[minIndex];
        arr[minIndex]=arr[i];
        arr[i]=temp;
        stateSelect.push(JSON.parse(JSON.stringify(arr)));
    }
    stateSelect.push(JSON.parse(JSON.stringify(arr)));
}

//快速排序
//var stateQuick=[];
function quickSort(arr){
    if(arr.length<=1){
        return arr;
    }
    //选择“基准”(pivot)，并将其与原数组分离，再定义两个空数组，用来存放一左一右的两个子集
    var pivotIndex=Math.floor(arr.length/2);//取基准值的下标
    var pivot=arr.splice(pivotIndex,1)[0];//取基准值
    var left=[];//左边数组
    var right=[];//右边数组
    for(var i=0;i<arr.length;i++){
        if(arr[i]<pivot){//如果数组元素小于基准值，放在左边数组
            left.push(arr[i]);
        }else{//放在右边数组
            right.push(arr[i]);
        }
    }
    //递归调用，直到所有的细分数组都只有一个元素
    return quickSort(left).concat([pivot],quickSort(right));
}

//归并排序
function mergeSort(arr){//采用自上而下的递归方法
    var len=arr.length;
    if(len<2){
        return arr;
    }
    var middle=Math.floor(len/2),
        left=arr.slice(0,middle),
        right=arr.slice(middle);
    return merge(mergeSort(left),mergeSort(right));
}
function merge(left,right){
    var result=[];
    while(left.length && right.length){
        if(left[0]<=right[0]){
            result.push(left.shift());
        } else{
            result.push(right.shift());
        }
    }
    while(left.length){
        result.push(left.shift());
    }
    while(right.length){
        result.push(right.shift());
    }
    return result;
}

//希尔排序
function shellSort(arr){
    var len =arr.length;
    gap = Math.floor(len/2);
    while(gap!==0){
        for(var i = gap;i<len;i++){
            var temp = arr[i];
            var j;
            for(j=i-gap;j>=0&&temp<arr[j];j-=gap){
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
        gap=Math.floor(gap/2);
    }
    return arr;
}

//排序可视化过程:sortAlgorithm为某种排序算法，stateKind为某种排序的状态数组
function sortAnimation(sortAlgorithm,stateKind){
    var resArr=myArr.slice();
    sortAlgorithm(resArr);//排序后状态数组就存储了对应的每一步交换后的状态数组
    var stateArr;//用于存储每种状态的数组
    var timer=setInterval(function(){//每一百秒取一次state中的第一个数组
        stateArr=stateKind.shift();//从状态数组集合中取出第一次交换后的数组的状态
        if(stateKind.length>0){
            render(stateArr);
        }else{
            clearInterval(timer);
        }
    },100);
}

window.addEventListener("load",initial,false);