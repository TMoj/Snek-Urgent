//snek script

class head{};class body{}; class food{};class sFood{};

let s,posX,posY;
let foodPos=[];
let state=0;
let segments=4;
let direction='r';
let headPos='z3s9';
let bodyPos=['z3s8','z4s8','z5s8'];
const wLenghtM=364,wLenghtE=75;

document.addEventListener("DOMContentLoaded",function(){
	document.addEventListener("keydown",changeD);
	buttons();
	if(headPos.slice(2,3)==='s'){
		posX=headPos.slice(3);
		posY=headPos.slice(1,2);
	}else{
		posX=headPos.slice(4);
		posY=headPos.slice(1,3);
	}
	setInterval(function(){foodHard()},2000)
	setInterval(function(){posChange();main();buttons()},75)
});

function LadyRNG(num){																												//RNG from 1 to x
	var num=Math.floor((Math.random()*num)+1); 
	return num;
}

function buttons(ID){																														//function for UI
	if(ID===1){state=1;foodSimple()}
	if(ID===2){state=2;foodSimple()}
	if(ID===3){state=3;foodHard()}
	switch(state){
		case 0:
			document.getElementById('r').style.display='none';
			break;
		case 4:
			document.getElementById('info').innerHTML='You win!'
			document.getElementById('info').innerHTML='Game Over!'
			document.getElementById('r').style.display='block';
			document.getElementById('b').style.display='none';
			break;
		case 5:
			document.getElementById('info').innerHTML='You win!'
			document.getElementById('r').style.display='block';
			document.getElementById('b').style.display='none';
			break;
		default:
			document.getElementById('b').style.visibility='hidden';
			break;
	}
}

function changeD(event){																											//directionchange
	if(event.key==='ArrowLeft'){s='l'}	
	if(event.key==='ArrowUp'){s='u'}
	if(event.key==='ArrowRight'){s='r'}
	if(event.key==='ArrowDown'){s='d'}
}

function posChange(){																										//headmove and lose-con
	if(s==='l' && direction!=='r'){direction='l'}
	if(s==='u' && direction!=='d'){direction='u'}
	if(s==='r' && direction!=='l'){direction='r'}
	if(s==='d' && direction!=='u'){direction='d'}
	if(state===0 || state>3){return}
	if(direction==='u'){posY--}		if(direction==='d'){posY++}
	if(direction==='r'){posX++}		if(direction==='l'){posX--}
	if(posY<=0 || posY>=18 || posX<=0 || posX>=29 ||
	document.getElementById(headPos).classList.contains('body')!==false){state=4}
}

function winCon(){																																		//Win-Con
	if(state===0){return}
	if(state===1 && segments===wLenghtE || segments>=wLenghtM && (state===2||state===3)){state=5}
}

function foodPlace(){																															 //foodplacer
	for(i=0;i<1;){
		var food='z'+LadyRNG(17)+'s'+LadyRNG(28);
		if(document.getElementById(food).classList.contains('n')===true){i++}
	return food;}
}

function foodEat(fpos){																														//Foodpurpose
	if(fpos===headPos){
		if(document.getElementById(fpos).classList.contains('food')===true){segments++;
			document.getElementById(fpos).classList.remove('food');
		}if(document.getElementById(fpos).classList.contains('sFood')===true){segments+=3;
			document.getElementById(fpos).classList.remove('sFood');
		}return true
	}
}

function foodHard(){																														//food for hard
	if(state!==3){return}
	if(foodPos[0]!==undefined){foodClear()}
		for(i=0;i<1;){
			for(l=0;l<4;l++){foodPos[l]=foodPlace();
		}if(foodPos[0]!==foodPos[1] && foodPos[0]!==foodPos[2] && foodPos[0]!==foodPos[3] &&
				foodPos[1]!==foodPos[2] && foodPos[1]!==foodPos[3] && foodPos[2]!==foodPos[3])
		{i++}}
	for(i=0;i<3;i++){document.getElementById(foodPos[i]).classList.add('food')}
	document.getElementById(foodPos[3]).classList.add('sFood');
}

function foodClear(){																											 //foodclear for hard
	for(i=0;i<3;i++){
		document.getElementById(foodPos[i]).classList.remove('food');
	}
	document.getElementById(foodPos[3]).classList.remove('sFood');
}

function foodNormal(){																												//food for normal
	foodPos[1]=foodPlace();	foodEasy();
	if(document.getElementsByClassName('sFood')[0]===undefined||foodEat(foodPos[1])===true){
		document.getElementById(foodPos[1]).classList.add('sFood')
	}
}

function foodEasy(){																														//food for easy
	foodPos[0]=foodPlace();
	if(document.getElementsByClassName('food')[0]===undefined||foodEat(foodPos[0])===true){
		document.getElementById(foodPos[0]).classList.add('food')
	}
}

function snekMove(){																		 								//Snekmovement-function
	bodyPos.unshift(headPos);	if(state>3){return}
	if(bodyPos[segments]!==undefined){
		document.getElementById(bodyPos[segments]).classList.replace('body','n');
		bodyPos.pop();
	}
	document.getElementById(headPos).classList.replace('head','body');
	headPos='z'+posY+'s'+posX;
	document.getElementById(headPos).classList.replace('n','head');
}

function main(){																											
	if(state===1||state===2||state===3){
		document.getElementById('info').innerHTML='Current lenght: '+segments;
		if(state>0||state<4){snekMove()}
		foodEat(headPos);	winCon();
		if(state===1){foodEasy()}	if(state===2){foodNormal()}
	}
}
