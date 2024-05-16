import { useState, useEffect } from "react";
export default function Dashboard(e){
    var [output, setOutput] = useState({data: {},
        included: []});
    var [names, setNames] = useState([])
    useEffect(() => {getFromAPI().then(() => {getAuthorNameList()})}, [])
    async function getFromAPI(){
        var header = new Headers();
        header.append("X-Api-Key", "pdltp_e0a93c3b2a867c87c58a9da49be83a2493276dd0404b682e4df158673dc08cbcb76ac7");
        var requestOptions = {
            method: "GET",
            headers: header,
            redirct: "follow"
        }
        await fetch("https://api.padlet.dev/v1/boards/5vswf4a5tv615zn3?include=posts%2Csections", requestOptions).then(
            (response) => {
                response.json().then(
                    (responseJSON) => {
                        setOutput(responseJSON)
                    }
                )
            }
        )
    }
    function getAuthorNameList(){
        let nameSet = new Set();
        let Names = [];
        output["included"].forEach(element => {
            if(element["attributes"]["author"]!=null){
            nameSet.add(element["attributes"]["author"]["fullName"])
        }
        });
        for(let i = 0; i < nameSet.size; i++){
            Names.append(nameSet[i]);
        }
        setNames(Names);
        console.log(names);
    }

    return (
        <div>
            <select id="stupid">
                <option>Choose Somebody</option>
                {names.map((d) => {return(<option>{d}</option>)})}
            </select>
        </div>
    );
}