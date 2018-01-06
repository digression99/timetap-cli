
cli interface

- add todo  
-> command : add

- fetch todolist  
-> 일단 파일 시스템을 이용, 간편하게 이용할 수 있도록.  
-> 웹서버와의 동기화를 흉내냄.    
-> command : sync

- period set
-> 간단하게 25, 45, 60 정도만 해서 선택하게.  
-> command : set 시 25분 기본.  
-> set -t 45 : 45분.

- check pomo setting
-> 지금 어떤게 세팅되었는지 체크.  
-> 이거는 setting.json 파일로 저장된다.  
-> command : check

- pomo start
-> start 하면 setTimeout 설정.  
이때 period set 에서 설정한 시간으로.  
-> start 시 이미 세팅 되었다면 시작.  
-> 바로 시작하지 말고 interaction 할 수 있을까?  
-> 어떤 테스크인지 보여주고, y/n 로 시작 알림.  
-> command : start

- pomo stop
-> 포모가 돌아간다면 stop 되고 얼마나 지났는지 알림.  
-> 아직 안돌아간다면 start 부터 하라고 알림.  
-> command : stop

- pomo done
-> 시간이 지났다면 자동으로 알림.

- show todos, select todos
-> 여러 task 중 뭘 할지를 선택.  
-> 선택 안되었다면 자동으로 가장 위의 task를 선택.  
-> command : todo 시 모든 테스크 보여줌.  

** use event emitter to set the event.

* setTimeout 시 event queue 가 비질 않았으므로 종료가 안된다.  
