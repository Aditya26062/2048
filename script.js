(function(){
let grid;
let score=0;
let maxscore =0 ;

let ngButton = document.querySelector('.newGame');
ngButton.addEventListener('click',newGame);
document.querySelector('.gameover').style.display = 'none'
function newGame() {
    // console.log("HEllo");
    score=0;
    document.querySelector('.gameover').style.display = 'none';
    document.querySelector('.container').style.color = 'black';
    start();
}

function start(){
    grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];
        addnumber();
        addnumber();
        display();

}


function isGameOver(){
    let f = true;
    for(let i= 0 ;i<4;i++)
    {
        for(let j=0;j<3;j++)
        {
            if(grid[i][j] == grid[i][j+1] || grid[i][j]==0 || grid[i][j+1]==0 ||grid[j][i] == grid[j+1][i])
            {
                f=false;break;
            }
        }
    }
    if(f){
        document.querySelector('.gameover').style.display = 'inline';
        document.querySelector('.container').style.color = 'rgb(0, 214, 214)';
    }
}

function addnumber()
{
    let options = [];
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            if(grid[i][j]===0){
                options.push({
                    x:i,
                    y:j
                });
            }
        }
    }
    if(options.length>0)
    {
        let o =Math.random();
        let l = options[Math.floor(Math.random()*options.length)];
        grid[l.x][l.y] = o>0.5?4:2;
    }
}

function display(){
    let scoreBlock = document.querySelector('.scoreValue');
    scoreBlock.textContent = score;

    let MaxscoreBlock = document.querySelector('.MscoreValue');
    
    if(parseInt(scoreBlock.textContent) > parseInt(MaxscoreBlock.textContent))
    {
        maxscore= score;
    }
    MaxscoreBlock.textContent = maxscore;
    
    let disg=document.querySelector('.container').childNodes;
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            if(grid[i][j]!=0){
                disg[2*(4*i+j)+1].textContent = grid[i][j];
            }
            else{
                disg[2*(4*i+j)+1].textContent = "";
            }
        }
    }
}

function left()
{
    isGameOver();
    //Left sliding operation
    let flag1=[false,false,false,false],flag2=true;
    for(let i=0;i<4;i++)
    {
        let iRow = [];
        let flag3=false;
        for(let j=0;j<4;j++)
        {
            if(grid[i][j]!=0)
            {
                iRow.push(grid[i][j]);
                if(flag3)
                {
                    flag2 = false;
                }
            }
            else{
                flag3 = true;
            }
        }
        let iRowL = iRow.length;
        // let iRow = grid[i].filter(val => val);
        let frow =[];
        while(iRow.length>0)
        {
            if(iRow.length>1)
            {
                if(iRow[0]==iRow[1])
                {
                    let x = iRow.shift();
                    score+=2*x;
                    frow.push(2*x);
                    iRow.shift();
                }
                else{
                    frow.push(iRow.shift());
                }
            }
            else{
                frow.push(iRow.shift());
            }
        }
        let fRowL = frow.length;
        if(iRowL == fRowL) {
            flag1[i]=true;
        }
        for(let j=0;j<4;j++)
        {
            if(j<frow.length)
            {
                grid[i][j]=frow[j];
            }
            else{
                grid[i][j]=0;
            }
        }
        
    }
    // console.log(`${flag1} ${flag2}`);
    let ff1 =true;
    for(let z=0;z<4;z++)
    {
        ff1 = ff1&&flag1[z];
    }
    if(!(ff1 && flag2))
    {
        addnumber();
    }
    // Display newly updated grid
    display();
}

