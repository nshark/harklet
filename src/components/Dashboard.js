import { useState, useEffect } from "react";
export default function Dashboard(e){
    var [output, setOutput] = useState({data: {},
        included: []});
    var [names, setNames] = useState([]);
    var [curSelect, setcurSelected] = useState("");
    var [posts, setPostList] = useState([]);
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
        nameSet.keys().forEach((e) => {Names.push(e)});
        setNames(Names);
    }
    function getPosts(){
        let postList = [];
        output.included.forEach((e) => {if(e["attributes"]["author"] != null){
            if (e["attributes"]["author"]["fullName"] === curSelect){
                console.log(e["attributes"]["content"]["bodyHTML"]);
                postList.push(e["attributes"]["content"]["subject"]);
                postList.push(e["attributes"]["content"]["BodyHTML"]);
            }
        }})
        setPostList(postList);
    }
    function onSelectionChange(e){
        setcurSelected(e.target.value);
        getPosts();
        console.log(posts);
    }
    return (
        <div>
            <select id="stupid" onChange={onSelectionChange}>
                {names.map((d) => {return(<option>{d}</option>)})}
            </select>
            <div>
                {posts.map((d) => {return(<p>{d}</p>)})}
            </div>
        </div>
    );
}