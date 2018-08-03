function Dog(id,name,bodySize,species,dateOfBirth,owner,notes) {
 	this.id = id
	this.name = name
	this.bodySize = bodySize 
	this.species = species  
	this.dateOfBirth = dateOfBirth
	this.owner = owner
	this.notes = notes
}

var dogs = [];
dogs.push(new Dog(1,"Max", "Medium", "Affenpinscher", "11/11/2010","Alan Chavez", "Good" ))
dogs.push(new Dog(2,"Charlie", "Small", "American Foxhound", "11/11/2011","Clark Holmes", "Good" ))
dogs.push(new Dog(3,"Buddy", "Large", "Australian Terrier", "11/11/2012","Johnny Shepper", "Good" ))
dogs.push(new Dog(4,"Cooper", "Small", "Berger Picard", "11/11/2013","Jayk Mckorther", "Good" ))
dogs.push(new Dog(5,"Jack", "Medium", "Boxer", "11/11/2014","Eythan Carter", "Good" ))
dogs.push(new Dog(6,"Rocky", "Large", "Chow Chow", "11/11/2015","Paulo Zeballos", "Good" ))
dogs.push(new Dog(7,"Toby", "Medium", "Collie", "11/11/2016","Troy Bradshow", "Good" ))
dogs.push(new Dog(8,"Scout", "Small", "Dalmatian", "11/11/2017","Aby Coleman", "Good" ))

renderTable($("#dogsDataTable"), dogs)

$(document).ready(function() {
	$('th').each(function(col) {
		$(this).hover(
			function() { $(this).addClass('focus'); },
			function() { $(this).removeClass('focus'); }
		);

		$(this).click(function() {
			if ($(this).is('.asc')) {
				$(this).removeClass('asc');
				$(this).addClass('desc selected');
				sortOrder = -1;
			}
			else {
				$(this).addClass('asc selected');
				$(this).removeClass('desc');
				sortOrder = 1;
			}

			$(this).siblings().removeClass('asc selected');
			$(this).siblings().removeClass('desc selected');
			var arrData = $('table').find('tbody >tr:has(td)').get();

			arrData.sort(function(a, b) {
				var val1 = $(a).children('td').eq(col).text().toUpperCase();
				var val2 = $(b).children('td').eq(col).text().toUpperCase();
				if($.isNumeric(val1) && $.isNumeric(val2))
				return sortOrder == 1 ? val1-val2 : val2-val1;
				else
					return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
			});

			$.each(arrData, function(index, row) {
				$('tbody').append(row);
			});
		});
	});

	$("#search").on("keyup", function() {
	    var value = $(this).val();
	    value = value.toUpperCase();

	    $("table tr").each(function(index) {
	        if (index !== 0) {

	            $row = $(this);

	            var text = $row.find("td:eq(2)").text();
	            text = text.toUpperCase();

	            if (text.indexOf(value) !== 0) {
	                $row.hide();
	            }
	            else {
	                $row.show();
	            }
	        }
	    });
	});

});



function renderTable(tableContainer, dogs){

	tableContainer.append(
		"<thead class='thead-dark'>" +
	    "    <tr>" +
	    "        <th scope='col' hidden>ID</th>" +
	    "        <th scope='col'>#</th>" +
	    "        <th scope='col'>Name</i></th>" +
	    "        <th scope='col'>Body Size</th>" +
	    "        <th scope='col'>Species</th>" +
	    "        <th scope='col'>Date of Birth</th>" +
	    "        <th scope='col'>Owner</th>" +
	    "        <th scope='col'>Notes</th>" +
	    "        <th scope='col'>Actions</th>" +
	    "    </tr>" +
	    "</thead>" + 
	    "<tbody>" + 
	    "</tbody>" + 
	    "")

	for (var i = 0; i < dogs.length; i++) {
        var row = $("<tr />")
    	tableContainer.append(row);

    	row.append($("<td hidden='true'>" + dogs[i].id+ "</td>")); 
    	row.append($("<td>" + (i+1)+ "</td>")); 
		row.append($("<td>" + dogs[i].name + "</td>")); 
		row.append($("<td>" + dogs[i].bodySize + "</td>"));
		row.append($("<td>" + dogs[i].species + "</td>"));
		row.append($("<td>" + dogs[i].dateOfBirth + "</td>"));
		row.append($("<td><a href=# data-toggle='modal' data-target='#dogModal'>" + dogs[i].owner + "</a></td>"));
		row.append($("<td><a href=# data-toggle='modal' data-target='#dogModal'>" + dogs[i].notes + "</a></td>"));
		row.append($("<td class='text-right'>" + 
			" <label data-toggle='modal' data-target='#myModal' ><i onClick=editRow("+dogs[i].id+") class='fa fa-edit text-success'></i></label>" +
			" <label><i onClick=removeRow("+dogs[i].id+") class='fa fa-trash text-danger'></i></label>" +
			"</td>"));
    }
}