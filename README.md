## readme
### timetap-cli.

**--help to see helps.**

cli interface

- add todo  
-> don't modify todolist for now.
-> just fetch it from the server.

- fetch todolist  
-> use file system (or axios) to fetch todolist.  
-> automatically fetch when cli starts.  

- period set  
-> command : set.  
-> ex) `set -t 45 // 45 min set.`  

- check pomo setting  
-> show settings.  
-> save file to setting.json.  
-> command : check  

- pomo start
-> setTimeout starts with time in setting.  
-> command : start  

- pomo stop
-> if started, stop the pomo.  
-> command : stop

- pomo done
-> automatically alert if ends.  

- show todos, select todo  
-> show todos -- command : todo  
-> select todo -- command : `set -i [todoId]`