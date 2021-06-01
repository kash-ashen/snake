import Blank from "../img/img.png";
import Snake from "../img/snake.png";
import React, { useState, useEffect, useRef } from 'react';
import Food from "../img/food.png";


const Snakeboard = ()=>{


let init_snake = [];

for (let i = 0;i<10;i++){
    init_snake.push([]);
    for (let j = 0;j<10;j++){
        init_snake[i].push("blank");


    }

}
const random = ()=> {

    const pos = {
        x:Math.floor(Math.random()*10),
        y:Math.floor(Math.random()*10),


    }
    return pos


} 
const [rows,setrows] = useState (init_snake);
const [snake,setsnake] = useState ([{x:0,y:0,},{x:1,y:0}])
const [dir,setdir] = useState ("right")
const [food,setfood] = useState (random)
function useInterval(callback, delay ) {

    const savedcallback = useRef()
    useEffect(()=> {
        savedcallback.current = callback

    },[callback])
    useEffect(()=> {
        function tick(){

            savedcallback.current()


        }
        if(delay !== null) {
            let id = setInterval(tick,delay)
            return ()=> clearInterval(id)


        }
    },[delay])

}


const move_snake = () => {
    const newsnake = []
    switch (dir){
        case "right":
            newsnake.push({x:snake[0].x,y:(snake[0].y+1)%10})
        break;
        case "left":
            newsnake.push({x:snake[0].x,y:(snake[0].y-1+10)%10})
        break;
        case "top":
            newsnake.push({x:(snake[0].x-1+10)%10,y:snake[0].y})
        break;
        case "bottom":
            newsnake.push({x:(snake[0].x+1)%10,y:snake[0].y})
    } 
    snake.forEach (cell => {
        newsnake.push(cell)


    })
    if(snake[0].x === food.x && snake[0].y === food.y) {

        setfood (random) 

    }
    else {
        newsnake.pop()

    }
    setsnake(newsnake)
    display_snake()


}
const changedir = e => {
    var{keyCode} = e
    switch (keyCode) {
        case 37:
            setdir ("left")
            break;
        case 38:
            setdir ("top")
            break;
        case 39:
            setdir("right")
            break;
        case 40:
            setdir("bottom")
            break;
        default:
            break;
    }
}
document.addEventListener("keydown",changedir,false)
useInterval(move_snake,100)
const display_snake = () => {
    const newrows = rows;
    snake.forEach (cell => {

        newrows [cell.x][cell.y] = "snake"

    })
    newrows [food.x][food.y] = "food"
    
    setrows (newrows)


}
const display = rows.map(row => 
    <li>
        {
            row.map (col => {

                switch (col){
                    case "blank":
                        return <img src = {Blank} /> 
                    case "snake":
                        return <img src = {Snake} />    
                    case "food":
                        return <img src = {Food} />
                }

            })
        }

    </li>

    )

return(
    <div>

    {display}
    </div>

)

}
export default Snakeboard;