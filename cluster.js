/*
Running on multiple core:
LOADBALANCING
Better efficiency
*/

var cluster =  require("cluster");

if(cluster.isMaster){
  var os = require("os")
  var cpuCore = os.cpus().length
  var hyperThreading = 2 // hyperThreading in mac 2012 model
  // reducing the hyperthreading
  for (var i = 0;i<(cpuCore-hyperThreading);i+=1){
    cluster.fork()
  }

  cluster.on('exit',function(){
    cluster.fork();
  })
}
else{
  require('./index');
}
