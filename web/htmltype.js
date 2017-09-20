document.onkeydown = typeGame;  //キー押下時に関数typeGame()を呼び出す


//文字を格納する配列
var moji = new Array("　","a","b","c","d","e","f","g","h","i",
                     "j","k","l","m","n","o","p","q","r",
                     "s","t","u","v","w","x","y","z");

//キーコードを格納する配列
var kcode = new Array(32,65,66,67,68,69,70,71,72,73,
                      74,75,76,77,78,79,80,81,82,
                      83,84,85,86,87,88,89,90);

var mojicode = {
    a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,
    l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,
    v:86,w:87,x:88,y:89,z:90,"-":189
}

//0～25までの乱数を格納する配列
var rnd = new Array();

//グローバル変数群
var mondaisuu = 42;     // 問題数を設定
var cntMax = 10;       // 全問題数
var arMondai = new Array (); //問題文列を格納
var mondai = "";       //問題を格納
var cnt=0;             //何問目か格納
var typStart,typEnd;   //開始時と終了時の時刻を格納
var tokuten = 0;       //得点
var mistype = 0;          // ミスの回数
var typnum = 0;        // 打キー数


//0～問題文列までの乱数を作成して配列rndに格納する関数
function ransu()
{
    for ( var i = 0 ; i < cntMax ; i++ )
    {
        rnd[i] = Math.floor( Math.random() * mondaisuu );
    }
}


//タイピングゲームの問題をセットする関数
function gameSet()
{
    // 初期化
    cnt = 0;
    tokuten = 0;
    typStart = "";
    typEnd = "";
    

    //乱数作成関数の呼び出し
    mondaiSet();
}

function mondaiSet()
{
    Mondai = Array(
        "html","body","color","div","class","main","abc","h1","ul","ol","table","li","tr","td","th","form","href","img","src","alt","width","height","br","padding","margin","left","right","clear","color","line-height","border-bottom","font-size","list-style-type","font-weight","text-decoration","display","background-color","background-image","background-position","background-irepeat","float","vertical-align"
    );

    ransu();
    mondai = Mondai[rnd[cnt]];
    //問題枠に表示する
    document.getElementById("waku").innerHTML = mondai;
}


//キー入力を受け取る関数
function typeGame(evt)
{
    var kc;  //入力されたキーコードを格納する変数
    typnum++;

    // ゲームスタート
    if ( typStart == ""){
        typStart = new Date();
    }
    
    //入力されたキーのキーコードを取得
    if (document.all)
    {
        kc = event.keyCode;
    }
    else
    {
        kc = evt.which;
    }
    
    var mondairetu = mondai;
    var mondaimoji = mondairetu.slice(0,1);
    
    //入力されたキーコードと、問題文のキーコードを比較
    //if (kc == kcode[ rnd[cnt] ])
    if (kc == mojicode[mondaimoji])
    {
        //以下、キーコードが一致した時の処理
        tokuten++;
        
        //最初の1文字が入力された時間を記録する
        if (cnt==0)
        {
            typStart = new Date();
        }

        mondai = mondai.slice(1);
        if( mondai == "" ){
            mondaiSet();
            tokuten++;
            cnt++;
        } else {
            document.getElementById("waku").innerHTML = mondai;            
        }

        if ( cnt == cntMax ) {
            typEnd = new Date();
            var typTime = (typEnd - typStart) / 1000;
            var endMoji = "タイピング速度：" + typTime + "秒<br />\n" +
                "正しく打てた数：" + tokuten + "点<br />\n"+
                "ミスタイプ： -" + mistype + "点<br />\n";
            
            document.getElementById("waku").innerHTML = endMoji;

            // 1割ミスしたらしかめモコちゃん
            if (( 0.1 > ( mistype / tokuten)) || (mistype == 0 )){
                document.getElementById("mokoimg").src = "./img/moko2.png";
            } else {
                document.getElementById("mokoimg").src = "./img/moko3.png";
            }
            document.onkeydown = "";
        }
    } else {
        mistype++;
    }
}
