
// Anonymous function that calls itself - this helps keep variables contained, so they don't leak into the global
// scope.  This method of function is typically a little faster and should only be used for the file's main function.
$(document).ready ( function () {
  // Best practice: initialize all variables at the beginning of the function where they will be used.
  list = ["Write the to do app", "Create item", "Remove item", "Refresh List", "Create Done List", "Animate"];
  completed = ["This is done"];

  // This form of function lets you assign it to an object like object.addItem = function () {}. I prefer this form
  // more because I like the flexibility. I use the this object to expose the addItem function to global scope for
  // our html to recognize the function.
  // Note: The downside to this form is that some browsers won't know what the
  // name is and will declare the name as anonymous.
  this.addItem = function () {
    // This is the pure JavaScript way of accessing the DOM (Document Object Model).
    // here we are grabbing the textField element and assigning it to a variable so we can continue using it.
    var itemBeingAdded = $("#text-field");
	var myText = itemBeingAdded.val();
	if (myText.length > 0 ) {
		list.push(myText);
	} else {
		$("#dialog").dialog();
	}
    // TODO: Make sure to call the displayList Function when you are done adding an item to the list array.
    arrange();
  };

  // TODO: Remember to add the removeItem function
  this.removeItem = function () {
	var index = (completed.length-1);
  	completed.splice(index, 1);
    arrange();
  }

  // This needs to be called whenever you change the list array object.
  var $displayList = function (array, input) {
	
	if ( input < 1 ) {  
		var todoListElement = $("#todo-list"); // ul element
		todoListElement[0].innerHTML = ""; // clear all of the ul element
	} else {
		var doneListElement = $("#done-list"); // ul element
		doneListElement[0].innerHTML = ""; // clear all of the ul element
	}
	var i = 0;
		
	if (input < 1) {	
		newH1 = document.createElement("H1");
		newH1.innerHTML = 'To Do Tasks';
		todoListElement.append(newH1);	
	} else {
		newH1 = document.createElement("H1");
		newH1.innerHTML = 'Completed Tasks';
		doneListElement.append(newH1);	
	}

    for (i = 0; i < array.length; i++) {
		
    newLI = document.createElement("LI");
	
	  if (input < 1) {
		newLI.innerHTML = '<input type="checkbox" value="' +i+ ' "id="box' +i+ '" /> ';
		newLI.innerHTML += array[i];
		todoListElement.append(newLI);
	  } else {
		newLI.innerHTML = array[i];
		doneListElement.append(newLI);
	  }
    }  
	
  };
    
  var arrange = function(){
	  
  $displayList(list, 0); // Zero = To Do
  $displayList(completed, 1); // 1 or more = Completed
  
	$("#todo-list LI input:checkbox").click(function(){	  
	  var $checkbox = $(this);
	  var htm = "";
	  $checkbox.parent().slideUp(500, function(){
		  $checkbox.hide();
		  $(this).appendTo("#done-list").fadeIn();
		  htm = $checkbox.parent().text();
		  htm = htm.trim();
		  completed.push(htm);
		  var index = $.inArray(htm, list);
		  list.splice(index, 1);
	  });
    });
  };
  
  arrange();

});