function right(){
    isGameOver();
    let flag1=[false,false,false,false],flag2=true;
    //right sliding operation
    for(let i=0;i<4;i++)
    {
        let iRow=[];
        let flag3=false;
        for(let j=3;j>=0;j--)
        {
            if(grid[i][j]!=0)
            {
                iRow.unshift(grid[i][j]);
                if(flag3)
                {
                    flag2 = false;
                }
            }
            else{
                flag3 = true;
            }
        }
        let iRowL = iRow.length;
        let frow =[];
        while(iRow.length>0)
        {
            if(iRow.length>1)
            {
                if(iRow[iRow.length-1]==iRow[iRow.length-2])
                {
                    let x = iRow.pop();
                    score+=2*x;
                    frow.push(2*x);
                    iRow.pop();
                }
                else{
                    frow.push(iRow.pop());
                }
            }
            else{
                frow.push(iRow.pop());
            }
        }

        // condition1: for not calling addnumber
        let fRowL = frow.length;
        if(iRowL == fRowL) {
            flag1[i]=true;
        }
        // condition1 end
        for(let j=3;j>=0;j--)
        {
            if(j>3-frow.length)
            {
                grid[i][j]=frow[3-j];
            }
            else{
                grid[i][j]=0;
            }
        }
        
    }
    let ff1 =true;
    for(let z=0;z<4;z++)
    {
        ff1 = ff1&&flag1[z];
    }
    if(!(ff1 && flag2))
    {
        addnumber();
    }
    // Display newly updated grid
    display();
}


function up()
{
    isGameOver();
    let flag1=[false,false,false,false],flag2=true;
    for(let j=0;j<4;j++)
    {
        let iRow = [];
        let flag3=false;
        for(let i=0;i<4;i++)
        {
            if(grid[i][j]!=0)
            {
                iRow.push(grid[i][j]);
                if(flag3)
                {
                    flag2 = false;
                }
            }
            else{
                flag3 = true;
            }

        }
        let iRowL = iRow.length;
        let frow =[];
        while(iRow.length>0)
        {
            if(iRow.length>1)
            {
                if(iRow[0]==iRow[1])
                {
                    let x = iRow.shift();
                    score+=2*x;
                    frow.push(2*x);
                    iRow.shift();
                }
                else{
                    frow.push(iRow.shift());
                }
            }
            else{
                frow.push(iRow.shift());
            }
        }

        // condition1: for not calling addnumber
        let fRowL = frow.length;
        if(iRowL == fRowL) {
            flag1[j]=true;
        }
        // condition1 end

        for(let i=0;i<4;i++)
        {
            if(i<frow.length)
            {
                grid[i][j]=frow[i];
            }
            else{
                grid[i][j]=0;
            }
        }
        
    }
    let ff1 =true;
    for(let z=0;z<4;z++)
    {
        ff1 = ff1&&flag1[z];
    }
    if(!(ff1 && flag2))
    {
        addnumber();
    }
    // console.log(flag1);
    // Display newly updated grid
    display();
}

function down()
{
    isGameOver();
    let flag1=[false,false,false,false],flag2=true;
    for(let j=0;j<4;j++)
    {
        let iRow = [];
        let flag3=false;
        for(let i=3;i>=0;i--)
        {
            if(grid[i][j]!=0)
            {
                iRow.unshift(grid[i][j]);
                if(flag3)
                {
                    flag2 = false;
                }
            }
            else{
                flag3 = true;
            }
        }
        let iRowL = iRow.length;
        let frow =[];
        while(iRow.length>0)
        {
            if(iRow.length>1)
            {
                if(iRow[iRow.length-1]==iRow[iRow.length-2])
                {
                    let x=iRow.pop();
                    score+=2*x;
                    frow.push(2*x);
                    iRow.pop();
                }
                else{
                    frow.push(iRow.pop());
                }
            }
            else{
                frow.push(iRow.pop());
            }
        }

        // condition1: for not calling addnumber
        let fRowL = frow.length;
        if(iRowL == fRowL) {
            flag1[j]=true;
        }
        // condition1 end

        for(let i=3;i>=0;i--)
        {
            if(i>3-frow.length)
            {
                grid[i][j]=frow[3-i];
            }
            else{
                grid[i][j]=0;
            }
        }
    }
    
    let ff1 =true;
    for(let z=0;z<4;z++)
    {
        ff1 = ff1&&flag1[z];
    }
    if(!(ff1 && flag2))
    {
        addnumber();
    }
    // Display newly updated grid
    display();
}
window.addEventListener("keydown", function(e){
    if(e.code=="ArrowLeft"){left();}
    else if(e.code=="ArrowRight"){right();}
    else if(e.code=="ArrowUp"){up();}
    else if(e.code=="ArrowDown"){down();}
})
})()