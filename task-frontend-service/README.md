# README #

Болвака для проектов frontend завернутых в spring-boot и spring-cloud

Перед началом работы нужно, поправть название группы и артефакт id в pom.xml , 
пакет, там где нужно поправить расставлены Todo.


Свойства из файла application.yml с префиксом "ws.options"
будут при сборке вставлены, как строковые переменные в "assets/js/config.js"

например: 

ws.options.WS_GLOBAL_IP=http://localhost:8080

будет добавлено как:

var WS_GLOBAL_IP="http://localhost:8080";

