## readme
### timetap-cli.v2

**`help` to see help.**

*v3(soon)* - fetch todolist from todoist using axios, add more options, use rxjs, code refactoring in event-emitter.

*v2* - changed to event-driven paradigm. (sort of).

*v1* - initial version.  

**cli description**

- fetch todolist  
-> use file system (or later, axios) to fetch todolist.  
-> automatically fetch when cli starts.  

- period set  
-> command : set.  
-> ex) `set -t 45 // 45 min set.`  

- check pomo setting  
-> show settings.  
-> save file to `setting.json`  
-> command : check  

- pomo start
-> setTimeout starts with time in setting.  
-> command : `start`

- pomo stop
-> if started, stop the pomo.  
-> command : `stop`

- pomo done
-> automatically alert if ends.  

- show todos, select todo  
-> show todos -- command : `todo`  
-> select todo -- command : `set -i [todoId]`
