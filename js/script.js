$(document).ready(function() {
  
var items = [];
var $weightAdder = $('#weightAdder');
var $metrics = $weightAdder.find('.metric');
var $imperials = $weightAdder.find('.imperial');
var $button = $('#addItem');
var $itemName = $('#itemName');
var $template = $('#itemTemplate').html();  
var temp = Handlebars.compile($template);
var $theTable = $('#theTable');

// $itemName.focus();
  
$button.on('click', adder);
  
  function render() {
    var theData = {
        items: items
      };
      
      var thing = temp(theData);
      console.log(thing);
      $theTable.children().remove();
      $theTable.append(temp(theData));
  }
  
  
//   function checkName() {
//     if ( !($itemName.val() ) ) {
//       console.log('uh oh');
//     } else {
//       adder();
//     }
//   }
 
  function adder() {
    if ( !( $metrics.eq(0).val() || $metrics.eq(1).val() || $imperials.eq(0).val() || $imperials.eq(1).val() ) ) {      
      console.log("Nothing to add");      
    } else if ( $metrics.eq(0).val() || $metrics.eq(1).val() ) {     
      
      var metricTotal = (Number($metrics.eq(0).val())) + (Number($metrics.eq(1).val()) / 1000);
           
      items.push({
        item: $itemName.val() || "Item #" + (items.length + 1),
        kg: metricTotal,
        lbs: +(metricTotal * 2.20462).toFixed(3)
      });
      
      console.log(items);  
      
//    render the stuff
      
      render();
      totaler();
      
      
  

      
      resetValues();
    
    } else if ( $imperials.eq(0).val() || $imperials.eq(1).val() ) {
      
      var imperialTotal = (Number($imperials.eq(0).val())) + (Number($imperials.eq(1).val()) / 16);
      
      items.push({
        item: $itemName.val() || "Item #" + (items.length + 1),
        kg: +(imperialTotal / 2.20462).toFixed(3),
        lbs: imperialTotal
      });     
      
      render();
      totaler();
      console.log(items);
      resetValues();
            
    }
  }
  
  function resetValues() {
    $metrics.eq(0).val('');
    $metrics.eq(1).val('');
    $imperials.eq(0).val('');
    $imperials.eq(1).val('');
    $itemName.val('');
  }

  function removeImperials() {
    if ( $metrics.eq(0).val() || $metrics.eq(1).val() ) {
      $imperials.val('');
    }
  }
  
  function removeMetrics() {
    if ( $imperials.eq(0).val() || $imperials.eq(1).val() ) {
      $metrics.val('');
    }
  }
  
  $metrics.on('keyup', removeImperials);
  $imperials.on('keyup', removeMetrics);

  
  function totaler() {
    var sumKG = 0;
    var sumLB = 0;
    items.forEach(function(item) {
      sumKG += item.kg;
      sumLB += item.lbs;      
    });
    
    $('<tr class="last"><td>Total</td><td>' + sumKG.toFixed(3) + '</td><td>' + sumLB.toFixed(3) + '</td></tr>').appendTo($theTable);
    
    $itemName.focus();
  }
  
  $(document).keypress(function(e) {
    if(e.which == 13) {
        adder();
    }
});
  
  
  });