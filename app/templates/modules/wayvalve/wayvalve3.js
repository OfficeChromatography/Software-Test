function sendToMachine(value){
    data={'gcode':value}
    console.log(data);
    $.ajax({
      method: 'POST',
      url:    window.location.origin+'/send/',
      data:   data,
      success: setHommingEndpointSucess,
      error: setHommingEndpointError,
    })
    function setHommingEndpointSucess(data, textStatus, jqXHR){}
    function setHommingEndpointError(jqXHR, textStatus, errorThrown){}
}

$('#valveRange').on('change',function(){
  $('#valveCycles').val($(this).val())
})
$('#valveCycles').on('change',function(){
  $('#valveRange').val($(this).val())
})

$('#valvecontrol').on('click',function(){
  s = $('#valveCycles').val()
  for (let i = 0; i < s; i++) {
    sendToMachine('M42P36S255'); //activate valve
    sendToMachine('G4 S1');    //wait 1 s
    sendToMachine('M400');
    sendToMachine('M42P36S0');   //deactivate valve
    sendToMachine('G4 S1');    //wait 1 s
    sendToMachine('M400');
    sendToMachine('M42P36S0');   //deactivate valve
    }
})
