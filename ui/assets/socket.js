var socket = io()
  , $attention = $('#attention')
  , $att_val = $attention.find(".val")
  , $meditation = $('#meditation')
  , $med_val = $meditation.find(".val")
  , MIN_INPUT = 0
  , MAX_INPUT = 150
  , MIN_OUTPUT = 0
  , MAX_OUTPUT = 100
  ;

function updateStatus($div, val){
  $div
}

socket.on('attention', function(val){
  val = Math.round(val * MAX_OUTPUT / MAX_INPUT);
  if(val > 5){
    $attention.css({
      background: '-webkit-linear-gradient(top, rgba(235,0,140,0) 0%, rgba(235,0,140,'+val/100+')'+(MAX_OUTPUT-val)+'%, rgba(235,0,140,0.8) 100%)'
    });
    $att_val.text(val);
  }
});

socket.on('meditation', function(val){
  old = val;
  val = Math.round(val * MAX_OUTPUT / MAX_INPUT);
  // console.log('meditation: ' + old + ' normalized: ' + val);
  if(val > 5){
    $meditation.css({
      background: '-webkit-linear-gradient(top, rgba(168,223,18,0.8) 0%, rgba(168,223,18,'+val/100+') '+val+'%, rgba(168,223,18,0) 100%)'
    });
    $med_val.text(val);
  }
});
