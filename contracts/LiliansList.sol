// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LiliansList is ERC721 {
    address public owner;
    uint public length;
    string[] public taskNames;
    event TaskCreated (
        uint256 taskId,
        string taskName
    );

    event TaskFinished (
        string taskName
    );
    event TaskUnFinished (
        string taskName
    );
    mapping(string => uint) public taskNameToId;
    mapping(string => bool) public liliansVeryPublicWeb3ToDoList;
   
    // ideally make this a NFT for people to create their own todo lists lmao
    constructor( string [] memory toDoItems) ERC721("LiliansList", "LLL") {
        uint i = 0;
        
        while(i < toDoItems.length){
            liliansVeryPublicWeb3ToDoList[toDoItems[i]] = false;
            taskNames.push(toDoItems[i]);
            i++;
        }
        length = toDoItems.length;
    
    }

    function setToDone(string memory name) public {
        liliansVeryPublicWeb3ToDoList[name] = true;
        
        emit TaskFinished(
            name
        );
    }

    function setUndone(string memory name) public {
        liliansVeryPublicWeb3ToDoList[name] = false;
        emit TaskUnFinished(
            name
        );
    }

    function getIsDone(string memory name) public view returns (bool) {
        return liliansVeryPublicWeb3ToDoList[name];
    }

    function addToList(string memory name) public {
        liliansVeryPublicWeb3ToDoList[name] = false;
        taskNames.push(name);
        length += 1;
        emit TaskCreated(
            length,
            name
        );
    }
    
    function getLength() public view returns (uint) {
        return length;
    }

    function getTask(uint taskId) public view returns (string memory, bool) {
        string memory taskName = taskNames[taskId];
        bool isDone = getIsDone(taskName);
        return (taskName, isDone);
    }
}